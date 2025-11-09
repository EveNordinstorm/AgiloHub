import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "common/src/hooks/hooks";
import {
  markDayChecked,
  resetWeek,
} from "common/src/redux/slices/loginStreakSlice";
import { addTransaction } from "common/src/redux/slices/pointsSlice";
import { PointsType } from "common/src/types/enums/pointsType";
import { Weekday } from "common/src/redux/slices/loginStreakSlice";

export const useLoginStreak = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const { daysChecked, lastLoginDate } = useAppSelector(
    (state) => state.streak
  );

  useEffect(() => {
    if (!user) return;

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
      today.getDate() - lastLogin.getDate() > 2
    ) {
      dispatch(resetWeek());
    }

    // Only mark if not already checked today
    if (!isSameDay && !daysChecked.includes(todayName)) {
      dispatch(markDayChecked(todayName));

      // TODO - call backend here
      const dayIndex = weekdayNames.indexOf(todayName);
      const pointsAwarded = (dayIndex + 1) * 10;

      dispatch(
        addTransaction({
          type: PointsType.LOGIN_STREAK,
          description: `Login streak for ${todayName}`,
          amount: pointsAwarded,
          date: new Date().toISOString(),
        })
      );
    }
  }, [user]);
};
