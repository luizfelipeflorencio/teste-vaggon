import {
  Stack,
  TextField,
  Typography,
  Button,
  Paper,
  InputAdornment,
  IconButton,
} from "@mui/material";

import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useNavigate } from "react-router-dom";
import useLoginService from "./login.service";

function LoginComponent() {
  const {
    login,
    showPassword,
    togglePassword,
    useForm: { errors, handleSubmit, register },
  } = useLoginService();

  const navigate = useNavigate();

  return (
    <Stack
      height="100vh"
      alignItems="center"
      justifyContent="center"
      sx={{ backgroundColor: "#f5f5f5", padding: 2 }}
    >
      <Paper
        elevation={6}
        sx={{ padding: 5, width: "100%", maxWidth: 400, borderRadius: 4 }}
      >
        <Stack spacing={3}>
          <Typography
            variant="h4"
            textAlign="center"
            fontWeight={700}
            color="primary"
          >
            Calendário
          </Typography>

          {/* EMAIL */}
          <TextField
            label="Email"
            type="email"
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AlternateEmailIcon />
                </InputAdornment>
              ),
            }}
            fullWidth
          />

          {/* SENHA */}
          <TextField
            label="Senha"
            type={showPassword ? "text" : "password"}
            {...register("password")}
            error={!!errors.password}
            helperText={errors.password?.message}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockOutlinedIcon />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={togglePassword}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            fullWidth
          />

          <Typography
            variant="subtitle2"
            textAlign="right"
            sx={{ cursor: "pointer" }}
            onClick={() => navigate("/register")}
          >
            Registrar
          </Typography>

          <Button
            variant="contained"
            size="large"
            fullWidth
            onClick={handleSubmit(login)}
          >
            Entrar
          </Button>
        </Stack>
      </Paper>
    </Stack>
  );
}

export default LoginComponent;
