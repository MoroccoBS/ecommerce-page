import Images from "@/components/MainPage/Images";
import Product from "@/components/MainPage/Product";

export default function Home() {
  return (
    <main className="w-full md:h-full h-max max-w-[1200px] flex items-center justify-center px-0 flex-col md:flex-row lg:px-24 sm:px-12 gap-6 md:gap-0 pb-10">
      <Images className="w-full md:h-3/4 h-full sm:max-w-[450px] sm:max-h-[600px]" />
      <Product className="sm:px-24 px-12" />
    </main>
  );
}
