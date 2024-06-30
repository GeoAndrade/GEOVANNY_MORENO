import { Card, CardContent, Typography, Box, Button } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import { UserTask } from "../interfaces";

interface Props {
  task: UserTask;
  onPressEditTask: (task: UserTask) => void;
  onPressDeleteTask: (task: UserTask) => void;
  onPressCompletedTask: (task: UserTask) => void;
}

export const UserTaskItem = ({
  task,
  onPressEditTask,
  onPressDeleteTask,
  onPressCompletedTask,
}: Props) => {
  const formattedDate = new Date(task.dueDate).toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return (
    <Card key={task.idUserTask} sx={{ marginBottom: "16px" }}>
      <CardContent>
        <Typography variant="h5">{task.name}</Typography>
        <Typography variant="body2">{task.description}</Typography>
        <Typography variant="body2">
          Fecha de vencimiento: {formattedDate}
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "8px",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {task.completed ? (
              <CheckCircleIcon sx={{ color: "green" }} />
            ) : (
              <CancelIcon sx={{ color: "red" }} />
            )}
            <Typography
              variant="body2"
              sx={{ marginLeft: "8px", fontWeight: "bold" }}
            >
              {task.completed ? "Completada" : "Pendiente"}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              gap: "8px",
            }}
          >
            <Button variant="outlined" onClick={() => onPressEditTask(task)}>
              Editar
            </Button>
            <Button
              variant="outlined"
              color="error"
              onClick={() => onPressDeleteTask(task)}
            >
              Eliminar
            </Button>
            {!task.completed && (
              <Button
                variant="outlined"
                onClick={() => onPressCompletedTask(task)}
                sx={{ color: "green" }}
              >
                Completado
              </Button>
            )}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};
