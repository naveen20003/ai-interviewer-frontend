import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";
import SocketProvider from "@/context/socketContext";
import { Toaster } from "@/components/ui/sonner";
import ThemeProvider from "@/components/theme-provider";
import Providers from "@/components/sessionProvider";
import { InterviewProvider } from "@/context/interviewContext";
import { AuthProvider } from "@/context/AuthContext";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "AI Interviewer",
  description: "Practice interviews with an AI interviewer.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
          <Providers>
            <ThemeProvider>
              <TooltipProvider>

                {/* <SocketProvider> */}

                  {/* <InterviewProvider> */}
                    {children}
                  {/* </InterviewProvider> */}

                  <Toaster position="top-center"/>

                {/* </SocketProvider> */}

              </TooltipProvider>
            </ThemeProvider>
          </Providers>
      </body>
    </html>
  );
}
