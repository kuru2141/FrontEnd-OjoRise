import api from "@/lib/axios";

export const getTongBTI = async () => {
  const { data } = await api.get("/tongbti/result");
  return data;
};
