let simHistory = [];

export default function handler(req, res) {
  if (req.method === "POST") {
    const { nama, nik, alamat } = req.body;
    simHistory.push({ nama, nik, alamat, createdAt: new Date() });
    return res.status(200).json({ success: true });
  } else if (req.method === "GET") {
    return res.status(200).json(simHistory);
  }
}