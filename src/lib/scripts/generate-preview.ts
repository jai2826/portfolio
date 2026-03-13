import puppeteer from "puppeteer";
import fs from "fs";

async function generatePreview() {
  const url = "https://portfolio-rho-virid-21.vercel.app/";

  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.setViewport({
    width: 1280,
    height: 800,
  });

  await page.goto(url, { waitUntil: "networkidle2" });

  const framesDir = "./frames";

  if (!fs.existsSync(framesDir)) {
    fs.mkdirSync(framesDir);
  }

  for (let i = 0; i < 20; i++) {
    await page.evaluate((y) => window.scrollTo(0, y), i * 200);

    await page.screenshot({
      path: `${framesDir}/frame-${i}.png`,
    });
  }

  await browser.close();
}

generatePreview();