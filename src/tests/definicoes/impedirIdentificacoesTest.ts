import chai from 'chai';
import chaiHttp from 'chai-http';
import 'mocha';

chai.use(chaiHttp);
const expect = chai.expect;
const should = chai.should();
const baseUrl = "/api/v1"
const server = "localhost:8000"
const tokenInvalido = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NTAwMjQ1MzgsImV4cCI6MTY1MDAyNTQzOCwic3ViIjoiMDAwZDFlMTQtNjE3ZS00MjNlLThhMWEtZjYzZDRmYTVhZjZhIn0.b0U-__cRpH8YBsAtZEtClr0fAj4t9IOwDAcI2R3j-qk'

let token = ''

describe("Teste impedir identificações", () => {
  beforeEach((done) => {
    chai
      .request(server)
      .post(baseUrl + "/auth/login")
      .send({
        email: "biancasilva@gmail.com",
        password: "passwd",
      })
      .end((err, res) => {
        token = `Bearer ${res.body.token}`;
        res.should.have.status(200);
        done();
      });
  });
  describe('- Sem token', () => {
    it('Deve retornar erro de authToken invalido', () => {
      return chai
        .request(server)
        .put(baseUrl + '/definicoes/identificacao/')
        .then(res => {
          res.should.have.status(500)
          chai.expect(res.body).to.have.property("status")
          chai.expect(res.body).to.have.property("message")
        })
    })
  })

  describe('- Token invalido', () => {
    it('Deve retornar erro de authToken invalido', () => {
      return chai
        .request(server)
        .put(baseUrl + '/definicoes/identificacao/')
        .set("Authorization", tokenInvalido)
        .then(res => {
          res.should.have.status(500)
          chai.expect(res.body).to.have.property("status")
          chai.expect(res.body).to.have.property("message")
        })
    })
  })

  describe('- Editar impedir identificacoes sem body', () => {
    it('Deve retornar erro de body incompleto', () => {
      return chai
        .request(server)
        .put(baseUrl + '/definicoes/identificacao/')
        .set("Authorization", token)
        .then(res => {
          res.should.have.status(500)
          chai.expect(res.body).to.have.property("status")
          chai.expect(res.body).to.have.property("message")
        })
    })
  })

  describe('- Editar impedir identificacoes corretamente', () => {
    it('Deve retornar impedir identificacoes editado', () => {
      return chai
        .request(server)
        .put(baseUrl + '/definicoes/identificacao/')
        .set("Authorization", token)
        .send({
          identificacoes: false
        })
        .then(res => {

          res.should.have.status(200)
          // verificar se é um object
          chai.expect(res.body).to.be.an("object")

          //verificar se as propriedades todas existem
          chai.expect(res.body).to.have.property("identificacoes")

          //verificar tipos das propriedades
          chai.expect(res.body['identificacoes']).to.be.a("boolean")
        })
    })
  })
})

