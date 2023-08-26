import Link from "next/link";
import TitleLogo from "./components/TitleLogo";

const Hero = () => {
  return (
    <div className="w-full py-16 bg-neutral">
      <div className="container mx-auto text-center width-100">
        <TitleLogo
          className="flex items-center justify-center gap-8 p-4"
          titleClassName="text-6xl font-bold"
          logoClassName="w-24 h-24"
        />
        <p className="mb-8 text-lg">Empowering Developers to Collaborate!</p>
        <div className="container mx-auto mt-12 text-center">
          <input
            type="text"
            className="max-w-xs px-4 py-2 input"
            placeholder="Create or join a room..."
          />
          <button className="px-6 py-2 ml-4 font-semibold rounded-full btn btn-primary">
            <Link href="/id">Get Started</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
