import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/Button';
export function ThemeToggle() {
  const [dark, setDark] = useState(localStorage.getItem('tasteflow.theme') === 'dark');
  useEffect(() => { document.documentElement.classList.toggle('dark', dark); localStorage.setItem('tasteflow.theme', dark ? 'dark' : 'light'); }, [dark]);
  return <Button variant="outline" onClick={() => setDark((v) => !v)} aria-label="Toggle theme" className="px-3">{dark ? <Sun size={18}/> : <Moon size={18}/>}</Button>;
}
