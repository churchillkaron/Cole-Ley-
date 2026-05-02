import { renderToStream } from "@react-pdf/renderer";
import InvoicePDF from "@/lib/pdf/InvoicePDF";

export async function POST(req) {
  const invoice = await req.json();

  const stream = await renderToStream(<InvoicePDF invoice={invoice} />);

  return new Response(stream, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename=invoice-${invoice.invoice_number}.pdf`,
    },
  });
}