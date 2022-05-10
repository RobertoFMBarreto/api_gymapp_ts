import chai from 'chai';
import chaiHttp from 'chai-http';
import 'mocha';

chai.use(chaiHttp);
const expect = chai.expect;
const should = chai.should();
const baseUrl = "/api/v1"
const server = "localhost:8000"

describe('- Criar musculo sem body', () => {
    it('Deve retornar erro de body incompleto', () => {
        return chai
        .request(server)
        .post(baseUrl+'/backend/musculos/')
        .then(res => {
        // não mando nenhum send - tem que retornar mensagem 500 - erro
        res.should.have.status(500)
        chai.expect(res.body).to.have.property("status")
        chai.expect(res.body).to.have.property("message")
        })
    })
})

describe('- Criar musculo corretamente', () => {
    it('Deve retornar musculo criada', () => {
      return chai
      .request(server)
      .post(baseUrl+'/backend/musculos/')
      .send({
        nome: "teste unitario",
        img_url:"img",
      })
      .then(res => {
        
        res.should.have.status(200)
        console.log(res.body)
        // verificar se é um objeto
        chai.expect(res.body).to.be.an("object")

        //verificar se as propriedades todas existem
        chai.expect(res.body).to.have.property("musculo_id")
        chai.expect(res.body).to.have.property("nome")
        chai.expect(res.body).to.have.property("img_url")

        //verificar tipos das propriedades
        chai.expect(res.body['musculo_id']).to.be.a("string")
        chai.expect(res.body['nome']).to.be.a("string")
        chai.expect(res.body['img_url']).to.be.a("string")
        })
    })
})