import {
    Stack,
    TextField,
    Typography,
    Button,
    Paper,
    InputAdornment,
    IconButton,
} from "@mui/material";
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useNavigate } from "react-router-dom";
import useRegisterService from "./register.service";

function RegisterComponent() {
    const {
        create,
        showPassword,
        togglePassword,
        useForm: { errors, handleSubmit, register },
    } = useRegisterService();

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

                    {/* NOME */}
                    <TextField
                        label="Nome"
                        type="name"
                        {...register("name")}
                        error={!!errors.name}
                        helperText={errors.name?.message}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <DriveFileRenameOutlineIcon />
                                </InputAdornment>
                            ),
                        }}
                        fullWidth
                    />

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
                        onClick={() => navigate("/")}
                    >
                        Login
                    </Typography>

                    <Button
                        variant="contained"
                        size="large"
                        fullWidth
                        onClick={handleSubmit(create)}
                    >
                        Criar Conta
                    </Button>
                </Stack>
            </Paper>
        </Stack>
    );
}

export default RegisterComponent;
