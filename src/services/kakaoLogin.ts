import axios from '@/lib/axios';

export async function kakaoLogin(code: string) {
  const { data } = await axios.post("/login/kakao", { code });
  return data;
}