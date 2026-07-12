import { Resend } from "resend";

type Attachment = { filename: string; content: Buffer; contentType?: string };

export async function sendMail(opts: {
  subject: string;
  html: string;
  attachments?: Attachment[];
  /** Reply-To header — e.g. the applicant's address, so replies go to them. */
  replyTo?: string;
}): Promise<{ mocked: boolean }> {
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.log(
      `[mail:mock] ${opts.subject}` +
        (opts.attachments?.length ? ` (+${opts.attachments.length} Anhang)` : ""),
    );
    return { mocked: true };
  }
  const resend = new Resend(key);
  const { error } = await resend.emails.send({
    from: process.env.MAIL_FROM ?? "website@uyermanagement.com",
    to: process.env.MAIL_TO ?? "business@uyermanagement.com",
    replyTo: opts.replyTo,
    subject: opts.subject,
    html: opts.html,
    attachments: opts.attachments,
  });
  if (error) throw new Error(`Mail delivery failed: ${error.message}`);
  return { mocked: false };
}
