import { create } from 'zustand';

type AuthState = {
    isLoggedIn: boolean;
    isGuest: boolean;
    login: () => void;
    logout: () => void;
    setGuest: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
    isLoggedIn: false,
    isGuest: false,
    login: () => set({isLoggedIn: true, isGuest: false}),
    logout: () => set({isLoggedIn: false, isGuest: false}),
    setGuest: () => set({isGuest: true, isLoggedIn: false}),
}));