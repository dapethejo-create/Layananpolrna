// pages/api/auth/callback.js
export default async function handler(req, res) {
  const code = req.query.code;

  if (!code) {
    return res.status(400).json({ error: "No code provided" });
  }

  try {
    // 1. Tukar code jadi access_token
    const tokenResponse = await fetch("https://discord.com/api/oauth2/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: process.env.DISCORD_CLIENT_ID,
        client_secret: process.env.DISCORD_CLIENT_SECRET,
        grant_type: "authorization_code",
        code,
        redirect_uri: process.env.DISCORD_REDIRECT_URI,
      }),
    });

    const tokenData = await tokenResponse.json();
    if (tokenData.error) {
      return res.status(400).json({ error: tokenData.error });
    }

    // 2. Ambil data user dari Discord
    const userResponse = await fetch("https://discord.com/api/users/@me", {
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`,
      },
    });

    const user = await userResponse.json();

    // 3. Simpan data user ke session (sederhana: cookie)
    res.setHeader(
      "Set-Cookie",
      `user=${encodeURIComponent(JSON.stringify(user))}; Path=/; HttpOnly`
    );

    // 4. Redirect balik ke home
    res.redirect("/");
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
}