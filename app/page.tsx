import Footer from "@/app/components/Footer";
import Hero from "@/app/Hero";
import HomeContent from "@/app/HomeContent";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen base-300">
      <Hero />
      <HomeContent />
      <Footer />
    </div>
  );
}
