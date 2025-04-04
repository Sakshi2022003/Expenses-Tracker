import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="border-4 border-purple-500 p-4 rounded-lg shadow-lg bg-white">
        <SignUp />
      </div>
    </div>
  );
}
