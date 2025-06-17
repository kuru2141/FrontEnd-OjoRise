'use client'

import { useEffect } from 'react';
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/authStore";

export default function SuccessPageRoute() {
    const router = useRouter();
    const { setLoggedIn, setGuest } = useAuthStore();
    // const accessToken = localStorage.getItem("accessToken");
    useEffect(() => {
        // if (accessToken) {
        //     setLoggedIn(true);
        //     setGuest(false);
        // } else {
        //     setLoggedIn(false);
        //     setGuest(false);
        // }
        setLoggedIn(true);
        setGuest(false);

        router.push("/");
    }, [setLoggedIn, setGuest, router]);

    return null;
}
