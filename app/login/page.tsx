import Background from "@/components/SingIn/Background";
import Form from "@/components/SingIn/Form";

export default async function Home() {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <Background />
      <Form />
    </div>
  );
}
