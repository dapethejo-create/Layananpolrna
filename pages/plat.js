import { useState } from "react";

export default function PlatForm() {
  const [form, setForm] = useState({
    nama: "",
    noHp: "",
    tipe: "",
    kelas: "",
    dealer: "",
    sim: "",
    tanggal: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch("/api/history/plat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    alert("Formulir PLAT berhasil dikirim!");
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">🚘 Formulir Pembuatan PLAT</h1>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input name="nama" placeholder="NAMA KTP" value={form.nama} onChange={handleChange} className="border p-2 w-full" required />
        <input name="noHp" placeholder="NO HP" value={form.noHp} onChange={handleChange} className="border p-2 w-full" />
        <input name="tipe" placeholder="TIPE KENDARAAN" value={form.tipe} onChange={handleChange} className="border p-2 w-full" />
        <input name="kelas" placeholder="CLASS KENDARAAN" value={form.kelas} onChange={handleChange} className="border p-2 w-full" />
        <input name="dealer" placeholder="DEALER" value={form.dealer} onChange={handleChange} className="border p-2 w-full" />
        <input name="sim" placeholder="SIM" value={form.sim} onChange={handleChange} className="border p-2 w-full" />
        <input type="date" name="tanggal" value={form.tanggal} onChange={handleChange} className="border p-2 w-full" />
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Kirim</button>
      </form>
    </div>
  );
}