import Link from "next/link";
import TitleLogo from "./components/TitleLogo";

const Hero = () => {
  return (
    <div className="w-full py-16 hero bg-base-100">
      <div className="text-center hero-content">
        <div className="max-w-md">
          <TitleLogo
            className="flex flex-wrap items-center justify-center gap-8 p-4 prose"
            titleClassName="whitespace-nowrap text-6xl font-bold"
            logoClassName="w-24 h-24"
          />
          <p className="mb-8 text-lg">Empowering Developers to Collaborate!</p>
          <div className="grid items-center justify-center grid-cols-1 gap-4 md:grid-cols-2">
            <input
              type="text"
              className="max-w-full px-4 py-2 input input-bordered md:col-span-1"
              placeholder="Create or join a room..."
            />
            <button className="px-6 py-2 ml-4 font-semibold rounded-full btn btn-primary md:col-span-1">
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
