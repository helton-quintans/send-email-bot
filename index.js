const puppeteer = require('puppeteer');
const email = 'yanak.sushi@outlook.com';
const senha = 'Zeppelin006'

const message = {
    recipient: 'yanak.sushi@outlook.com',
    subject: 'Email automático',
    body: 'Teste - Isso é uma mensagem que eu não precisei digitar'
}

const sendEmail = async () => {
    // configurar navegador
    const browser = await puppeteer.launch({
        headless: false,
        slowMo: 10,
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

    //"Continuar conectado" Marcando checkbox "Não mostrar isso novamente"
    await page.waitForSelector('input[id="KmsiCheckboxField');
    await page.click('input[id="KmsiCheckboxField"]');

    // Clicando no botão "Sim"
    await page.waitForSelector('input[id="KmsiCheckboxField"]');
    await page.click('input[type="submit"]');

    // Clicando em nova mensagem
    await page.waitForSelector('#id__6');
    await page.click('#id__6');
    //Destinatário
    await page.waitForSelector('.ms-BasePicker-input');
    await page.type('.ms-BasePicker-input', message.recipient);

    //Assunto
    await page.waitForSelector('[aria-label="Adicionar um assunto"]');
    await page.type('[aria-label="Adicionar um assunto"]', message.subject);

    // Corpo do email
    await page.keyboard.press('Tab');
    await page.keyboard.type(message.body);

    // Aguardando o botão de enviar email
    await page.waitForSelector('[aria-label="Enviar"]')
    await page.click('[aria-label="Enviar"]')

    await browser.close()


}

sendEmail()