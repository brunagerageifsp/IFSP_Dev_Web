const express = require("express");
const model = require("./models");
const cors = require("cors");
const app = express();
const swaggerUi = require('swagger-ui-express');
const bodyParser = require("body-parser");
const jwt = require('jsonwebtoken');
require('dotenv-safe').config();
const { Op } = require("sequelize");

const Funcionario = model.funcionarioModel;
const Produto = model.produtoModel;
const Venda = model.vendaModel;
const Login = model.loginModel;

swaggerDocument = require('./swagger.json');

app.use(express.json());

app.use(cors())
app.use(
    '/api-docs',
    swaggerUi.serve, 
    swaggerUi.setup(swaggerDocument)
  );

app.use(bodyParser.json());

// --------------------   APIS LOGIN   ---------------------------

//aqui colocar a api de login do front trazendo os dados do front para criar o jwt
const user = {
    user: "admin",
    password: "123"
}

//Com banco de dados
//Endpoint de cadastro de venda
app.post("/login", (request, response) => {
    const user = request.body;
    console.log(user);
    if(user.user === user.user){
        console.log("Entrou")
        response.json(
            {
                token: jwtLogin.gerarToken(user),
                user: user
            })
    }else{
        response.send('Senha inválida!');
    }
});

const jwtLogin = {
    verificaToken: (token) => {
        //validando o token
        return jwt.verify(token, process.env.SEGREDO_JWT);
        // try{
        //     const tokenValido = jwt.verify(token, process.env.SEGREDO_JWT);
        //     console.log(tokenValido);
        // }catch (error){
        //     console.log("O token é invalido");
        // }
    },
    //gerando token JWT
    gerarToken: (usuario) => {
        return jwt.sign(user, process.env.SEGREDO_JWT,
        {
            expiresIn: 300
        })
    }
}

const validaTokenMiddleware = (request, response, next) => {
    const token = request.get("Authorization");
    try{
        const payload = jwtLogin.verificaToken();
        request.payload = payload;
        next();
    }catch (error){
        response.status(401);
        response.send("Não foi possivel acessar!");
    }
    // console.log(request.get("Authorization"));
    // jwtLogin.verificaToken();
    // if (request.get("Authorization") == "Autorizado"){
    //     next();
    // }else{
    //     response.status(500);
    //     response.send("Nâo autorizado");
    // }
}

app.get("/verificaToken/:id", (request, response)=>{
    console.log("API Verifica Token");
    console.log(request.query.id)
    const dataFromToken = jwt.decode(request.query.id.replace("Token=", ""));
    console.log(dataFromToken);
    console.log(dataFromToken.user);
    console.log("--- token decode ---");
    Login.findOne({ where: { user: dataFromToken.user } })
    .then((object) => {
        if (dataFromToken.user == "admin"){
            console.log("Entrou como admin")
            //console.log(object.user);
            response.send(object.user);
           // response.send(object);
        }else{
            response.send(object);
        };
    }).catch((error) => {
        console.log("Usuário não cadastrado ou dados informados estão invalidos");
    });
});

// --------------------   APIS   ---------------------------

//Com banco de dados
//Endpoint de cadastro de produtos
app.post("/cadastraproduto", validaTokenMiddleware, (request, response)=>{
    Produto.create({
        nome: request.body.nome,
        preco: request.body.preco,
        codbarra: request.body.codbarra
    }).then((object) => {response.send(object)});
});

//Com banco de dados
//Endpoint que lista os produtos cadastrados
app.get("/listaprodutos", (request, response)=>{
    Produto.findAll().then((object) => {
        response.send(object);
    })
});

//Com banco de dados
//Endpoint que lista os produtos cadastrados por codigo de barras
app.get("/listaprodutos/:id", (request, response)=>{
    Produto.findOne({ where: { codbarra: request.query.id } }).then((object) => {
        response.send(object);
    })
});

//Com banco de dados
//Endpoint de cadastro de funcionario
app.post("/cadastrafuncionario", validaTokenMiddleware, (request, response) => {
    Funcionario.create({
        nome: request.body.nome,
        documento: request.body.documento,
        telefone: request.body.telefone,
        senha: request.body.senha
    }).then((object) => {response.send(object)});
});

//Com banco de dados
//Endpoint de consulta de funcionarios
app.get("/listafuncionarios/", (request, response)=>{
    //const id = request.params.id;
    //response.status(200).send({listadefuncionarios: funcionarioscadastrados})
    Funcionario.findAll().then((object) => {
        response.send(object);
    })
    // .catch((error) => {
    //     console.log(error);
    //     response.sendStatus(500);
    // });
});

//Com banco de dados
//Endpoint de cadastro de venda
app.post("/cadastravenda", validaTokenMiddleware, (request, response) => {
    Venda.create({
        formaPagamento: request.body.formaPagamento,
        dataVenda: request.body.dataVenda,
        valoTotal: request.body.valorTotal
    }).then((object) => {response.send(object)});
});

//Com banco de dados
//Endpoint de consulta de venda
app.get("/listavendas/:dataVenda", (request, response)=>{
    console.log(request.query);
    //Venda.findOne({ where: { dataVenda: request.query } }).then((object) => {
    Venda.findAll({ where: {dataVenda: {[Op.between]: [request.query.dataVendaInicio, request.query.dataVendaFim] } }}).then((object) => {
        response.send(object);
    })
});

//Inicialização
app.listen(8888, (request, response) => {
    console.log("Express e Swagger Iniciados com Sucesso")
});
