import { useMutation } from "@tanstack/react-query";
import { loginRequest, verify2FARequest } from "../services/auth.service";
import { useNavigate } from "react-router-dom";
import { useAuth as useAuthContext } from "../context/AuthContext";
import type { Permission } from "../types/auth.types";

// 🔐 LOGIN
export const useLogin = () => {
  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      loginRequest(email, password),

    onSuccess: (_, variables) => {
      localStorage.setItem("auth_email", variables.email);
    },
  });
};

// 🔢 VERIFY 2FA
export const useVerify2FA = () => {
  const navigate = useNavigate();
  const { login } = useAuthContext();

  return useMutation({
    mutationFn: ({ email, code }: { email: string; code: string }) =>
      verify2FARequest(email, code),

    onSuccess: async (data) => {
      // 🔥 compatível com backend atual OU futuro
      const accessToken = data?.accessToken || data?.data?.accessToken;
      const refreshToken = data?.refreshToken || data?.data?.refreshToken;

      if (!accessToken || !refreshToken) {
        throw new Error("Tokens inválidos");
      }

      await login(accessToken, refreshToken);

      localStorage.removeItem("auth_email");

      navigate("/dashboard");
    },
  });
};

// 🔥 RBAC
export const useAuth = () => {
  const context = useAuthContext();

  const can = (permission: Permission): boolean => {
    const user = context.user;

    if (!user) return false;

    if (user.role === "ADMIN") return true;

    const permissions = user.permissions ?? [];

    return permissions.includes(permission);
  };

  return {
    ...context,
    can,
  };
};