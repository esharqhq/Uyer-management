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
  const from = process.env.MAIL_FROM ?? "website@uyermanagement.com";
  const to = process.env.MAIL_TO ?? "business@uyermanagement.com";

  // Diagnostics: confirm env propagation (never log the secret key itself).
  console.log("[mail] env:", {
    RESEND_API_KEY: !!key,
    MAIL_FROM: from,
    MAIL_TO: to,
  });

  if (!key) {
    console.log(
      `[mail:mock] ${opts.subject}` +
        (opts.attachments?.length ? ` (+${opts.attachments.length} Anhang)` : ""),
    );
    return { mocked: true };
  }
  const resend = new Resend(key);
  const { data, error } = await resend.emails.send({
    from,
    to,
    replyTo: opts.replyTo,
    subject: opts.subject,
    html: opts.html,
    attachments: opts.attachments,
  });
  console.log("[mail] resend response:", { data, error });
  if (error) {
    console.error(
      "[mail] Resend delivery error:",
      JSON.stringify(error, null, 2),
    );
    throw new Error(`Mail delivery failed: ${error.message}`);
  }
  return { mocked: false };
}
