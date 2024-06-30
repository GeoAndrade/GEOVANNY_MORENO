import { USER_TASK_BASE_URL, baseApiConfig } from "../config";
import { createApi } from "@reduxjs/toolkit/query/react";
import { UserTask } from "../../../project";
export const userTaskController = createApi({
  reducerPath: "userTaskController",
  baseQuery: baseApiConfig,
  endpoints: (build) => ({
    //Get
    getUserTasks: build.query<UserTask[], void>({
      query: () => ({
        url: USER_TASK_BASE_URL,
      }),
    }),
    //Post
    postCreateTask: build.mutation<UserTask, UserTask>({
      query: (body) => ({
        url: USER_TASK_BASE_URL,
        method: "POST",
        body,
      }),
    }),

    //Patch
    patchUserTask: build.mutation<UserTask, UserTask>({
      query: (body) => ({
        url: USER_TASK_BASE_URL,
        method: "PATCH",
        body,
      }),
    }),
    //Delete
    deleteUserTask: build.mutation<string, UserTask>({
      query: (body) => ({
        url: USER_TASK_BASE_URL,
        method: "DELETE",
        body,
      }),
    }),
  }),
});
