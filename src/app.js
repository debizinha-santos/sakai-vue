// Importa o Express
const express = require('express');

// Cria uma instância do Express
const app = express();

// Define a porta em que a API irá rodar
const PORT = process.env.PORT || 3000;

// Middleware para ler o corpo das requisições em formato JSON
app.use(express.json());

// Definindo uma rota de exemplo
app.get('/', (req, res) => {
  res.send('API está no ar!');
});

// Outra rota de exemplo
app.get('/api', (req, res) => {
  res.json({ message: 'Bem-vindo à minha API!' });
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});