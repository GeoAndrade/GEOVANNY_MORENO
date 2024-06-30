import { BasePage } from "../template";
import {
  Box,
  TextField,
  Button,
  Typography,
  CircularProgress,
} from "@mui/material";
import { useUserTaskStore } from "../../shared";
import { useEffect, useState } from "react";
import { UserTask } from "../interfaces";
import { UserTaskItem } from "../components";
import { userTaskController } from "../../services";
import Swal from "sweetalert2";

export const HomePage = () => {
  const {
    userTasks,
    activeUserTask,
    onSetActiveUserTask,
    onResetUserTask,
    onSetUserTasks,
    onDeleteUserTask,
    onUpdateUserTask,
    onAddNewUserTask,
  } = useUserTaskStore();

  const [isEditing, setIsEditing] = useState<boolean>(false);

  const [fetchGetUserTasks, { isLoading: isLoadingUserTasks }] =
    userTaskController.useLazyGetUserTasksQuery();
  const [fetchPostUserTask, { isLoading: isLoadingNewUserTask }] =
    userTaskController.usePostCreateTaskMutation();
  const [fetchPatchUserTask, { isLoading: isLoadingUpdateUserTask }] =
    userTaskController.usePatchUserTaskMutation();
  const [fetchDeleteUserTask, { isLoading: isLoadingDeleteUserTask }] =
    userTaskController.useDeleteUserTaskMutation();

  const onUpdateActiveUserTask = (field: string, value: string) => {
    onSetActiveUserTask({ ...activeUserTask, [field]: value });
  };

  const onPressEditTask = (task: UserTask) => {
    onSetActiveUserTask(task);
    setIsEditing(true);
  };

  const onPressCompletedTask = async (task: UserTask) =>
    await fetchPatchUserTask({ ...task, completed: true })
      .unwrap()
      .then(onUpdateUserTask)
      .then(onLoadAllUserTasks)
      .catch((error) => {
        Swal.fire(
          "Error al completar tarea",
          JSON.stringify(error, null, 3),
          "error"
        );
      })
      .finally(() => setIsEditing(false));

  const onPressDeleteTask = async (task: UserTask) =>
    await fetchDeleteUserTask(task)
      .unwrap()
      .then(() => {
        onDeleteUserTask(task);
      })
      .catch((error) => {
        Swal.fire(
          "Error al eliminar tarea",
          JSON.stringify(error, null, 3),
          "error"
        );
      })
      .finally(() => setIsEditing(false));

  const onPressNewUserTask = () => {
    onResetUserTask();
    setIsEditing(false);
  };

  const onPressUpdateUserTask = async () =>
    await fetchPatchUserTask(activeUserTask)
      .unwrap()
      .then(onUpdateUserTask)
      .then(onLoadAllUserTasks)
      .catch((error) => {
        Swal.fire(
          "Error al actualizar tarea",
          JSON.stringify(error, null, 3),
          "error"
        );
      })
      .finally(() => setIsEditing(false));

  const onPressAddNewUserTask = async () =>
    await fetchPostUserTask(activeUserTask)
      .unwrap()
      .then(onAddNewUserTask)
      .then(onLoadAllUserTasks)
      .catch((error) => {
        Swal.fire(
          "Error al agregar tarea",
          JSON.stringify(error, null, 3),
          "error"
        );
      });

  const onLoadAllUserTasks = async () =>
    await fetchGetUserTasks()
      .unwrap()
      .then(onSetUserTasks)
      .catch((error) => {
        Swal.fire("Error", JSON.stringify(error, null, 3), "error");
      });

  const validForm = () =>
    activeUserTask.name.length > 3 && activeUserTask.description.length > 3;

  useEffect(() => {
    onLoadAllUserTasks();
  }, []);

  useEffect(() => {
    console.log({ activeUserTask });
  }, [activeUserTask]);

  return (
    <BasePage>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          height: "100%",
          justifyContent: "space-between",
          padding: "16px",
        }}
      >
        <Box
          sx={{
            width: "30%",
            padding: "16px",
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            alignItems: "center",
          }}
        >
          <Typography variant="h5">
            {isEditing ? "Editar Tarea" : "Nueva Tarea"}
          </Typography>
          <TextField
            label="Nombre de la tarea"
            name="name"
            value={activeUserTask?.name || ""}
            onChange={(e) =>
              onUpdateActiveUserTask(e.target.name, e.target.value)
            }
            fullWidth
          />
          <TextField
            label="Descripción de la tarea"
            name="description"
            value={activeUserTask?.description || ""}
            onChange={(e) =>
              onUpdateActiveUserTask(e.target.name, e.target.value)
            }
            fullWidth
          />
          <TextField
            type="date"
            label="Fecha de vencimiento"
            name="dueDate"
            value={
              activeUserTask?.dueDate instanceof Date
                ? activeUserTask.dueDate.toISOString().split("T")[0]
                : activeUserTask?.dueDate || ""
            }
            onChange={(e) =>
              onUpdateActiveUserTask(e.target.name, e.target.value)
            }
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
          />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            {isLoadingNewUserTask ||
            isLoadingUpdateUserTask ||
            isLoadingDeleteUserTask ? (
              <CircularProgress color="warning" />
            ) : (
              <>
                <Button
                  disabled={!validForm()}
                  variant="contained"
                  color="primary"
                  onClick={
                    isEditing ? onPressUpdateUserTask : onPressAddNewUserTask
                  }
                >
                  {isEditing ? "Actualizar Tarea" : "Guardar Tarea"}
                </Button>
                {isEditing && (
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={onPressNewUserTask}
                  >
                    Nueva Tarea
                  </Button>
                )}
              </>
            )}
          </Box>
        </Box>
        <Box
          sx={{
            width: "60%",
            height: "100vh",
            overflowY: "auto",
            padding: "16px",
          }}
        >
          {isLoadingUserTasks ? (
            <CircularProgress color="warning" />
          ) : (
            <>
              <Typography variant="h4" gutterBottom>
                Mis Tareas
              </Typography>
              {userTasks.length > 0 ? (
                userTasks.map((task) => (
                  <UserTaskItem
                    key={task.idUserTask}
                    task={task}
                    onPressEditTask={onPressEditTask}
                    onPressDeleteTask={onPressDeleteTask}
                    onPressCompletedTask={onPressCompletedTask}
                  />
                ))
              ) : (
                <Typography variant="body1">
                  No hay tareas registradas.
                </Typography>
              )}
            </>
          )}
        </Box>
      </Box>
    </BasePage>
  );
};
