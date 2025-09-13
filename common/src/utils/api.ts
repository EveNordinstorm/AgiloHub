// redux aware glue for preventing circular imports
import api, {
  setAccessTokenGetter,
  setUnauthorizedHandler,
  setRefreshTokenGetter,
} from "./apiCore";
import { store } from "../redux/store";
import {
  refreshAccessToken,
  logout,
  setAccessToken,
} from "../redux/slices/authSlice";

// give axios our current access token
setAccessTokenGetter(() => store.getState().auth.accessToken);

// mobile can supply a refresh token getter like before
export { setRefreshTokenGetter };

// tell axios what to do on 401
setUnauthorizedHandler(async (refreshTokenFromMobile?: string | null) => {
  try {
    const result = await store
      .dispatch(refreshAccessToken(refreshTokenFromMobile ?? undefined))
      .unwrap();
    store.dispatch(setAccessToken(result.accessToken));
    return result.accessToken;
  } catch {
    store.dispatch(logout());
    return null;
  }
});

export default api;
