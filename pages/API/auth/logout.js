export default async function handler(req, res) {
  res.setHeader("Set-Cookie", "user=; Max-Age=0; Path=/;");
  res.redirect("/");
}