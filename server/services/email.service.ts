import { Resend } from 'resend';

let resendClient: Resend | null = null;

export function getResendClient(): Resend {
  if (!resendClient) {
    const key = process.env.RESEND_API_KEY;
    if (!key) {
      console.warn('RESEND_API_KEY environment variable is not set. Emails will be mocked.');
    }
    resendClient = new Resend(key || 'mock_key');
  }
  return resendClient;
}

export const sendEmail = async ({ to, subject, html }: { to: string, subject: string, html: string }) => {
  const resend = getResendClient();
  
  if (!process.env.RESEND_API_KEY) {
    console.log(`[MOCK EMAIL] To: ${to} | Subject: ${subject}`);
    console.log(`[Content]: ${html}`);
    return { success: true, mocked: true };
  }

  try {
    const data = await resend.emails.send({
      from: 'EdTech Platform <onboarding@resend.dev>',
      to: [to],
      subject: subject,
      html: html,
    });
    return data;
  } catch (error) {
    console.error("Failed to send email", error);
    throw error;
  }
};
