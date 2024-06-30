import { Card, CardContent, Typography, Box, Button } from "@mui/material";
import { UserTask } from "../interfaces";

interface Props {
  task: UserTask;
  onPressEditTask: (task: UserTask) => void;
  onPressDeleteTask: (task: UserTask) => void;
}
export const UserTaskItem = ({
  task,
  onPressEditTask,
  onPressDeleteTask,
}: Props) => {
  return (
    <Card key={task.idUserTask} sx={{ marginBottom: "16px" }}>
      <CardContent>
        <Typography variant="h5">{task.name}</Typography>
        <Typography variant="body2">{task.description}</Typography>
        <Typography variant="body2">Asignado a: {task.assignedTo}</Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
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
        </Box>
      </CardContent>
    </Card>
  );
};
