export default async function handler(req, res) {
  const user = req.cookies.user ? JSON.parse(req.cookies.user) : null;
  res.status(200).json(user || {});
}