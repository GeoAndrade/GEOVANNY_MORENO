import { JWTInfo, LoginInfo, useAuthStorage } from "../../auth";
import { sleep } from "../../helpers";

import { checking, login, logout } from "../auth";
import { useAppStore } from "./useAppStore";

export const useAuthStore = () => {
  const { SaveJWTInfo, GetJWTInfo, CheckJWTInfo, DeleteJWTInfo } =
    useAuthStorage();
  const {
    auth: { status, jwtInfo },
    dispatch,
  } = useAppStore();
  const onLogin = async (loginInfo: LoginInfo) => {
    dispatch(checking());
    const userInfo: JWTInfo = {
      token: "token",
      expiracion: "",
      userName: loginInfo.email,
    };
    await sleep(2).then(
      async () =>
        await SaveJWTInfo(userInfo).then(() => dispatch(login(userInfo)))
    );
    return;
  };

  const onLogOut = async () =>
    await DeleteJWTInfo().then(() => dispatch(logout()));

  const onChecking = async () => {
    dispatch(checking());
    await sleep(2).then(
      async () =>
        await CheckJWTInfo().then(
          async (check) =>
            await GetJWTInfo().then((jwtInfo) =>
              check ? dispatch(login(jwtInfo)) : dispatch(logout())
            )
        )
    );
  };

  return { status, jwtInfo, onLogin, onLogOut, onChecking };
};
