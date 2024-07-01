import { UserTask } from "../src/project";
import {
  setUserTasks,
  userTaskSlice,
} from "../src/shared/userTask/userTaskSlice";

describe("userTaskReducer", () => {
  it("Debe agregar UserTasks correctamente", () => {
    const initialState = {
      userTasks: [],
      activeUserTask: {
        idUserTask: 0,
        name: "",
        dueDate: new Date(),
        completed: false,
        description: "",
      },
    };

    const userTasks: UserTask[] = [
      {
        idUserTask: 1,
        name: "Task 1",
        description: "Description 1",
        dueDate: new Date(),
        completed: false,
      },
      {
        idUserTask: 2,
        name: "Task 2",
        description: "Description 2",
        dueDate: new Date(),
        completed: false,
      },
    ];

    const action = setUserTasks(userTasks);
    const state = userTaskSlice.reducer(initialState, action);
    expect(state.userTasks).toEqual(userTasks);
    expect(state.activeUserTask).toEqual(initialState.activeUserTask);
  });
});
