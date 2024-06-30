import { Alert, Button, Grid, TextField } from "@mui/material";
import { AuthLayout } from "..";
import { useForm } from "../../hooks";
import { useAuthStore } from "../../shared";
let user = "";
let pass = "";
if (process.env.NODE_ENV === "development") {
  user = "geo@correo.com";
  pass = "123456";
}

export const LoginPage = () => {
  const { onLogin } = useAuthStore();

  const {
    username,
    password,
    onInputChange,
    usernameValid,
    passwordValid,
    isFormValid,
  } = useForm(
    {
      username: user,
      password: pass,
    },
    {
      username: [(value) => value.includes("@"), "Ingrese un correo válido"],
      password: [
        (value) => value.length >= 6,
        "El password debe tener más de 6 letras.",
      ],
    }
  );

  const onPressLogin = async () => {
    await onLogin({ username, password });
  };
  return (
    <AuthLayout title={"Login"}>
      <form>
        <Grid container>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              disabled={false}
              label="Correo"
              type="email"
              placeholder="geo@correp.com"
              fullWidth
              name="username"
              value={username}
              onChange={onInputChange}
              error={!!usernameValid}
              helperText={usernameValid}
            />
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              disabled={false}
              label="Contraseña"
              type="password"
              placeholder="Contraseña"
              fullWidth
              name="password"
              value={password}
              onChange={onInputChange}
              error={!!passwordValid}
              helperText={passwordValid}
            />
          </Grid>
          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
            <Grid item xs={12} display={"none"}>
              <Alert severity="error">hola</Alert>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                disabled={!isFormValid}
                variant="contained"
                fullWidth
                type="submit"
                onClick={onPressLogin}
              >
                Login
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
};
