import React from "react";
import { useForm } from "react-hook-form";
import UserPath from "../../Service/UserPath";
import { useTheme } from '@mui/material/styles';
import {
    Avatar,
    Button,
    TextField,
    Grid,
    Typography,
    Container,
    Box,
    MenuItem,
    Checkbox,
    FormControlLabel,
    Link,
    CssBaseline,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import ColorSelect from "../Atoms/ColorSelector/ColorSelector";
import Logo from "../Atoms/Logo/Logo";

export default function SignUpForm() {

const {register, handleSubmit, formState: { errors }} = useForm();
const theme = useTheme();
const { createUser } = UserPath();
const onSubmit = async (data) => {
    try {
        await createUser(data);
        alert("User Profile Created");
    } catch (error) {
        alert("Submission has failed.");
    }
    };


    return (
        <Container style={{ color: theme.palette.text.primary }} component="main" maxWidth="xs" sx={{ width: "100%", md: "50%"  }}>
        <Box sx={{ display: "flex", flexDirection: "column",  alignItems: "center" }}>
            <Logo/>
            {/* 
            <Typography component="h1" variant="h5" sx={{ fontWeight: 600, fontSize: "40px", color: "text.primary" }} >
            Sign up
            </Typography> */}

            <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3,  }}>
                <Grid container spacing={2} sx={{ display: "flex", flexDirection: "column",  alignItems: "center"  }}>
                    <Grid>
                        <TextField
                        fullWidth
                        label="First Name"
                        {...register("firstName", { required: true })}
                        error={!!errors.firstName}
                        helperText={errors.firstName && "Required"}/>
                    </Grid>

                    <Grid>
                        <TextField
                            fullWidth
                            label="Last Name"
                            {...register("lastName", { required: true })}
                            error={!!errors.lastName}
                            helperText={errors.lastName && "Required"}/>
                    </Grid>

                    <Grid>
                        <TextField
                            fullWidth
                            label="Phone"
                            {...register("phone", { required: true })}
                            error={!!errors.phone}
                            helperText={errors.phone && "Required"}/>
                    </Grid>

                    <Grid>
                        <TextField
                            fullWidth
                            label="Email"
                            {...register("email", {
                            required: true,
                            pattern: /^\S+@\S+$/i,
                            })}
                            error={!!errors.email}
                            helperText={errors.email && "Invalid email"}/>
                    </Grid>

                    <Grid>
                        <TextField
                            fullWidth
                            type="password"
                            label="Password"
                            {...register("password", {
                            required: "Password is required",
                            minLength: 6,
                            message: "Minimum 6 characters",
                            })}
                            helperText={errors.password?.message}/>
                    </Grid>

                    <Grid>
                        <TextField
                            fullWidth
                            label="Address"
                            {...register("address", { required: true })}
                            error={!!errors.address}
                            helperText={errors.address && "Required"} />
                    </Grid>

                <Grid container spacing={2}>
                    <Grid>
                        <ColorSelect  register={register} />
                    </Grid>

                    <Grid>
                        <TextField
                        select
                        fullWidth
                        label="Children Count"
                        defaultValue="1"
                        {...register("childrenCount", { required: true })}
                        >
                        <MenuItem value="1">1</MenuItem>
                        <MenuItem value="2">2</MenuItem>
                        <MenuItem value="3">3</MenuItem>
                        <MenuItem value="4">4</MenuItem>
                        </TextField>
                    </Grid>
                </Grid>
            </Grid>

            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}>
                Sign Up
            </Button>
        </Box>
        </Box>
        </Container>
    );
    }
