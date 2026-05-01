import { resend } from "@/lib/resend";

type LowStockItem = {
  name: string;
  stock: number;
};

export default async function sendLowStockEmail(items: LowStockItem[]) {
  const data = await resend.emails.send({
    from: process.env.EMAIL_FROM!,
    to: [process.env.ADMIN_EMAIL!],
    subject: "⚠️ Low Stock Alert - Mini Store",
    html: `
      <div style="font-family: Arial, sans-serif; background:#f9fafb; padding:20px;">
        <div style="max-width:600px; margin:auto; background:white; border-radius:12px; overflow:hidden; border:1px solid #e5e7eb;">
          
          <!-- HEADER -->
          <div style="background:#b91c1c; color:white; padding:16px 20px; font-size:18px; font-weight:600;">
            Low Stock Alert ⚠️
          </div>

          <!-- BODY -->
          <div style="padding:20px;">
            <h2 style="margin:0 0 10px;">Attention Needed</h2>
            <p style="margin:0 0 20px; color:#6b7280;">
              The following products are running low on stock and need restocking:
            </p>

            <!-- TABLE -->
            <div style="margin-bottom:20px;">
              <table style="width:100%; border-collapse:collapse; font-size:14px;">
                <thead>
                  <tr style="text-align:left; border-bottom:1px solid #e5e7eb;">
                    <th style="padding:8px 0;">Product</th>
                    <th style="padding:8px 0; text-align:right;">Stock</th>
                    <th style="padding:8px 0; text-align:right;">Status</th>
                  </tr>
                </thead>

                <tbody>
                  ${items
                    .map((item) => {
                      const isCritical = item.stock <= 3;

                      return `
                        <tr style="border-bottom:1px solid #f3f4f6;">
                          <td style="padding:10px 0;">${item.name}</td>
                          <td style="text-align:right;">${item.stock}</td>
                          <td style="text-align:right;">
                            <span style="
                              padding:4px 8px;
                              border-radius:6px;
                              font-size:12px;
                              color:white;
                              background:${isCritical ? "#dc2626" : "#f59e0b"};
                            ">
                              ${isCritical ? "CRITICAL" : "LOW"}
                            </span>
                          </td>
                        </tr>
                      `;
                    })
                    .join("")}
                </tbody>
              </table>
            </div>

            <!-- CTA -->
            <div style="text-align:center; margin-top:20px;">
              <a href="https://your-domain.com/admin/products"
                 style="display:inline-block; padding:10px 16px; background:#111827; color:white; text-decoration:none; border-radius:8px; font-size:14px;">
                Go to Inventory
              </a>
            </div>
          </div>

          <!-- FOOTER -->
          <div style="padding:16px; text-align:center; font-size:12px; color:#9ca3af;">
            © ${new Date().getFullYear()} Mini Store Admin System
          </div>

        </div>
      </div>
    `,
  });

  return data;
}
