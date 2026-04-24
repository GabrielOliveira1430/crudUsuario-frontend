import { useState, type CSSProperties } from "react";
import { useTheme } from "../hooks/useTheme";

type Props = {
  placeholder?: string;
  type?: string;
  error?: string;

  // 🔥 react-hook-form props
  name?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  ref?: React.Ref<HTMLInputElement>;
};

export default function Input({
  placeholder,
  type = "text",
  error,
  name,
  onChange,
  onBlur,
  ref,
}: Props) {
  const { theme } = useTheme();

  // 👁️ controle de visibilidade
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";

  const inputType = isPassword
    ? showPassword
      ? "text"
      : "password"
    : type;

  const wrapper: CSSProperties = {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    gap: 4,
  };

  const style: CSSProperties = {
    padding: "12px",
    paddingRight: isPassword ? "40px" : "12px", // espaço pro ícone
    borderRadius: theme.radius,
    border: `1px solid ${error ? "#dc2626" : theme.colors.border}`,
    background: theme.colors.card,
    color: theme.colors.text,
    fontSize: 14,
    outline: "none",
  };

  const eyeButton: CSSProperties = {
    position: "absolute",
    right: 10,
    top: 10,
    cursor: "pointer",
    fontSize: 16,
    opacity: 0.6,
  };

  return (
    <div style={wrapper}>
      <input
        ref={ref}
        name={name}
        style={style}
        placeholder={placeholder}
        type={inputType}
        onChange={onChange}
        onBlur={onBlur}
      />

      {/* 👁️ botão só aparece se for senha */}
      {isPassword && (
        <span
          style={eyeButton}
          onClick={() => setShowPassword((prev) => !prev)}
        >
          {showPassword ? "🙈" : "👁️"}
        </span>
      )}

      {error && (
        <span style={{ color: "#dc2626", fontSize: 12 }}>
          {error}
        </span>
      )}
    </div>
  );
}