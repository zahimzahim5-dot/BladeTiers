import "./globals.css";
import FluidBackground from "@/components/FluidBackground";
import LoadingScreen from "@/components/LoadingScreen";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "Blade Tiers",
  description: "The premium Minecraft PvP tier list.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <FluidBackground />
        <LoadingScreen />
        <Navbar />
        {children}
      </body>
    </html>
  );
}