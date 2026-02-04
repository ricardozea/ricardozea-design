'use client';

import Image from "next/image";
import { useContext } from 'react';
import { ThemeContext } from "./ThemeSwitcher";

export default function HeroLogo() {
  const { theme, mounted } = useContext(ThemeContext);

  const logoSrc = (mounted && theme === 'light')
    //Hero logo on homepage
    ? "/images/logo-ricardo-zea-base.svg" // Dark mode logo
    : "/images/logo-ricardo-zea-base.svg"; // Light mode logo

  return (
    <Image
      src={logoSrc}
      alt="Ricardo Zea Logo"
      width={180}
      height={138}
      className='hero-logo'
      priority
    />
  );
}
