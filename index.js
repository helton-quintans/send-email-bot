const puppeteer = require('puppeteer');
const url = 'https://sngpc.triersistemas.com.br/sngpc/Login.pod';
const cnpj = '05240070000564'
const user = 'Sngpc'
const password = '14114'
const urlForm = 'https://sngpc.triersistemas.com.br/sngpc/Cad_0005.pod?cacheId=1695720909118'



const populateForm = async () => {
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
    await page.goto(url)

    await page.waitForSelector('input#nom_chave'); 
    await page.type('input#nom_chave', cnpj);
    

    // Aguarde o campo de usuário usando o seletor XPath e insira o usuário
    await page.waitForSelector('input#nom_usuario');
    await page.type('input#nom_usuario', user);

    // Aguarde o campo de senha usando o seletor e insira a senha
    await page.waitForSelector('input#nom_senha');
    await page.type('input#nom_senha', password);

    await page.waitForSelector('input#salvar');
    await page.click('input#salvar');

 // Aguardar a página de destino (Menu)
    await page.waitForNavigation();

    // Navegar diretamente para o formulário desejado
    await page.goto(urlForm);

    // Aguardar até que a página do formulário seja carregada
    await page.waitForSelector('#seu-elemento-do-formulario');


    // await browser.close()
}

populateForm()