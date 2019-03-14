const express = require('express');
const app = express();

app.get('/', (req, res) => {
   res.setHeader('Access-Control-Allow-Origin', '*');
   res.send('Você não deveria estar aqui.');
});

app.get('/resposta', (req, res) => {
   // res.setHeader('Access-Control-Allow-Origin', '*');
   res.send(CreateJson());
});

// Listen to the App Engine-specified port, or 8080 otherwise
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
   console.log(`Server listening on port ${PORT}...`);
});


function CreateJson() {
  const fs = require('fs');

  let rawdata = fs.readFileSync('notificacoes/conversa.json');
  let obj = JSON.parse(rawdata);
  console.log(obj);
return obj;
}
