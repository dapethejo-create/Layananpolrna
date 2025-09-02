import { useState } from "react";

export default function SimForm() {
  const [form, setForm] = useState({
    nama: "",
    noHp: "",
    pekerjaan: "",
    jenisSim: "",
    tanggal: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch("/api/history/sim", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    alert("Formulir SIM berhasil dikirim!");
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">🪪 Formulir Pembuatan SIM</h1>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input name="nama" placeholder="NAMA KTP" value={form.nama} onChange={handleChange} className="border p-2 w-full" required />
        <input name="noHp" placeholder="NO HP" value={form.noHp} onChange={handleChange} className="border p-2 w-full" />
        <input name="pekerjaan" placeholder="PEKERJAAN" value={form.pekerjaan} onChange={handleChange} className="border p-2 w-full" />
        <select name="jenisSim" value={form.jenisSim} onChange={handleChange} className="border p-2 w-full">
          <option value="">Pilih Jenis SIM</option>
          <option value="A">A</option>
          <option value="B">B</option>
          <option value="C">C</option>
        </select>
        <input type="date" name="tanggal" value={form.tanggal} onChange={handleChange} className="border p-2 w-full" />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Kirim</button>
      </form>
    </div>
  );
}