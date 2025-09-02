let database = {
  sim: [],
  plat: [],
  skck: [],
  keramaian: []
};

export default function handler(req, res) {
  if (req.method === "POST") {
    const { type } = req.body;

    if (type === "all") {
      database = { sim: [], plat: [], skck: [], keramaian: [] };
    } else if (database[type]) {
      database[type] = [];
    }

    return res.status(200).json({ message: `History ${type} berhasil direset` });
  }

  res.status(405).json({ message: "Method not allowed" });
}

// biar bisa dipakai juga di all.js
export function getDatabase() {
  return database;
}
export function setDatabase(newDb) {
  database = newDb;
}