import { useEffect, useState } from "react";

export default function History() {
  const [data, setData] = useState({ sim: [], plat: [], skck: [], keramaian: [] });
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [role, setRole] = useState("public"); // default public

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("/api/history/all");
      const json = await res.json();
      setData(json);

      // cek role user
      const userRes = await fetch("/api/auth/me");
      const user = await userRes.json();
      setRole(user.role || "public");
    }
    fetchData();
  }, []);

  // filter data sesuai pencarian & kategori
  const filteredData = Object.entries(data).reduce((acc, [key, list]) => {
    if (filter !== "all" && key !== filter) return acc;
    acc[key] = list.filter(item => item.nama?.toLowerCase().includes(search.toLowerCase()));
    return acc;
  }, {});

  async function handleReact(id, status) {
    await fetch("/api/history/react", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    // refresh data
    const res = await fetch("/api/history/all");
    setData(await res.json());
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">📜 History Pengajuan</h1>

      {/* Search + Filter */}
      <div className="flex gap-3 mb-6">
        <input
          type="text"
          placeholder="Cari nama..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 border rounded w-1/2"
        />
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="all">Semua</option>
          <option value="sim">SIM</option>
          <option value="plat">PLAT</option>
          <option value="skck">SKCK</option>
          <option value="keramaian">Keramaian</option>
        </select>
      </div>

      {/* Hasil */}
      {Object.entries(filteredData).map(([key, list]) => (
        <section key={key} className="mb-6">
          <h2 className="text-lg font-semibold mb-2">{key.toUpperCase()}</h2>
          <ul className="space-y-2">
            {list.map((item, idx) => (
              <li key={idx} className="p-3 border rounded bg-gray-50 flex justify-between items-center">
                <div>
                  <strong>{item.nama}</strong> - {Object.values(item).join(" - ")}  
                  {item.status && (
                    <span className={`ml-2 px-2 py-1 text-xs rounded ${item.status === "ACC" ? "bg-green-200" : "bg-red-200"}`}>
                      {item.status}
                    </span>
                  )}
                </div>

                {/* Tombol React khusus role polisi */}
                {role === "polisi" && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleReact(item.id, "ACC")}
                      className="px-3 py-1 bg-green-500 text-white rounded"
                    >
                      ✅ ACC
                    </button>
                    <button
                      onClick={() => handleReact(item.id, "Tolak")}
                      className="px-3 py-1 bg-red-500 text-white rounded"
                    >
                      ❌ Tolak
                    </button>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}