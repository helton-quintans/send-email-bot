const puppeteer = require('puppeteer');
const email = 'yanak.sushi@outlook.com';
const senha = 'Zeppelin006'

const sendEmail = async () => {
    // configurar navegador
    const browser = await puppeteer.launch({
        headless: false,
        slowMo: 100,
        defaultViewport: {
            width: 1366,
            height: 768,
        },
        args: ['--start-maximized']
            
    });
    // cria a página e acessa a url
    const page = await browser.newPage();
    await page.goto('https://outlook.live.com/owa/')

    //aguardar até o seletor (botão entrar) apareça na tela
    await page.waitForSelector('[data-task="signin"]');
    await page.click('[data-task="signin"]');

    //Digita o email quando o seletor estiver disponível
    await page.waitForSelector('input[type="email"]');
    await page.type('input[type="email"]', email);

    //Envia o email para efetuar o login
    await page.click('input[type="submit"]');

    //aguardando o seletor (input passwd) apareça na tela
    await page.waitForSelector('input[name="passwd"]');

    //Digitando a senha
    await page.type('input[name="passwd"]', senha);

    //Enviando a senha
    await page.click('input[type="submit"]');
}

sendEmail()