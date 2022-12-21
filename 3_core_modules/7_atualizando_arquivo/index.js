const http = require("http")
const fs = require("fs")

const port = 3000

const server = http.createServer((req, res) => {
    const urlInfo = require("url").parse(req.url, true)
    const name = urlInfo.query.name
    // query está pegando o parâmetro name na url == /?name="name"

    if (!name) {
        
        fs.readFile("index.html", function(err, data) {
            res.writeHead(200, { "Content-Type": "text/html" })
            res.write(data)
            return res.end()
        })
    } else {
        const nameNewLine = name + "\r\n"
        // salvando o name na constante concatenando \r e \n para que ele pule uma linha
        // após a adição de um novo nome no arquivo.txt (um serve para linux e outro para windows, 
        // entt os dois juntos servem para ambos)
        fs.appendFile("arquivo.txt", nameNewLine, function(err, data) {
            res.writeHead(302, {
                location: "/",
            })
            return res.end()
        })
    }
})

server.listen(port, () => {
    console.log(`Servidor rodando na porta: ${port}`)
})