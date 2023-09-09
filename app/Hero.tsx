import TitleLogo from "./components/TitleLogo";
import CreateRoomForm from "./components/CreateRoomForm";

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
          <CreateRoomForm />
        </div>
      </div>
    </div>
  );
};

export default Hero;
