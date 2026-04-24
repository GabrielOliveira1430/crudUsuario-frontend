import type { CSSProperties } from "react";
import { useTheme } from "../hooks/useTheme";

type Props = {
  placeholder?: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function Input({
  placeholder,
  type = "text",
  value,
  onChange,
}: Props) {
  const { theme } = useTheme();

  const style: CSSProperties = {
    padding: "12px",
    borderRadius: theme.radius,
    border: `1px solid ${theme.colors.border}`,
    background: theme.colors.card,
    color: theme.colors.text,
    fontSize: 14,
    outline: "none",
  };

  return (
    <input
      style={style}
      placeholder={placeholder}
      type={type}
      value={value}
      onChange={onChange}
    />
  );
}