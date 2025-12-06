import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { loginSchema } from "./login.validation";
import { useNavigate } from "react-router-dom";
import { post } from "../../utils/api";

export default function useLoginService() {
  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => setShowPassword((prev) => !prev);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const login = async ({ email, password }) => {

    const response = await post("/login", { email, password });
    console.log(response)
    if (response.success) {
      localStorage.setItem('userId', response.data.user.id)
      navigate("/calendar");
      return response.data;
    }
  }

  return {
    login,
    showPassword,
    togglePassword,
    useForm: {
      register,
      handleSubmit,
      errors,
    },
  };
}
