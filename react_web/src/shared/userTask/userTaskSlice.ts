import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserTask } from "../../project";

export interface userTaskStore {
  activeUserTask: UserTask;
  userTasks: UserTask[];
}

const initialUserTask: UserTask = {
  idUserTask: 0,
  name: "",
  description: "",
  responsible: "",
};

const initialState: userTaskStore = {
  activeUserTask: initialUserTask,
  userTasks: [],
};

export const userTaskSlice = createSlice({
  name: "usertask",
  initialState,
  reducers: {
    setActiveUserTask: (state, action: PayloadAction<UserTask>) => {
      state.activeUserTask = action.payload;
    },
    setUserTasks: (state, action: PayloadAction<UserTask[]>) => {
      state.userTasks = action.payload;
    },
    setNewUserTask: (state) => {
      state.activeUserTask = initialUserTask;
    },
    deleteUserTask: (state, action: PayloadAction<UserTask>) => {
      state.userTasks = [
        ...state.userTasks.filter(
          (x) => x.idUserTask !== action.payload.idUserTask
        ),
      ];
    },
    updateUserTask: (state, action: PayloadAction<UserTask>) => {
      const index = state.userTasks.findIndex(
        (task) => task.idUserTask === action.payload.idUserTask
      );
      if (index !== -1) {
        state.userTasks[index] = action.payload;
      }
    },
    addNewUserTask: (state, action: PayloadAction<UserTask>) => {
      state.userTasks = [...state.userTasks, action.payload];
    },
  },
});

export const {
  setActiveUserTask,
  setUserTasks,
  setNewUserTask,
  deleteUserTask,
  updateUserTask,
  addNewUserTask,
} = userTaskSlice.actions;
