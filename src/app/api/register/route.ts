export const runtime = "nodejs";

const FIELDS: [string, string][] = [
  ["fullName", "Nom et prénom"],
  ["birthDate", "Date de naissance"],
  ["phone", "Numéro de téléphone"],
  ["email", "E-mail"],
  ["group", "Groupe souhaité"],
  ["motivation", "Pourquoi rejoindre ce groupe"],
  ["goals", "Objectifs et nouveautés souhaitées"],
];

export async function POST(request: Request) {
  const accessKey = process.env.WEB3FORMS_KEY;
  if (!accessKey) {
    return Response.json({ error: "mail not configured" }, { status: 500 });
  }

  let data: Record<string, unknown>;
  try {
    data = await request.json();
  } catch {
    return Response.json({ error: "bad request" }, { status: 400 });
  }

  const get = (k: string) => String(data[k] ?? "").slice(0, 5000);
  if (FIELDS.some(([k]) => !get(k).trim())) {
    return Response.json({ error: "missing fields" }, { status: 400 });
  }

  const payload: Record<string, string> = {
    access_key: accessKey,
    subject: "Nouvelle candidature — Universal Physics Club",
    from_name: "Universal Physics Club",
    replyto: get("email"),
  };
  for (const [k, label] of FIELDS) payload[label] = get(k);

  try {
    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(payload),
    });
    const result = await res.json().catch(() => null);
    if (!res.ok || !result?.success) {
      console.error("register: web3forms failed", res.status, result);
      return Response.json({ error: "send failed" }, { status: 502 });
    }
    return Response.json({ ok: true });
  } catch (err) {
    console.error("register: web3forms unreachable", err);
    return Response.json({ error: "send failed" }, { status: 502 });
  }
}
