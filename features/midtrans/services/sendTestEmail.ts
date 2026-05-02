import { resend } from "@/lib/resend";

export default async function sendTestEmail(customerEmail: string) {
  const targetEmail =
    process.env.NODE_ENV === "development"
      ? "fakhrimuzakki06@gmail.com"
      : customerEmail;

  const data = await resend.emails.send({
    from: process.env.EMAIL_FROM!,
    to: [targetEmail],
    subject: "Order Confirmation - Mini Store",
    html: `
      <div style="font-family: Arial, sans-serif; background:#f9fafb; padding:20px;">
        <div style="max-width:600px; margin:auto; background:white; border-radius:12px; overflow:hidden; border:1px solid #e5e7eb;">
          
          <!-- HEADER -->
          <div style="background:#111827; color:white; padding:16px 20px; font-size:18px; font-weight:600;">
            Mini Store
          </div>

          <!-- BODY -->
          <div style="padding:20px;">
            <h2 style="margin:0 0 10px;">Payment Successful 🎉</h2>
            <p style="margin:0 0 20px; color:#6b7280;">
              Thank you for your purchase. Your order has been confirmed.
            </p>

            <!-- ORDER INFO -->
            <div style="margin-bottom:20px;">
              <p style="margin:4px 0;"><strong>Order ID:</strong> ORDER-123456</p>
              <p style="margin:4px 0;"><strong>Date:</strong> ${new Date().toLocaleString()}</p>
            </div>

            <!-- ITEMS -->
            <div style="margin-bottom:20px;">
              <h3 style="margin-bottom:10px;">Order Summary</h3>

              <table style="width:100%; border-collapse:collapse;">
                <tr>
                  <td style="padding:8px 0;">Product A</td>
                  <td style="text-align:right;">$10 × 1</td>
                </tr>
                <tr>
                  <td style="padding:8px 0;">Product B</td>
                  <td style="text-align:right;">$20 × 2</td>
                </tr>
              </table>
            </div>

            <!-- TOTAL -->
            <div style="border-top:1px solid #e5e7eb; padding-top:12px; margin-bottom:20px;">
              <p style="margin:0; font-weight:600; font-size:16px;">
                Total: $50
              </p>
            </div>

            <!-- CTA -->
            <div style="text-align:center;">
              <a href="https://your-domain.com/orders"
                 style="display:inline-block; padding:10px 16px; background:#111827; color:white; text-decoration:none; border-radius:8px; font-size:14px;">
                View Order
              </a>
            </div>
          </div>

          <!-- FOOTER -->
          <div style="padding:16px; text-align:center; font-size:12px; color:#9ca3af;">
            © ${new Date().getFullYear()} Mini Store. All rights reserved.
          </div>

        </div>
      </div>
    `,
  });

  return data;
}
