import { api } from "@/lib/axios";
import { userRequest } from "@/types/chatbot";
import { SaveAgeTestResult } from "@/types/planAge";
import { buildSearchParams } from "@/utils/requestHelper";
import axios from "axios";

export const ageTestResult = async (userAge: string, resultAge: string) => {
  const response = await api.get(`/age${buildSearchParams({ age: userAge, result: resultAge })}`);
  return response.data;
};

export const saveAgeTest = async (result: SaveAgeTestResult) => {
  const response = await api.post("/age/result", result);
  return response.data;
};

export const ageTest = async (info: userRequest) => {
  const response = await axios.post("/api/chat", info);
  return response.data;
};
