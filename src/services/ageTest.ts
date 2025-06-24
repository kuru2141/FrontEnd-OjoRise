import api from "@/lib/axios";
import { userRequest } from "@/types/chatbot";
import { buildSearchParams } from "@/utils/requestHelper";
import axios from "axios";

export const ageTestResult = async (userAge: string, resultAge: string) => {
  const response = await api.get(`/age${buildSearchParams({ age: userAge, result: resultAge })}`);
  return response.data;
};

export const ageTest = async (info: userRequest) => {
  const response = await axios.post("/api/chat", info);
  return response.data;
};
