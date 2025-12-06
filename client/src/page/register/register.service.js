import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { registerSchema } from "./register.validation";
import { useNavigate } from "react-router-dom";
import { post } from "../../utils/api";

export default function useRegisterService() {
    const [showPassword, setShowPassword] = useState(false);
    const togglePassword = () => setShowPassword((prev) => !prev);
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(registerSchema),
    });

    const create = async ({ name, email, password }) => {
        
        const response = await post("/users", { name, email, password });
        console.log(response)
        if (response.success) {
            localStorage.setItem('userId', response.data.user.id)
            navigate("/calendar");
            return response.data;
        }
    }

    return {
        create,
        showPassword,
        togglePassword,
        useForm: {
            register,
            handleSubmit,
            errors,
        },
    };
}