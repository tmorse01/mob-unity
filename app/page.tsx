import Footer from "@/app/components/Footer";
import Hero from "@/app/Hero";
import HomeContent from "@/app/HomeContent";
import ThemeSwitcher from "./components/ThemeSelect";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-base-100">
      <ThemeSwitcher className="absolute top-2 right-2" />
      <Hero />
      <HomeContent />
      <Footer />
    </div>
  );
}
