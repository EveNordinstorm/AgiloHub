import { describe, it, expect, jest, beforeEach } from "@jest/globals";
import * as SecureStore from "expo-secure-store";
import {
  getRefreshToken,
  setRefreshToken,
  deleteRefreshToken,
  getStreakData,
  setStreakData,
} from "../secureStore";
import { StreakState } from "common/src/redux/slices/loginStreakSlice";

jest.mock("expo-secure-store");
const mockedSecureStore = SecureStore as jest.Mocked<typeof SecureStore>;

describe("SecureStore Helper Functions", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Refresh Token operations", () => {
    describe("getRefreshToken", () => {
      it("should retrieve refresh token from secure storage", async () => {
        mockedSecureStore.getItemAsync.mockResolvedValue(
          "mock-refresh-token-123"
        );

        const token = await getRefreshToken();

        expect(token).toBe("mock-refresh-token-123");
        expect(mockedSecureStore.getItemAsync).toHaveBeenCalledWith(
          "refreshToken"
        );
        expect(mockedSecureStore.getItemAsync).toHaveBeenCalledTimes(1);
      });

      it("should return null when no token exists", async () => {
        mockedSecureStore.getItemAsync.mockResolvedValue(null);

        const token = await getRefreshToken();

        expect(token).toBeNull();
        expect(mockedSecureStore.getItemAsync).toHaveBeenCalledWith(
          "refreshToken"
        );
      });

      it("should handle storage errors gracefully", async () => {
        mockedSecureStore.getItemAsync.mockRejectedValue(
          new Error("Storage access denied")
        );

        await expect(getRefreshToken()).rejects.toThrow(
          "Storage access denied"
        );
      });
    });

    describe("setRefreshToken", () => {
      it("should store refresh token in secure storage", async () => {
        mockedSecureStore.setItemAsync.mockResolvedValue(undefined);

        await setRefreshToken("new-refresh-token-456");

        expect(mockedSecureStore.setItemAsync).toHaveBeenCalledWith(
          "refreshToken",
          "new-refresh-token-456"
        );
        expect(mockedSecureStore.setItemAsync).toHaveBeenCalledTimes(1);
      });

      it("should update existing refresh token", async () => {
        mockedSecureStore.setItemAsync.mockResolvedValue(undefined);
        await setRefreshToken("old-token");

        await setRefreshToken("updated-token");

        expect(mockedSecureStore.setItemAsync).toHaveBeenCalledTimes(2);
        expect(mockedSecureStore.setItemAsync).toHaveBeenLastCalledWith(
          "refreshToken",
          "updated-token"
        );
      });

      it("should handle storage errors", async () => {
        mockedSecureStore.setItemAsync.mockRejectedValue(
          new Error("Storage full")
        );

        await expect(setRefreshToken("token")).rejects.toThrow("Storage full");
      });

      it("should handle empty string token", async () => {
        mockedSecureStore.setItemAsync.mockResolvedValue(undefined);
        await setRefreshToken("");

        expect(mockedSecureStore.setItemAsync).toHaveBeenCalledWith(
          "refreshToken",
          ""
        );
      });
    });

    describe("deleteRefreshToken", () => {
      it("should delete refresh token from secure storage", async () => {
        mockedSecureStore.deleteItemAsync.mockResolvedValue(undefined);

        await deleteRefreshToken();

        expect(mockedSecureStore.deleteItemAsync).toHaveBeenCalledWith(
          "refreshToken"
        );
        expect(mockedSecureStore.deleteItemAsync).toHaveBeenCalledTimes(1);
      });

      it("should handle deletion errors", async () => {
        mockedSecureStore.deleteItemAsync.mockRejectedValue(
          new Error("Cannot delete")
        );

        await expect(deleteRefreshToken()).rejects.toThrow("Cannot delete");
      });

      it("should work even if token does not exist", async () => {
        mockedSecureStore.deleteItemAsync.mockResolvedValue(undefined);

        await deleteRefreshToken();

        expect(mockedSecureStore.deleteItemAsync).toHaveBeenCalled();
      });
    });
  });

  describe("Streak Data operations", () => {
    describe("getStreakData", () => {
      it("should retrieve and parse streak data", async () => {
        const mockStreakData: StreakState = {
          daysChecked: ["Mon", "Tue", "Wed"],
          lastLoginDate: "2026-01-20T10:00:00.000Z",
          currentPoints: 30,
        };

        mockedSecureStore.getItemAsync.mockResolvedValue(
          JSON.stringify(mockStreakData)
        );

        const data = await getStreakData();

        expect(data).toEqual(mockStreakData);
        expect(data?.daysChecked).toEqual(["Mon", "Tue", "Wed"]);
        expect(data?.currentPoints).toBe(30);
        expect(mockedSecureStore.getItemAsync).toHaveBeenCalledWith(
          "streakData"
        );
      });

      it("should return null when no streak data exists", async () => {
        mockedSecureStore.getItemAsync.mockResolvedValue(null);

        const data = await getStreakData();

        expect(data).toBeNull();
      });

      it("should handle empty streak data", async () => {
        const emptyStreak: StreakState = {
          daysChecked: [],
          lastLoginDate: undefined,
          currentPoints: 0,
        };

        mockedSecureStore.getItemAsync.mockResolvedValue(
          JSON.stringify(emptyStreak)
        );

        const data = await getStreakData();

        expect(data).toEqual(emptyStreak);
        expect(data?.daysChecked).toHaveLength(0);
      });

      it("should handle malformed JSON gracefully", async () => {
        mockedSecureStore.getItemAsync.mockResolvedValue(
          "invalid-json-{not-json}"
        );

        await expect(getStreakData()).rejects.toThrow();
      });

      it("should handle full week streak data", async () => {
        const fullWeekStreak: StreakState = {
          daysChecked: ["Mon", "Tue", "Wed", "Thu", "Fri"],
          lastLoginDate: "2026-01-24T16:30:00.000Z",
          currentPoints: 50,
        };

        mockedSecureStore.getItemAsync.mockResolvedValue(
          JSON.stringify(fullWeekStreak)
        );

        const data = await getStreakData();

        expect(data?.daysChecked).toHaveLength(5);
        expect(data?.currentPoints).toBe(50);
      });
    });

    describe("setStreakData", () => {
      it("should stringify and store streak data", async () => {
        const streakToSave: StreakState = {
          daysChecked: ["Wed", "Thu", "Fri"],
          lastLoginDate: "2026-01-22T08:00:00.000Z",
          currentPoints: 50,
        };

        mockedSecureStore.setItemAsync.mockResolvedValue(undefined);

        await setStreakData(streakToSave);

        expect(mockedSecureStore.setItemAsync).toHaveBeenCalledWith(
          "streakData",
          JSON.stringify(streakToSave)
        );
        expect(mockedSecureStore.setItemAsync).toHaveBeenCalledTimes(1);
      });

      it("should handle empty streak data", async () => {
        const emptyStreak: StreakState = {
          daysChecked: [],
          lastLoginDate: undefined,
          currentPoints: 0,
        };

        mockedSecureStore.setItemAsync.mockResolvedValue(undefined);

        await setStreakData(emptyStreak);

        expect(mockedSecureStore.setItemAsync).toHaveBeenCalledWith(
          "streakData",
          JSON.stringify(emptyStreak)
        );
      });

      it("should handle streak data with special characters in date", async () => {
        const streakWithDate: StreakState = {
          daysChecked: ["Mon"],
          lastLoginDate: "2026-01-22T14:35:22.123Z",
          currentPoints: 10,
        };

        mockedSecureStore.setItemAsync.mockResolvedValue(undefined);

        await setStreakData(streakWithDate);

        const savedData = JSON.parse(
          (mockedSecureStore.setItemAsync as jest.Mock).mock
            .calls[0][1] as string
        );
        expect(savedData.lastLoginDate).toBe("2026-01-22T14:35:22.123Z");
      });

      it("should handle storage errors", async () => {
        mockedSecureStore.setItemAsync.mockRejectedValue(
          new Error("Storage quota exceeded")
        );

        const streakData: StreakState = {
          daysChecked: ["Mon"],
          lastLoginDate: "2026-01-22T10:00:00.000Z",
          currentPoints: 10,
        };

        await expect(setStreakData(streakData)).rejects.toThrow(
          "Storage quota exceeded"
        );
      });
    });

    describe("round-trip data integrity", () => {
      it("should maintain data integrity in save/load cycle", async () => {
        const originalStreak: StreakState = {
          daysChecked: ["Mon", "Tue", "Wed", "Thu", "Fri"],
          lastLoginDate: "2026-01-24T12:00:00.000Z",
          currentPoints: 50,
        };

        let savedData: string | undefined;

        mockedSecureStore.setItemAsync.mockImplementation(
          async (key, value) => {
            savedData = value;
          }
        );

        mockedSecureStore.getItemAsync.mockImplementation(async () => {
          return savedData || null;
        });

        await setStreakData(originalStreak);
        const retrievedStreak = await getStreakData();

        expect(retrievedStreak).toEqual(originalStreak);
      });
    });
  });

  describe("concurrency and edge cases", () => {
    it("should handle concurrent token operations", async () => {
      mockedSecureStore.setItemAsync.mockResolvedValue(undefined);
      mockedSecureStore.getItemAsync.mockResolvedValue("token");

      await Promise.all([
        setRefreshToken("token1"),
        setRefreshToken("token2"),
        getRefreshToken(),
        getRefreshToken(),
      ]);

      expect(mockedSecureStore.setItemAsync).toHaveBeenCalledTimes(2);
      expect(mockedSecureStore.getItemAsync).toHaveBeenCalledTimes(2);
    });

    it("should handle very long token strings", async () => {
      const longToken = "x".repeat(10000);
      mockedSecureStore.setItemAsync.mockResolvedValue(undefined);

      await setRefreshToken(longToken);

      expect(mockedSecureStore.setItemAsync).toHaveBeenCalledWith(
        "refreshToken",
        longToken
      );
    });

    it("should handle Unicode characters in streak data", async () => {
      const unicodeStreak: StreakState = {
        daysChecked: ["Mon"],
        lastLoginDate: "2026-01-22T10:00:00.000Z",
        currentPoints: 10,
      };

      let savedData: string;

      mockedSecureStore.setItemAsync.mockImplementation(async (key, value) => {
        savedData = value;
      });

      await setStreakData(unicodeStreak);

      expect(JSON.parse(savedData!)).toEqual(unicodeStreak);
    });
  });
});
