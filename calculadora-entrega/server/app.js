require('dotenv').config()

const express = require('express')
const app = express()
const port = process.env.PORT
const path = require('path')
const bodyParser = require('body-parser')
const repositorio = require('./repositorio');

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))

// Função
const calcular = (usuario, operacoes) => {
  let formula = "";
  let resultado;

  for (let i = 0; i < operacoes.length; i++) {
    formula += (isNaN(operacoes[i]) ? operacoes[i] : Number(operacoes[i])) + " ";
  }

  try {
    resultado = eval(formula);
  } catch (error) {
    resultado = 0;
    formula = "Erro na formula";
  }

  return {
    usuario: usuario,
    formula: formula,
    resultado: resultado
  }
}

//Páginas 
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/home.html'))
})

//API
app.get('/api/historico', async (req, res) => {
  res.json(await repositorio.listaHistorico());
})

app.post("/api/acessar", async (req, res) => {
  res.json(await repositorio.inserirUsuario(req.body));
})

app.post("/api/calcular", async (req, res) => {
  const operacoes = req.body.operacoes;
  const usuario = req.body.usuario;

  res.json(await repositorio.inserirHistorico(calcular(usuario, operacoes)));
})

app.listen(port, () => {
  console.log(`Servidor iniciado na porta ${port}`)
})