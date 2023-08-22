import Logo from "@/app/components/Logo";

const Hero = () => {
  return (
    <div className="w-full py-16 bg-neutral">
      <div className="container mx-auto text-center width-100">
        <div className="flex items-center justify-center gap-8 p-4 ">
          <Logo />
          <h1 className="mb-4 text-6xl font-bold">Mob Unity</h1>
        </div>
        <p className="mb-8 text-lg">Empowering Developers to Collaborate!</p>
        <div className="container mx-auto mt-12 text-center">
          <input
            type="text"
            className="max-w-xs px-4 py-2 input"
            placeholder="Create or join a room..."
          />
          <button className="px-6 py-2 ml-4 font-semibold rounded-full btn btn-primary">
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
