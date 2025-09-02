let platHistory = [];

export default function handler(req, res) {
  if (req.method === "POST") {
    const { nama, nomorPolisi, jenisKendaraan } = req.body;
    platHistory.push({ nama, nomorPolisi, jenisKendaraan, createdAt: new Date() });
    return res.status(200).json({ success: true });
  } else if (req.method === "GET") {
    return res.status(200).json(platHistory);
  }
}