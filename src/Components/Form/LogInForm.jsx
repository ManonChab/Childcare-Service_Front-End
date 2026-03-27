import React from "react";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import { UserContext } from "../../Context/UserContext";
import UserPath from "../../Service/UserPath";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router";
import {
    Avatar,
    Button,
    TextField,
    Typography,
    Container,
    Box,
    CssBaseline,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Logo from "../Atoms/Logo/Logo";

export function LogInForm() {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const theme = useTheme();
    const { loginUser } = UserPath();
    const [apiError, setApiError] = React.useState("");
    const { login } = useContext(UserContext);
    const navigate = useNavigate();

    const onSubmit = async (data) => {
    try {
        await login(data);
        navigate("/");
    } catch (error) {
        const message =
            error.response?.data?.message ||
            error.response?.data?.error ||
            error.message ||
            "Login failed";

        setApiError(message);
    }
};

    return (
        <Container
            component="main"
            maxWidth="xs"
            sx={{ width: "100%", md: "50%", color: theme.palette.text.primary }}
        >
            <CssBaseline />

            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <Logo/>

                {apiError && (
                <Typography color="error" sx={{ mt: 1 }}>
                    {apiError}
                </Typography>
)}

                <Typography
                    component="h1"
                    variant="h5"
                    sx={{ fontWeight: 600, fontSize: "40px", color: "text.primary" }}
                >
                    Log in
                </Typography>

                <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
                    
                    <TextField
                        fullWidth
                        label="Email"
                        margin="normal"
                        {...register("email", {
                            required: "Email is required",
                            pattern: {
                                value: /^\S+@\S+$/i,
                                message: "Invalid email format",
                            },
                        })}
                        error={!!errors.email}
                        helperText={errors.email?.message}
                    />

                    <TextField
                        fullWidth
                        type="password"
                        label="Password"
                        margin="normal"
                        {...register("password", {
                            required: "Password is required",
                        })}
                        error={!!errors.password}
                        helperText={errors.password?.message}
                    />

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Log In
                    </Button>
                </Box>
            </Box>
        </Container>
    );
}