import Footer from "@/components/Footer";
import Logo from "@/components/Logo";

export default function Home() {
  return (
    <div
      className="min-h-screen flex flex-col justify-center items-center"
      data-theme="dark"
    >
      <div className="bg-base-300 py-16 w-full">
        <div className="container width-100 mx-auto text-center">
          <div className="flex items-center justify-center p-4 gap-8 ">
            <Logo />
            <h1 className="text-6xl font-bold mb-4">Mob Unity</h1>
          </div>
          <p className="text-lg mb-8">Empowering Developers to Collaborate!</p>
          <div className="container mx-auto mt-12 text-center">
            <input
              type="text"
              className="input max-w-xs py-2 px-4"
              placeholder="Create or join a room..."
            />
            <button className="btn btn-primary py-2 px-6 ml-4 rounded-full font-semibold">
              Get Started
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto mt-12 p-24">
        <div className="grid grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-semibold mb-4">
              Unleash Collective Brilliance
            </h2>
            <p className="text-gray-600">
              Mob Development is where coding becomes a symphony of minds, a
              journey where diverse developers converge to create brilliance.
              Together, we navigate through intricate code landscapes, debug
              with collective insights, and architect solutions that eclipse
              individual contributions.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-4">
              Accelerate Learning, Amplify Growth
            </h2>
            <p className="text-gray-600">
              Learning flourishes in collaboration. In our Mob Development
              haven, knowledge flows freely, leveling up both seasoned coders
              and newcomers. With shared wisdom and thriving skills, we pioneer
              the future of coding by seamlessly switching roles, celebrating
              milestones, and embracing the unparalleled journey of collective
              coding.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
