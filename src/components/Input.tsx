import type { CSSProperties } from "react";
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

  const style: CSSProperties = {
    padding: "12px",
    borderRadius: theme.radius,
    border: `1px solid ${error ? "#dc2626" : theme.colors.border}`,
    background: theme.colors.card,
    color: theme.colors.text,
    fontSize: 14,
    outline: "none",
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <input
        ref={ref}
        name={name}
        style={style}
        placeholder={placeholder}
        type={type}
        onChange={onChange}
        onBlur={onBlur}
      />

      {error && (
        <span style={{ color: "#dc2626", fontSize: 12 }}>
          {error}
        </span>
      )}
    </div>
  );
}