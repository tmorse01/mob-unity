import Header from "../components/Header";

export default function RoomLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="bg-base-100">
      <Header />
      {/* <nav></nav> */}
      {children}
    </section>
  );
}
