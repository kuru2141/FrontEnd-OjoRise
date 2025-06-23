import { userRequest } from "@/types/chatbot"
import axios from "axios"



export const ageTest = async (info: userRequest) => {
  const response = await axios.post('/api/chat', info);
  return response.data;
}