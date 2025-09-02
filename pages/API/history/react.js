import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "data", "history.json");

export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { type, kategori, idx } = req.body;
    if (!type || !kategori || idx === undefined) {
      return res.status(400).json({ error: "Data tidak lengkap" });
    }

    // baca file
    const file = fs.readFileSync(filePath, "utf8");
    const data = JSON.parse(file);

    // ubah status sesuai reaction
    if (!data[kategori] || !data[kategori][idx]) {
      return res.status(404).json({ error: "Data tidak ditemukan" });
    }

    data[kategori][idx].status = type === "approve" ? "✅ Disetujui Polisi" : "❌ Ditolak Polisi";

    // simpan kembali
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

    return res.status(200).json({ success: true, data: data[kategori][idx] });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Gagal update history" });
  }
}