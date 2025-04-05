import { create } from "zustand";
// creating zustand store for usage of theme toggling
import { persist } from "zustand/middleware";
// persisting zustand state

// types
type Theme = 'light' | 'dark' | 'cupcake' | 'synthwave'| 'cyberpunk' | 'forest' | 'aqua' | 'luxury' | 'lemonade' | 'nord' | 'sunset';

type ThemeStore={
    theme : Theme;
    setTheme: (theme :Theme)=> void;
};

export const useThemeStore = create<ThemeStore>()(
    persist(
        (set)=>(
        {
            theme : 'dark',
            setTheme : (theme : Theme)=>{
                set({theme});
                if(typeof document !== undefined)
                {
                    document.documentElement.setAttribute('data-theme',theme );                }
            }
        }
        ),
        {
            name:'site-theme', //local storage
        }
    )
);