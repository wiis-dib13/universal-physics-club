import nodemailer from "nodemailer";

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
  const { SMTP_USER, SMTP_PASS, MAIL_TO } = process.env;
  if (!SMTP_USER || !SMTP_PASS) {
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

  const text = FIELDS.map(([k, label]) => `${label} :\n${get(k)}`).join("\n\n");

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    });
    await transporter.sendMail({
      from: `Universal Physics Club <${SMTP_USER}>`,
      to: MAIL_TO || SMTP_USER,
      replyTo: get("email"),
      subject: "Nouvelle candidature — Universal Physics Club",
      text,
    });
    return Response.json({ ok: true });
  } catch {
    return Response.json({ error: "send failed" }, { status: 502 });
  }
}
