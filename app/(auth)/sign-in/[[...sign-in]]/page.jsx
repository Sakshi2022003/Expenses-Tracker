import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div
      className="flex min-h-screen items-center justify-center bg-cover bg-center">
      
      <div className="border-4 border-purple-500 p-6 rounded-lg shadow-xl bg-white bg-opacity-90">
        <SignIn />
      </div>
    </div>
  );
}
