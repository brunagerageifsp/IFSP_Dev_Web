const request = require('supertest');
const app = require("express");

app.get('/listaprodutos', function(req, res) {
    res.status(200); //200 OK
    res.set("Content-Type", "application/json");
});

test("Teste de Requisição GET", async () => {
    const response = await request(app)
    .get("/listaprodutos")
    .accept("Accept", "text/plain");
    expect(response.statusCode).toBe(200);
    expect(response.text)
    .toBe("Retorno do callback para GET");
});

// superagent
//  .post('/api/pet') // endpoint que será acessado
//  .send({ name: 'Manny', species: 'cat' }) // envia um JSON post body
//  .set('X-API-Key', 'foobar') // define HTTP Headers e seus valoers
//  .set('accept', 'json')
//  .end((err, res) => {
//  // Calling the end function will send the request
//  console.log(res.body)
// })

// module.exports = soma;