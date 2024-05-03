import { Browser } from "puppeteer-core";
import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import express from 'express';
puppeteer.use(StealthPlugin())

const url = 'https://randomwordgenerator.com/';
const selector = 'li.support';
const app = express();
const port = process.env.PORT || 3000;

async function fetchRandomWord(): Promise<string | null> {
    const browser: Browser = await puppeteer.launch({
        executablePath: process.env.CHROME_BIN,
        args: ['--no-sandbox'],
        headless: true
    });
    const page = await browser.newPage()
    await page.goto(url)
    await page.waitForSelector(selector)
    const word = await page.$eval(selector, e => e.textContent);
    await browser.close();
    return word;
}

app.get('/random-word', async (_, res) => {
    try {
        const randomWord = await fetchRandomWord();
        res.json({ success: true, word: randomWord });
    } catch (error: any) {
        res.status(500).json({ success: false, message: 'Failed to fetch random word', error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});




