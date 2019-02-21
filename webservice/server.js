const express = require('express');
const app = express();

app.get('/', (req, res) => {
   res.send('Hello from App Engine!');
});

app.get('/resposta', (req, res) => {
   res.send(CreateJson());
});

// Listen to the App Engine-specified port, or 8080 otherwise
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
   console.log(`Server listening on port ${PORT}...`);
});


function CreateJson() {
   var obj = {
      "dialogo":[
         {"personagem": '2', "mensagem":"Essa é uma mensagem de teste!"},
         {"personagem": '3', "mensagem":"Essa é outra mensagem de teste!"}
      ]
   }
   return obj;
}
