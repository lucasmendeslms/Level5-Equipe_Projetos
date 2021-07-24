//Importar dependência
const express = require('express');
const path = require('path');
const pages = require('./pages.js');

//Iniciando o express
const server = express()

server

//Utilizar Body do req
.use(express.urlencoded({ extended: true }))

//Criar rotas para os arquivos estáticos
.use(express.static('public'))

//Configurar template engine
.set('views', path.join(__dirname, "views"))
.set('view engine', 'hbs')

//Criar rotas da aplicação (caminhos)
server.get('/', pages.index)
server.get('/orphanage', pages.orphanage)
server.get('/orphanages', pages.orphanages)
server.get('/create-orphanage', pages.createOrphanage)
server.post('/save-orphanage', pages.saveOrphanage)


//Ligar o servidor
server.listen(5500)
