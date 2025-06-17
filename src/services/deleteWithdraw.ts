import api from "@/lib/axios";

export const deleteWithdraw = async () => {
  const response = await api.delete("/auth/withdraw");
  return response.data;
}