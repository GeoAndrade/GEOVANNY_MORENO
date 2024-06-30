import { BasePage } from "../template";
import { Box, TextField, Button, Typography } from "@mui/material";
import { useUserTaskStore } from "../../shared";
import { useEffect, useState } from "react";
import { UserTask } from "../interfaces";
import { UserTaskItem } from "../components/UserTaskItem";

const tasksExample: UserTask[] = [
  {
    idUserTask: 1,
    name: "Comprar víveres",
    description: "Comprar leche, pan y huevos",
    assignedTo: "Juan",
  },
  {
    idUserTask: 2,
    name: "Reunión de equipo",
    description: "Discutir el progreso del proyecto",
    assignedTo: "María",
  },
  {
    idUserTask: 3,
    name: "Pasear al perro",
    description: "Llevar a Rocky al parque",
    assignedTo: "Carlos",
  },
];

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

  const onUpdateActiveUserTask = (field: string, value: string) => {
    onSetActiveUserTask({ ...activeUserTask, [field]: value });
  };

  const onPressEditTask = (task: UserTask) => {
    onSetActiveUserTask(task);
    setIsEditing(true);
  };

  const onPressDeleteTask = (task: UserTask) => {
    onDeleteUserTask(task);
    setIsEditing(false);
  };

  const onPressNewUserTask = () => {
    onResetUserTask();
    setIsEditing(false);
  };

  const onPressUpdateUserTask = () => {
    onUpdateUserTask({
      ...activeUserTask,
      idUserTask: activeUserTask.idUserTask,
    });

    setIsEditing(false);
  };

  const onPressAddNewUserTask = () => {
    onAddNewUserTask({ ...activeUserTask, idUserTask: new Date().getTime() });
  };

  const validForm = () =>
    activeUserTask.name.length > 3 && activeUserTask.assignedTo.length > 3;

  useEffect(() => {
    onSetUserTasks(tasksExample);
  }, []);

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
            label="Asignado a"
            name="assignedTo"
            value={activeUserTask?.assignedTo || ""}
            onChange={(e) =>
              onUpdateActiveUserTask(e.target.name, e.target.value)
            }
            fullWidth
          />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
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
              />
            ))
          ) : (
            <Typography variant="body1">No hay tareas registradas.</Typography>
          )}
        </Box>
      </Box>
    </BasePage>
  );
};
