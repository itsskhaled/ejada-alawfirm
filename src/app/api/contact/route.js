export async function POST(req) {
  try {
    const webhook = process.env.SHEETS_WEBHOOK;
    if (!webhook) {
      return Response.json({ ok: false, error: "Missing SHEETS_WEBHOOK" }, { status: 500 });
    }

    const payload = await req.json();

    const res = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      redirect: "follow",
    });

    const text = await res.text();
    let data;
    try { data = JSON.parse(text); } catch { data = { raw: text }; }

    if (!res.ok || data?.ok === false) {
      return Response.json({ ok: false, error: data?.error || "Sheets failed", details: data }, { status: 500 });
    }

    return Response.json({ ok: true });
  } catch (e) {
    return Response.json({ ok: false, error: String(e) }, { status: 500 });
  }
}
