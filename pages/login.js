import { signIn, signOut, useSession } from "next-auth/react";

export default function LoginPage() {
  const { data: session } = useSession();

  if (session) {
    return (
      <div className="p-6">
        <h1 className="text-xl font-bold">Halo, {session.user.username} 👋</h1>
        <button onClick={() => signOut()} className="p-2 bg-red-500 text-white rounded">Logout</button>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Login dengan Discord</h1>
      <button onClick={() => signIn("discord")} className="p-2 bg-blue-600 text-white rounded">Login Discord</button>
    </div>
  );
}