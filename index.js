import puppeteer from "puppeteer";
import readlineSync from "readline-sync";

async function scrappy(hiddenBrowser) {
    const browser = await puppeteer.launch({ headless: hiddenBrowser });
    const page = await browser.newPage();
    const baseCoin = readlineSync.question("Informe a moeda base: ") || "dolar";
    const finalCoin = readlineSync.question("Informe a moeda final: ") || "real";

    console.log("Buscando ...\n");
    await page.goto(`https://www.google.com/search?q=${baseCoin}+para+${finalCoin}&oq=dolar+para+real&aqs=chrome..69i57j0i131i433i512j0i512l8.2001j1j7&sourceid=chrome&ie=UTF-8/`);
    // await page.screenshot({path: "example.png"});

    const result = await page.evaluate(()=> document.querySelector(".lWzCpb.a61j6").value);
    console.log(`O valor de 1 ${baseCoin} em ${finalCoin} atualmente é ${result}`);

    await browser.close();
};

const hiddenBrowser = true;
scrappy(hiddenBrowser);
