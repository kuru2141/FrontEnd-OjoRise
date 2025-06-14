import client from './client';

export const planOCR = async (formData: FormData) => {
  const response = await client.post('/google/ocr', formData
  );
  return response.data;
};
