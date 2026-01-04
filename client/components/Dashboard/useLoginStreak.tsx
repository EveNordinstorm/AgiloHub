import { useEffect, useState, useRef } from "react";
import { useAppDispatch, useAppSelector } from "common/src/hooks/hooks";
import {
  markDayChecked,
  resetWeek,
  hydrateStreak,
} from "common/src/redux/slices/loginStreakSlice";
import { earnPoints } from "common/src/redux/slices/pointsSlice";
import { PointsType } from "common/src/types/enums/pointsType";
import { Weekday } from "common/src/redux/slices/loginStreakSlice";
import { getStreakData, setStreakData } from "../../secureStore";

export const useLoginStreak = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const streakState = useAppSelector((state) => state.streak);
  const { daysChecked, lastLoginDate } = streakState;
  const [isHydrated, setIsHydrated] = useState(false);
  const hasProcessedToday = useRef(false);

  // Load persisted streak data on mount
  useEffect(() => {
    const loadStreakData = async () => {
      const savedData = await getStreakData();
      if (savedData) {
        dispatch(hydrateStreak(savedData));
      }
      setIsHydrated(true);
    };
    loadStreakData();
  }, []);

  // Save streak data whenever it changes (after hydration)
  useEffect(() => {
    if (isHydrated) {
      setStreakData(streakState);
    }
  }, [streakState, isHydrated]);

  useEffect(() => {
    if (!user || !isHydrated || hasProcessedToday.current) return;

    const today = new Date();
    const weekdayNames: Weekday[] = ["Mon", "Tue", "Wed", "Thu", "Fri"];
    const todayName = weekdayNames[today.getDay() - 1]; // Mon = 0, Fri = 4

    // Skip weekends
    if (!todayName) return;

    const lastLogin = lastLoginDate ? new Date(lastLoginDate) : null;
    const isSameDay =
      lastLogin && lastLogin.toDateString() === today.toDateString();

    // New week reset
    if (
      todayName === "Mon" &&
      lastLogin &&
      today.getTime() - lastLogin.getTime() > 1000 * 60 * 60 * 24 * 2
    ) {
      dispatch(resetWeek());
    }

    // Only mark if not already checked today
    if (!isSameDay && !daysChecked.includes(todayName)) {
      dispatch(markDayChecked(todayName));

      const dayIndex = weekdayNames.indexOf(todayName);
      const pointsAwarded = (dayIndex + 1) * 10;

      dispatch(
        earnPoints({
          amount: pointsAwarded,
          type: PointsType.LOGIN_STREAK,
          description: `Login streak for ${todayName}`,
        })
      );
    }

    hasProcessedToday.current = true;
  }, [user, isHydrated, daysChecked, lastLoginDate]);
};
