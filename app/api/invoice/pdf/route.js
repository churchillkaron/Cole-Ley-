import { NextResponse } from "next/server";
import puppeteer from "puppeteer";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  // 👉 Replace this later with real DB data
  const html = `
    <html>
      <body style="font-family: Arial; padding: 40px;">
        <h1>Invoice ${id}</h1>
        <p>This is your generated invoice.</p>
      </body>
    </html>
  `;

  const browser = await puppeteer.launch({
    args: ["--no-sandbox"],
  });

  const page = await browser.newPage();

  // 🔥 important for size + mobile
  await page.setViewport({
    width: 800,
    height: 1200,
    deviceScaleFactor: 1,
  });

  await page.setContent(html, {
    waitUntil: "networkidle0",
  });

  const pdfBuffer = await page.pdf({
    format: "A4",
    printBackground: true,
    scale: 0.75, // 🔥 reduces file size
  });

  await browser.close();

  return new NextResponse(pdfBuffer, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename=invoice-${id}.pdf`,
    },
  });
}