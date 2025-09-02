import { useEffect, useState } from "react";

export default function History() {
  const [data, setData] = useState({ sim: [], plat: [], skck: [], keramaian: [] });
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  async function fetchData() {
    const res = await fetch("/api/history/all");
    const json = await res.json();
    setData(json);
  }

  useEffect(() => {
    fetchData();
  }, []);

  // reset data
  async function resetHistory() {
    const res = await fetch("/api/history/reset", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: filter }) // bisa "all" atau filter spesifik
    });
    const result = await res.json();
    alert(result.message);
    fetchData();
  }

  // filter data sesuai pencarian & kategori
  const filteredData = Object.entries(data).reduce((acc, [key, list]) => {
    if (filter !== "all" && key !== filter) return acc;
    acc[key] = list.filter(item => item.nama?.toLowerCase().includes(search.toLowerCase()));
    return acc;
  }, {});

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">📜 History Pengajuan</h1>

      {/* Search + Filter + Reset */}
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
        <button
          onClick={resetHistory}
          className="px-4 py-2 bg-red-500 text-white rounded"
        >
          🔄 Reset
        </button>
      </div>

      {/* Hasil */}
      {Object.entries(filteredData).map(([key, list]) => (
        <section key={key} className="mb-6">
          <h2 className="text-lg font-semibold mb-2">{key.toUpperCase()}</h2>
          <ul className="space-y-2">
            {list.map((item, idx) => (
              <li key={idx} className="p-3 border rounded bg-gray-50">
                <strong>{item.nama}</strong> - {Object.values(item).join(" - ")}
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}