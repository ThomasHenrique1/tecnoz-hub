export default async function handler(req, res) {
  try {
    const response = await fetch(`${process.env.SUPABASE_URL}/rest/v1/?select=1`, {
      headers: {
        apikey: process.env.SUPABASE_ANON_KEY,
        Authorization: `Bearer ${process.env.SUPABASE_ANON_KEY}`,
      },
    });

    if (response.ok) {
      return res.status(200).json({
        ok: true,
        time: new Date().toISOString(),
        message: "Ping Supabase realizado com sucesso."
      });
    }

    const errorText = await response.text();
    return res.status(500).json({
      ok: false,
      error: errorText
    });
  } catch (e) {
    return res.status(500).json({
      ok: false,
      error: e.message
    });
  }
}
