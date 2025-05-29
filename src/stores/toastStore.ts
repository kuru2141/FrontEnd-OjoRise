import { create } from 'zustand';
import { toast, ToastOptions } from 'react-toastify';

type ToastType = 'info' | 'success' | 'error' | 'warn';

type ToastStore = {
    lastMessage: string | null;
    showToast: (message: string, type?: ToastType, opts?: ToastOptions) => void;
    showErrorFromApi: (error: unknown) => void;
};

export const useToastStore = create<ToastStore>((set, get) => ({
    lastMessage: null,

    showToast: (message, type = 'info', opts = {}) => {
        const { lastMessage } = get();

        //중복 메세지 방지
        if(lastMessage === message)return;

        toast.dismiss();

        toast[type](message, {
            role: 'alert', //접근성: 스크린 리더가 읽음
            position: 'top-right',
            autoClose: 3000,
            ...opts,
        });

        set({ lastMessage: message });
    },

    showErrorFromApi: (error: any) => {
        //API 에러 응답 자동 처리
        let message = '알 수 없는 오류가 발생하였습니다.';

        if (error?.response?.status){
            const status = error.response.status;
            switch (status) {
                case 400:
                    message = '잘못된 요청입니다.';
                    break;
                case 401:
                    message = '로그인이 필요합니다.';
                    break;
                case 403:
                    message = '접근 권한이 없습니다.';
                    break;
                case 404:
                    message = '요청한 페이지를 찾을 수 없습니다.';
                    break;
                case 500:
                    message = '서버 오류가 발생했습니다.';
                    break;
            }
        }

        //서버에서 내려준 메세지 우선일 경우
        if (error?.response?.status){
            message = error.response.data.message;
        }
        get().showToast(message, 'error');
    },
}));