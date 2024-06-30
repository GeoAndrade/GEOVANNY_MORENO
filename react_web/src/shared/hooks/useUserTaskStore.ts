import { UserTask } from "../../project";
import {
  addNewUserTask,
  deleteUserTask,
  setActiveUserTask,
  setNewUserTask,
  setUserTasks,
  updateUserTask,
} from "../userTask";
import { useAppStore } from "./useAppStore";

export const useUserTaskStore = () => {
  const {
    userTask: { userTasks, activeUserTask },
    dispatch,
  } = useAppStore();

  const onSetActiveUserTask = (task: UserTask) => {
    dispatch(setActiveUserTask(task));
  };

  const onResetUserTask = () => {
    dispatch(setNewUserTask());
  };

  const onSetUserTasks = (tasks: UserTask[]) => {
    dispatch(setUserTasks(tasks));
  };

  const onDeleteUserTask = (task: UserTask) => {
    dispatch(deleteUserTask(task));
  };

  const onUpdateUserTask = (task: UserTask) => {
    dispatch(updateUserTask(task));
    onResetUserTask();
  };

  const onAddNewUserTask = (task: UserTask) => {
    dispatch(addNewUserTask(task));
    onResetUserTask();
  };

  return {
    userTasks,
    activeUserTask,
    onSetActiveUserTask,
    onResetUserTask,
    onSetUserTasks,
    onDeleteUserTask,
    onUpdateUserTask,
    onAddNewUserTask,
  };
};
