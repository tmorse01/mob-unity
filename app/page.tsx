import Image from "next/image";

export default function Home() {
  // TODO figure out why fast refresh doesn't update page with changes on save
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <header className="relative w-full p-10 mb-24 bg-zinc-100">
        <h1 className="mb-2 text-5xl font-semibold text-gray-700 leading-10">
          Mob Unity
        </h1>
        <h2 className="mb-6 text-3xl font-normal text-gray-600">
          A collaborative tool to facilitate mob development within your team
        </h2>
      </header>
    </main>
  );
}
