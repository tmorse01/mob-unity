import Header from "../components/Header";

export default function RoomLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <Header />
      {/* <nav></nav> */}

      {children}
    </section>
  );
}
