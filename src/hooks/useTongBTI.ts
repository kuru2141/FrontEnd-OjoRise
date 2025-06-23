import { useQuery } from "@tanstack/react-query";
import { Question, TongBTIResponse } from "@/types/tongBTI";
import { fetchQuestions, tongbti } from "@/services/tongbti";

export const useTongBTI = () => {
  return useQuery<TongBTIResponse>({
    queryKey: ["tongbti"],
    queryFn: tongbti,
  });
};

export const useFetchQuestions = () =>
  useQuery<Question[]>({
    queryKey: ["questions"],
    queryFn: fetchQuestions,
  });
