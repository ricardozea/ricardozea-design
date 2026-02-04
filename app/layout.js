import './globals.css'; // Import Tailwind CSS
import { Roboto_Flex } from "next/font/google";
import { Alan_Sans } from "next/font/google";
import { ThemeProvider, ThemeStylesheet, ThemeToggle } from "../components/ThemeSwitcher";
import { SpeedInsights } from "@vercel/speed-insights/next";

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
  metadataBase: new URL('https://ricardozea.design'),
  title: {
    default: 'Ricardo Zea - Sr. Web & Product Designer',
    template: '%s | Ricardo Zea',
  },
  description:
    'Portfolio of Ricardo Zea, Sr. Web & Product Designer. 20+ years of experience in the industry. He will NOT design your PowerPoint template 😂.',
  keywords: [
    'Ricardo Zea',
    'Product Designer',
    'Web Designer',
    'UX Designer',
    'UI Designer',
    'Frontend Developer',
    'Design Systems',
    'Portfolio',
  ],
  authors: [{ name: 'Ricardo Zea' }],
  creator: 'Ricardo Zea',
  publisher: 'Ricardo Zea',
  applicationName: 'Ricardo Zea',
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  openGraph: {
    type: 'website',
    url: '/',
    siteName: 'Ricardo Zea',
    title: 'Ricardo Zea - Sr. Web & Product Designer',
    description:
      'Portfolio of Ricardo Zea, Sr. Web & Product Designer. 20+ years of experience in the industry. He will NOT design your PowerPoint template 😂.',
    images: [
      {
        url: '/og.png',
        width: 1200,
        height: 630,
        alt: 'Ricardo Zea - Sr. Web & Product Designer',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ricardo Zea - Sr. Web & Product Designer',
    description:
      'Portfolio of Ricardo Zea, Sr. Web & Product Designer. 20+ years of experience in the industry. He will NOT design your PowerPoint template 😂.',
    images: ['/og.png'],
  },
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
  ],
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <ThemeProvider>
      <html lang="en" suppressHydrationWarning>
        <head>
          {/* Theme stylesheets are managed by ThemeStylesheet component */}
          <ThemeStylesheet />
          <link rel="icon" href="/favicon.ico?v=2" sizes="any" />
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
          <SpeedInsights />
        </body>
      </html>
    </ThemeProvider>
  );
}
