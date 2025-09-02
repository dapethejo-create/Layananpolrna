import { useState } from "react";

export default function SkckForm() {
  const [form, setForm] = useState({
    nama: "",
    noHp: "",
    tglLahir: "",
    pekerjaan: "",
    keperluan: "",
    tanggal: "",
    surat: "",
    masa: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch("/api/history/skck", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    alert("Formulir SKCK berhasil dikirim!");
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">📄 Formulir Pembuatan SKCK</h1>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input name="nama" placeholder="NAMA KTP" value={form.nama} onChange={handleChange} className="border p-2 w-full" required />
        <input name="noHp" placeholder="NO HP" value={form.noHp} onChange={handleChange} className="border p-2 w-full" />
        <input type="date" name="tglLahir" value={form.tglLahir} onChange={handleChange} className="border p-2 w-full" />
        <input name="pekerjaan" placeholder="PEKERJAAN" value={form.pekerjaan} onChange={handleChange} className="border p-2 w-full" />
        <input name="keperluan" placeholder="KEPERLUAN" value={form.keperluan} onChange={handleChange} className="border p-2 w-full" />
        <input type="date" name="tanggal" value={form.tanggal} onChange={handleChange} className="border p-2 w-full" />
        <input name="surat" placeholder="SURAT SEHAT & KTP" value={form.surat} onChange={handleChange} className="border p-2 w-full" />
        <input name="masa" placeholder="MASA BERLAKU" value={form.masa} onChange={handleChange} className="border p-2 w-full" />
        <button type="submit" className="bg-red-600 text-white px-4 py-2 rounded">Kirim</button>
      </form>
    </div>
  );
}