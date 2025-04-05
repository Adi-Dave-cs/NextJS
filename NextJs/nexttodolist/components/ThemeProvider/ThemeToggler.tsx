'use client';

import { useThemeStore } from '@/lib/store/useThemeStore';

const themes = ['light' , 'dark' , 'cupcake' , 'synthwave', 'cyberpunk' , 'forest' , 'aqua' , 'luxury' , 'lemonade' , 'nord' , 'sunset'] as const;

export default function ThemeToggle() {
  const { theme, setTheme } = useThemeStore()

  return (
    <div className="dropdown">
      <label tabIndex={0} className="btn m-1">Themes</label>
      <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-200 rounded-box w-52">
        {themes.map((t) => (
          <li key={t}>
            <button
              className={theme === t ? 'active' : ''}
              onClick={() => setTheme(t)}
            >
              {t}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
