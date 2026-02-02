'use client';

import Image from "next/image";
import { useContext } from 'react';
import { ThemeContext } from "./ThemeSwitcher";

export default function HeroLogo() {
  const { theme, mounted } = useContext(ThemeContext);

  const logoSrc = (mounted && theme === 'light')
    ? "/images/logo-ricardo-zea-base.svg"
    : "/images/logo-ricardo-zea-base.svg";

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
