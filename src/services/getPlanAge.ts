import api from "@/lib/axios";

export const getPlanAge = async () => {
  const { data } = await api.get("/age/result");
  return data;
};
