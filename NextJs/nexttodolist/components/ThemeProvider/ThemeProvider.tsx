"use client";
import { useEffect } from "react";
import { useThemeStore } from "@/lib/store/useThemeStore";

export const ThemeProvider = ()=>{
    const theme = useThemeStore((state) => state.theme);
    useEffect(()=>{
        document.documentElement.setAttribute('data-theme',theme);
    },[theme]);

    return<></>;
}