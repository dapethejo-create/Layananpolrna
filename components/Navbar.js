import { useEffect, useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      const res = await fetch("/api/auth/me");
      const data = await res.json();
      if (data && data.id) setUser(data);
    }
    fetchUser();
  }, []);

  return (
    <nav className="flex justify-between items-center p-4 bg-blue-600 text-white">
      <h1 className="text-xl font-bold">
        <Link href="/">Polisi Arivena</Link>
      </h1>
      <div>
        {user ? (
          <div className="flex items-center gap-3">
            <img
              src={`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`}
              alt="avatar"
              className="w-8 h-8 rounded-full"
            />
            <span>{user.username}</span>
            <a
              href="/api/auth/logout"
              className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
            >
              Logout
            </a>
          </div>
        ) : (
          <a
            href="/api/auth/login"
            className="bg-green-500 px-3 py-1 rounded hover:bg-green-600"
          >
            Login with Discord
          </a>
        )}
      </div>
    </nav>
  );
}