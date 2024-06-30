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
        description: "",
        responsible: "",
      },
    };

    const userTasks = [
      {
        idUserTask: 1,
        name: "Task 1",
        description: "Description 1",
        responsible: "Responsible 1",
      },
      {
        idUserTask: 2,
        name: "Task 2",
        description: "Description 2",
        responsible: "Responsible 2",
      },
    ];

    const action = setUserTasks(userTasks);
    const state = userTaskSlice.reducer(initialState, action);
    expect(state.userTasks).toEqual(userTasks);
    expect(state.activeUserTask).toEqual(initialState.activeUserTask);
  });
});
