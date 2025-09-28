const app = require('./src/app');
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Servidor rodando na porta: ${port}`);
  console.log(`Teste a rota: http://localhost:${port}/api/pokemon/25`);
  console.log(`Teste o time: http://localhost:${port}/api/randomteam`);
});
