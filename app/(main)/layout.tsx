import Navbar from "@/components/Navbar/Navbar";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full h-full flex flex-col items-center">
      <Navbar />
      {children}
    </div>
  );
}
