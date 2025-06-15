import api from '@/lib/axios';
import { userRequest } from '@/types/chatbot';
import axios from 'axios';
import client from './client';

export const planOCR = async (formData: FormData) => {
  const response = await client.post('/google/ocr', formData);
  return response.data;
};

export const gptOCR = async (info: userRequest) => {
  const response = await axios.post('/api/chat', info);
  return response.data;
}