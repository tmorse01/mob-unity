import Image from "next/image";

export default function Home() {
  // TODO figure out why fast refresh doesn't update page with changes on save
  // className="flex min-h-screen flex-col items-center justify-between p-24"
  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col justify-center items-center">
      <div className="bg-orange-400 text-white py-16 w-full">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">Mob Unity</h1>
          <p className="text-lg mb-8">Empowering Developers to Collaborate!</p>
          <div className="container mx-auto mt-12 text-center">
            <input
              type="text"
              className="border border-gray-300 rounded-full py-2 px-4 w-64 placeholder-gray-400"
              placeholder="Create or join a room..."
            />
            <button className="text-orange-500 bg-white py-2 px-6 ml-4 rounded-full font-semibold hover:bg-blue-100">
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
    </div>
  );
}
