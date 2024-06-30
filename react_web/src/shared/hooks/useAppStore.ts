import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "..";

export const useAppStore = () => {
  //*Auth
  const auth = useSelector((store: RootState) => store.auth);
  const userTask = useSelector((store: RootState) => store.userTask);

  const dispatch = useDispatch<AppDispatch>();
  return { auth, userTask, dispatch };
};
