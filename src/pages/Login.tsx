import { useLogin } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../hooks/useTheme";
import Button from "../components/Button";
import Input from "../components/Input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

// 🔥 schema de validação
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
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: FormData) => {
    // 🔥 DEBUG (pode remover depois)
    console.log("LOGIN DATA:", data);

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
        <p style={subtitle}>Acesse sua conta</p>

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

// 🎨 estilos
const container: React.CSSProperties = {
  height: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const card: React.CSSProperties = {
  width: 350,
  padding: 30,
  borderRadius: 12,
  boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
  display: "flex",
  flexDirection: "column",
  gap: 20,
};

const title: React.CSSProperties = {
  textAlign: "center",
};

const subtitle: React.CSSProperties = {
  textAlign: "center",
  fontSize: 14,
  opacity: 0.7,
};

const form: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 12,
};

const links: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  fontSize: 13,
};

const link: React.CSSProperties = {
  cursor: "pointer",
  color: "#6366f1",
};