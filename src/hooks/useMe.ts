import { useQuery } from "@tanstack/react-query";
import { getMe } from "../services/userService";
import { getAccessToken } from "../store/auth.store";

export const useMe = () => {
  const token = getAccessToken();

  return useQuery({
    queryKey: ["me"],
    queryFn: getMe,
    retry: false,
    enabled: !!token, // 🔥 evita chamada sem token
  });
};