import * as SecureStore from "expo-secure-store";
import { StreakState } from "common/src/redux/slices/loginStreakSlice";

export async function getRefreshToken() {
  return await SecureStore.getItemAsync("refreshToken");
}

export async function setRefreshToken(token: string) {
  await SecureStore.setItemAsync("refreshToken", token);
}

export async function deleteRefreshToken() {
  await SecureStore.deleteItemAsync("refreshToken");
}

export async function getStreakData(): Promise<StreakState | null> {
  const data = await SecureStore.getItemAsync("streakData");
  return data ? JSON.parse(data) : null;
}

export async function setStreakData(state: StreakState) {
  await SecureStore.setItemAsync("streakData", JSON.stringify(state));
}
