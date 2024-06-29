import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "..";

export const useAppStore = () => {
  //*Auth
  const auth = useSelector((store: RootState) => store.auth);

  const dispatch = useDispatch<AppDispatch>();
  return { auth, dispatch };
};
