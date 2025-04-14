import puppeteer from "puppeteer";

export async function generatePdf(content: string, filename: string): Promise<Buffer> {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Set the page content as the provided HTML content
  await page.setContent(content);

  // Optional: Set PDF options (like page size, margins, etc.)
  const pdfUint8Array = await page.pdf({
    format: 'A4',
    printBackground: true,
    margin: { top: '20mm', right: '20mm', bottom: '20mm', left: '20mm' },
  });

  await browser.close();

  // Convert the Uint8Array to a Buffer
  return Buffer.from(pdfUint8Array);
}
