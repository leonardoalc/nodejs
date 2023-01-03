// core module
const fs = require("fs")

// modulo externo
const chalk = require("chalk")
const inquirer = require("inquirer")

// variavel de login
let loggedAccount = null

iniciar()

function iniciar() {
    if (loggedAccount === null) {
        console.log(chalk.bold("Você não está logado."))
    } else {
        console.log(chalk.bold(`Logado na conta: ${loggedAccount}`))
    }
    inquirer.prompt([
        {
            type: "list",
            name: "action",
            message: "O que você deseja fazer?",
            choices: [
                "Criar conta",
                "Logar",
                "Consultar saldo",
                "Depositar",
                "Sacar",
                "Sair"
            ]
        }
    ]).then(awnser => {
        const action = awnser["action"]

        if (action === "Criar conta") {
            createAccount()
        } else if (action === "Logar") {
            login()
        } else if (action === "Consultar saldo") {
            consult()
        } else if (action === "Depositar") {
            accountAmount(true)
        } else if (action === "Sacar") {
            accountAmount(false)
        } else if (action === "Sair") {
            console.log(chalk.bgBlue.black("Obrigado por usar o Accounts!"))
            process.exit()
        }
    }).catch(err => console.log(err))
}
function getAccountData() {
    const accountJson = fs.readFileSync(`accounts/${loggedAccount}.json`, {
        encoding: "utf-8",
        flag: "r"
    })
    return JSON.parse(accountJson)
}
function createAccount() {
    inquirer.prompt([
        {
            name: "conta",
            message: "Qual será o nome da conta?"
        }
    ]).then(awnser => {
        const accountName = awnser["conta"]
        console.log(accountName)
        // checando se a pasta que guarda as constas existe
        if (fs.existsSync("accounts") === false) {
            fs.mkdirSync("accounts")
        }


        //checando se o nome já existe
        if (fs.existsSync(`accounts/${accountName}.json`) || accountName === "") {
            console.log(chalk.red("ERRO!"), "Nome inválido ou já existente.")
        } else {
            // criando conta
            fs.writeFileSync(
                `accounts/${accountName}.json`,
                '{"balance":0}',
                function (err) {
                    console.log(err)
                }
            )
            console.log(chalk.green('Parabéns, sua conta foi criada!'))
        }
        setTimeout(() => {
            console.clear()
            iniciar()
        }, 3000);
    })
}
function login() {
    inquirer.prompt([
        {
            name: "account",
            message: "Nome da conta a ser logada: "
        }
    ]).then(awnser => {
        const accountName = awnser["account"]

        if (fs.existsSync(`accounts/${accountName}.json`) === false) {
            console.log(chalk.bgRed.black("Esta conta não existe!"))
            setTimeout(() => {
                loggedAccount = null
                console.clear()
                iniciar()
            }, 3000);
            return
        }

        loggedAccount = accountName
        console.log(chalk.bgBlue.black(`Você logou na conta: ${loggedAccount}`))
        setTimeout(() => {
            console.clear()
            iniciar()
        }, 3000);
    }).catch(err => console.log(err))
}
function consult() {
    // verificando se está logado
    if (loggedAccount === null) {
        console.log(chalk.bgRed.black("Você precisa estar logado!"))
        setTimeout(() => {
            console.clear() 
            iniciar()
            
        }, 3000);
        return
    }

    const accountData = getAccountData(loggedAccount)
    console.log(chalk.bold(`Conta: ${loggedAccount}`))
    if (accountData.balance === 0) {
        console.log(chalk.bold("Saldo disponível: "), chalk.bold(accountData.balance))
    } else {
        console.log(chalk.bold("Saldo disponível: R$"), chalk.bold.green(accountData.balance))
    }
    setTimeout(() => {
        console.clear()
        iniciar()
    }, 3000);
}
function accountAmount(add) {
    // verificando se está logado
    if (loggedAccount === null) {
        console.log(chalk.bgRed.black("Você precisa estar logado!"))
        setTimeout(() => {
            console.clear() 
            iniciar()
            
        }, 3000);
        return
    }
    inquirer.prompt([
        {
            name: "amount",
            message: "Valor: "
        }
    ]).then(awnser => {
        const amount = awnser["amount"]
        if (add) {
            addAmount(amount)
        } else {
            withDraw(amount)
        }
    })
}
function addAmount(amount) {
    if (amount <= 0 || amount === NaN || typeof(amount) === String){
        // verificando valor
        console.log(chalk.red("ERRO!"), "Valor inválido!")
        setTimeout(() => {
            console.clear()
            return accountAmount(true) 
        }, 3000);
    } else if (fs.existsSync(`accounts/${loggedAccount}.json`) === false) {
        // verificando se a conta existe
        console.log(chalk.bgRed.black("Esta conta não existe!"))
        setTimeout(() => {
            console.clear()
            return accountAmount(true) 
        }, 3000)
    }    
    const accountData = getAccountData()

    // adicionando o dinheiro na conta 

    accountData.balance = Number(accountData.balance) + Number(amount)
    fs.writeFileSync(
        `accounts/${loggedAccount}.json`,
        JSON.stringify(accountData), 
        function (err) {
            console.log(err)
        }
    )
    console.log(chalk.bgCyan.black(`Depositando: R$${amount}`))
    setTimeout(() => {
        console.clear()
        iniciar()
    }, 3000);
}

function withDraw(amount) {
    // verificando se está logado
    if (loggedAccount === null) {
        console.log(chalk.bgRed.black("Você precisa estar logado!"))
        setTimeout(() => {
            console.clear() 
            iniciar()
            
        }, 3000);
        return
    }
    const accountData = getAccountData(loggedAccount)
    if (amount > accountData.balance) {
        // verificando se o valor é válido
        console.log(chalk.bgRed.black.bold("Saldo insuficiente!"))
        setTimeout(() => {
            console.clear()
            iniciar()
        }, 3000);
        return
    }
    // removendo o dinheiro da conta 
    accountData.balance = Number(accountData.balance) - Number(amount)
    fs.writeFileSync(
        `accounts/${loggedAccount}.json`,
        JSON.stringify(accountData), 
        function (err) {
            console.log(err)
        }
    )
    console.log(chalk.bgCyan.black(`Sacando: R$${amount}`))
    setTimeout(() => {
        console.clear()
        iniciar()
    }, 3000);
}