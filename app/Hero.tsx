import Link from "next/link";
import TitleLogo from "./components/TitleLogo";

const Hero = () => {
  return (
    <div className="hero w-full py-16 bg-base-100">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <TitleLogo
            className="prose flex items-center justify-center gap-8 p-4"
            titleClassName="whitespace-nowrap text-6xl font-bold"
            logoClassName="w-24 h-24"
          />
          <p className="mb-8 text-lg">Empowering Developers to Collaborate!</p>
          <div className="container mx-auto mt-12 text-center">
            <input
              type="text"
              className="input input-bordered max-w-xs px-4 py-2"
              placeholder="Create or join a room..."
            />
            <button className="px-6 py-2 ml-4 font-semibold rounded-full btn btn-primary">
              <Link className="no-underline" href="/id">
                Get Started
              </Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
