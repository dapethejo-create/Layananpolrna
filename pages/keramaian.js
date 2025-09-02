import { useState } from "react";

export default function KeramaianForm() {
  const [form, setForm] = useState({
    penanggung: "",
    noHp: "",
    pekerjaan: "",
    kegiatan: "",
    tanggal: "",
    waktu: "",
    lokasi: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch("/api/history/keramaian", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    alert("Formulir Keramaian berhasil dikirim!");
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">🎉 Formulir Surat Izin Keramaian</h1>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input name="penanggung" placeholder="NAMA PENANGGUNG JAWAB" value={form.penanggung} onChange={handleChange} className="border p-2 w-full" required />
        <input name="noHp" placeholder="NO HP" value={form.noHp} onChange={handleChange} className="border p-2 w-full" />
        <input name="pekerjaan" placeholder="PEKERJAAN" value={form.pekerjaan} onChange={handleChange} className="border p-2 w-full" />
        <input name="kegiatan" placeholder="NAMA KEGIATAN" value={form.kegiatan} onChange={handleChange} className="border p-2 w-full" />
        <input type="date" name="tanggal" value={form.tanggal} onChange={handleChange} className="border p-2 w-full" />
        <input name="waktu" placeholder="WAKTU KEGIATAN (contoh: 20:00-22:00)" value={form.waktu} onChange={handleChange} className="border p-2 w-full" />
        <input name="lokasi" placeholder="LOKASI KEGIATAN" value={form.lokasi} onChange={handleChange} className="border p-2 w-full" />
        <button type="submit" className="bg-purple-600 text-white px-4 py-2 rounded">Kirim</button>
      </form>
    </div>
  );
}