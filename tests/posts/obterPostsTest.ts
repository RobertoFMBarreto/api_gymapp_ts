import chai from 'chai';
import chaiHttp from 'chai-http';
import 'mocha';

chai.use(chaiHttp);
const expect = chai.expect;
const should = chai.should();
const baseUrl = "/api/v1"
const server = "localhost:8000"
const tokenInvalido = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NTAwMjQ1MzgsImV4cCI6MTY1MDAyNTQzOCwic3ViIjoiMDAwZDFlMTQtNjE3ZS00MjNlLThhMWEtZjYzZDRmYTVhZjZhIn0.b0U-__cRpH8YBsAtZEtClr0fAj4t9IOwDAcI2R3j-qk'
const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NTAwMjg4MzYsImV4cCI6MTY1MDAyOTczNiwic3ViIjoiMDAwZDFlMTQtNjE3ZS00MjNlLThhMWEtZjYzZDRmYTVhZjZhIn0.mm_rN1CviCPfCIFaWvChwhgjCztJ8Dyf9y0G6QKkgag'

describe('Obter todos posts sem token', () => {
  it('Deve retornar erro de token invalido', () => {
    return chai.request(server).get(baseUrl+'/posts')
      .then(res => {
        res.should.have.status(500)
        chai.expect(res.body).to.have.property("status")
        chai.expect(res.body).to.have.property("message")
      })
  })
})

describe('Obter todos posts route com token invalido', () => {
  it('Deve retornar erro de token invalido', () => {
    return chai
    .request(server)
    .get(baseUrl+'/posts')
    .set("Authorization", tokenInvalido)
    .then(res => {
      res.should.have.status(500)
        chai.expect(res.body).to.have.property("status")
        chai.expect(res.body).to.have.property("message")
    })
  })
})

describe('Obter todos posts route teste unitário', () => {
  it('Deve retornar publicações', () => {
    return chai
    .request(server)
    .get(baseUrl+'/posts')
    .set("Authorization", token)
    .then(res => {
      res.should.have.status(200)
      chai.expect(res.body).to.be.an("array")
      if(res.body.length>0){
        //verificar se é um objeto
        chai.expect(res.body[0]).to.be.a("object")

        //verificar se as propriedades todas existem
        chai.expect(res.body[0]).to.have.property("publicacao_id")
        chai.expect(res.body[0]).to.have.property("criador_id")
        chai.expect(res.body[0]).to.have.property("data")
        chai.expect(res.body[0]).to.have.property("descricao")
        chai.expect(res.body[0]).to.have.property("tipo")
        chai.expect(res.body[0]).to.have.property("imagens_publicacao")
        chai.expect(res.body[0]).to.have.property("gostos_publicacao")

        //verificar tipos das propriedades
        chai.expect(res.body[0]['publicacao_id']).to.be.a("string")
        chai.expect(res.body[0]['criador_id']).to.be.a("string")
        chai.expect(res.body[0]['data']).to.be.a("string")
        chai.expect(res.body[0]['descricao']).to.be.a("string")
        chai.expect(res.body[0]['tipo']).to.be.a("number")
        chai.expect(res.body[0]['imagens_publicacao']).to.be.a("array")
        chai.expect(res.body[0]['gostos_publicacao']).to.be.a("array")

        //verificar se array das propriedades estão corretos
        if(res.body[0]['imagens_publicacao'].length>0){
          //verificar se objeto do array é um objeto
          chai.expect(res.body[0]['imagens_publicacao'][0]).to.be.a("object")

          // verificar se existe url da imagem
          chai.expect(res.body[0]['imagens_publicacao'][0]).to.have.property("url")

          // verificar se url da imagem é uma string
          chai.expect(res.body[0]['imagens_publicacao'][0]['url']).to.be.a("string")

        }

        //verificar se array das propriedades estão corretos
        if(res.body[0]['gostos_publicacao'].length>0){
          //verificar se objeto do array é um objeto
          chai.expect(res.body[0]['gostos_publicacao'][0]).to.be.a("object")

          // verificar se existe users do gosto
          chai.expect(res.body[0]['gostos_publicacao'][0]).to.have.property("users")

          // verificar se user é um objeto
          chai.expect(res.body[0]['gostos_publicacao'][0]['users']).to.be.a("object")
          
          //verificar se existe propriedade nome em users
          chai.expect(res.body[0]['gostos_publicacao'][0]['users']).to.have.property("nome")

          //verificar se a propriedade nome é uma string
          chai.expect(res.body[0]['gostos_publicacao'][0]['users']['nome']).to.be.a("string")
        }
      }
    })
  })
})
