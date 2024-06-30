import { LoginInfo, useAuthStorage } from "../../auth";
import { sleep } from "../../helpers";
import { authController } from "../../services";
import { checking, login, logout } from "../auth";
import { useAppStore } from "./useAppStore";
import Swal from "sweetalert2";

export const useAuthStore = () => {
  const { SaveJWTInfo, GetJWTInfo, CheckJWTInfo, DeleteJWTInfo } =
    useAuthStorage();
  const [fetchLogin] = authController.usePostLoginMutation();
  const {
    auth: { status, jwtInfo },
    dispatch,
  } = useAppStore();
  const onLogin = async (loginInfo: LoginInfo) => {
    dispatch(checking());
    await fetchLogin(loginInfo)
      .unwrap()
      .then(
        async (jwtInfo) =>
          await SaveJWTInfo(jwtInfo).then(() => dispatch(login(jwtInfo)))
      )
      .catch((error) => {
        Swal.fire("Error", error.data, "error");
        dispatch(logout());
      });
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
