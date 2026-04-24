import { useState } from "react";
import { useLogin } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../hooks/useTheme";
import Button from "../components/Button";

type LoginProps = {
  onSuccess?: (email: string) => void;
};

export default function Login({ onSuccess }: LoginProps) {
  const { mutate, isPending } = useLogin();
  const navigate = useNavigate();
  const { theme } = useTheme();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (!email.trim() || !password.trim()) {
      alert("Preencha email e senha");
      return;
    }

    mutate(
      { email, password },
      {
        onSuccess: () => {
          localStorage.setItem("auth_email", email);
          onSuccess?.(email);
          navigate("/verify-2fa");
        },
        onError: () => {
          alert("Credenciais inválidas");
        },
      }
    );
  };

  return (
    <div style={container}>
      <div style={{ ...card, background: theme.colors.card }}>
        <h1 style={title}>Bem-vindo de volta</h1>
        <p style={subtitle}>Entre na sua conta</p>

        <div style={form}>
          <input
            style={input}
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            style={input}
            placeholder="Senha"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button
            onClick={handleLogin}
            loading={isPending}
            fullWidth
          >
            Entrar
          </Button>
        </div>

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

const input: React.CSSProperties = {
  padding: "12px",
  borderRadius: 8,
  fontSize: 14,
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