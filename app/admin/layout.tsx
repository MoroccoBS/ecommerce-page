import Nav from "@/components/DashBoard/NavBar/Nav";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full h-full flex items-center">
      <Nav />
      {children}
    </div>
  );
}
