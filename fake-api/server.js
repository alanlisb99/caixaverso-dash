const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

// Endpoint de login: POST /autenticacao/login
server.post('/autenticacao/login', (req, res) => {
  const { email, senha } = req.body;

  // Aqui você valida do jeito que quiser.
  // Exemplo: compara com o usuário do db.json
if (email === 'teste@teste.com' && senha === '123456') {
  return res.json({
    token: 'fake-jwt-token-123',
    usuario: {
      nome: 'Usuário Teste',
      email: 'teste@teste.com',
    },
  });
}


  return res.status(401).json({ message: 'Credenciais inválidas' });
});

// Demais rotas REST padrão (users, etc.)
server.use(router);

server.listen(3000, () => {
  console.log('JSON Server rodando em http://localhost:3000');
});

