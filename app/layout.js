import './globals.css'; // Import Tailwind CSS
import { Roboto_Flex } from "next/font/google";
import { Alan_Sans } from "next/font/google";
import { ThemeProvider, ThemeStylesheet, ThemeToggle } from "../components/ThemeSwitcher";

const robotoFlex = Roboto_Flex({
  subsets: ["latin"],
  variable: "--font-roboto-flex",
  display: 'swap',
  axes: ['wght', 'wdth', 'opsz'],
  weight: 'variable',
});

const alanSans = Alan_Sans({
  subsets: ["latin"],
  variable: "--font-alan-sans",
  display: 'swap',
  weight: 'variable',
  fallback: ['sans-serif'],
});

export const metadata = {
  title: "Ricardo Zea - Sr. Web & Product Designer",
  description: "Portfolio of Ricardo Zea, Sr. Web & Product Designer specializing in UX/UI Design and Frontend Development",
};

export default function RootLayout({ children }) {
  return (
    <ThemeProvider>
      <html lang="en" suppressHydrationWarning>
        <head>
          {/* Theme stylesheets are managed by ThemeStylesheet component */}
          <ThemeStylesheet />
          <noscript>
            <link
              rel="stylesheet"
              href="/css/color-tokens-dark-mode.css"
              data-theme="dark"
            />
          </noscript>
          <script
            dangerouslySetInnerHTML={{
              __html: `
                (function() {
                  try {
                    const savedTheme = localStorage.getItem('theme') || 'dark';
                    // Only set the class on the HTML element for immediate visual feedback
                    // The actual stylesheet will be handled by the ThemeStylesheet component
                    if (savedTheme === 'light') {
                      document.documentElement.classList.add('light');
                      document.documentElement.classList.remove('dark');
                    } else {
                      document.documentElement.classList.add('dark');
                      document.documentElement.classList.remove('light');
                    }
                  } catch (e) {
                    console.error('Error setting initial theme', e);
                  }
                })();
              `,
            }}
          />
        </head>
        <body
          className={`${robotoFlex.variable} ${alanSans.variable} antialiased homepage`}
          suppressHydrationWarning
        >
          {children}
        </body>
      </html>
    </ThemeProvider>
  );
}
