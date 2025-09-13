import * as SecureStore from "expo-secure-store";

export async function getRefreshToken() {
  return await SecureStore.getItemAsync("refreshToken");
}

export async function setRefreshToken(token: string) {
  await SecureStore.setItemAsync("refreshToken", token);
}

export async function deleteRefreshToken() {
  await SecureStore.deleteItemAsync("refreshToken");
}
