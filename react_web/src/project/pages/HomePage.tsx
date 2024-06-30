import { useState, ChangeEvent } from "react";
import { BasePage } from "../template";
import {
  Box,
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
} from "@mui/material";

interface UserTask {
  name: string;
  description: string;
  assignedTo: string;
}

const tasksExample = [
  {
    name: "Comprar víveres",
    description: "Comprar leche, pan y huevos",
    assignedTo: "Juan",
  },
  {
    name: "Reunión de equipo",
    description: "Discutir el progreso del proyecto",
    assignedTo: "María",
  },
  {
    name: "Pasear al perro",
    description: "Llevar a Rocky al parque",
    assignedTo: "Carlos",
  },
];

export const HomePage = () => {
  const [tasks, setTasks] = useState<UserTask[]>(tasksExample);
  const [currentTask, setCurrentTask] = useState<UserTask>({
    name: "",
    description: "",
    assignedTo: "",
  });
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCurrentTask({ ...currentTask, [name]: value });
  };

  const onPressAddTask = () => {
    setTasks([...tasks, currentTask]);
    setCurrentTask({ name: "", description: "", assignedTo: "" });
  };

  const onPressEditTask = (index: number) => {
    setCurrentTask(tasks[index]);
    setIsEditing(true);
    setEditingIndex(index);
  };

  const onPressDeleteTask = (index: number) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const onPressSaveEdit = () => {
    if (editingIndex !== null) {
      const updatedTasks = tasks.map((task, index) =>
        index === editingIndex ? currentTask : task
      );
      setTasks(updatedTasks);
      setCurrentTask({ name: "", description: "", assignedTo: "" });
      setIsEditing(false);
      setEditingIndex(null);
    }
  };

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
            value={currentTask.name}
            onChange={onInputChange}
            fullWidth
          />
          <TextField
            label="Descripción de la tarea"
            name="description"
            value={currentTask.description}
            onChange={onInputChange}
            fullWidth
          />
          <TextField
            label="Asignado a"
            name="assignedTo"
            value={currentTask.assignedTo}
            onChange={onInputChange}
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
              variant="contained"
              color="primary"
              onClick={isEditing ? onPressSaveEdit : onPressAddTask}
            >
              {isEditing ? "Actualizar Tarea" : "Guardar Tarea"}
            </Button>
            {isEditing && (
              <Button
                variant="contained"
                color="secondary"
                onClick={() => {
                  setIsEditing(false);
                  setCurrentTask({ name: "", description: "", assignedTo: "" });
                  setEditingIndex(null);
                }}
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
          {tasks.map((task, index) => (
            <Card key={index} sx={{ marginBottom: "16px" }}>
              <CardContent>
                <Typography variant="h5">{task.name}</Typography>
                <Typography variant="body2">{task.description}</Typography>
                <Typography variant="body2">
                  Asignado a: {task.assignedTo}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    gap: "8px",
                  }}
                >
                  <Button
                    variant="outlined"
                    onClick={() => onPressEditTask(index)}
                  >
                    Editar
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => onPressDeleteTask(index)}
                  >
                    Eliminar
                  </Button>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>
    </BasePage>
  );
};
