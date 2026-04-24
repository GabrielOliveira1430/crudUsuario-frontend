import { useLogin } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../hooks/useTheme";
import Button from "../components/Button";
import Input from "../components/Input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

// 🔥 schema
const schema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "Senha mínima de 6 caracteres"),
});

type FormData = z.infer<typeof schema>;

export default function Login() {
  const { mutate, isPending } = useLogin();
  const navigate = useNavigate();
  const { theme } = useTheme();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    mutate(data, {
      onSuccess: () => {
        toast.success("Código enviado!");
        navigate("/verify-2fa");
      },
      onError: () => {
        toast.error("Credenciais inválidas");
      },
    });
  };

  return (
    <div style={container}>
      <div style={{ ...card, background: theme.colors.card }}>
        <h1 style={title}>Bem-vindo</h1>

        <form style={form} onSubmit={handleSubmit(onSubmit)}>
          <Input
            placeholder="Email"
            error={errors.email?.message}
            {...register("email")}
          />

          <Input
            placeholder="Senha"
            type="password"
            error={errors.password?.message}
            {...register("password")}
          />

          <Button loading={isPending} fullWidth>
            Entrar
          </Button>
        </form>

        <div style={links}>
          <span onClick={() => navigate("/forgot-password")} style={link}>
            Esqueceu a senha?
          </span>

          <span onClick={() => navigate("/register")} style={link}>
            Criar conta
          </span>
        </div>
      </div>
    </div>
  );
}

// estilos
const container = {
  height: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
} as React.CSSProperties;

const card = {
  width: 350,
  padding: 30,
  borderRadius: 12,
  display: "flex",
  flexDirection: "column",
  gap: 20,
} as React.CSSProperties;

const title = { textAlign: "center" } as React.CSSProperties;

const form = {
  display: "flex",
  flexDirection: "column",
  gap: 12,
} as React.CSSProperties;

const links = {
  display: "flex",
  justifyContent: "space-between",
  fontSize: 13,
} as React.CSSProperties;

const link = {
  cursor: "pointer",
  color: "#6366f1",
} as React.CSSProperties;