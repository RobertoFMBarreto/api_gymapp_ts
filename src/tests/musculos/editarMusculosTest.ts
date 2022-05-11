import chai from 'chai';
import chaiHttp from 'chai-http';
import 'mocha';

chai.use(chaiHttp);
const expect = chai.expect;
const should = chai.should();
const baseUrl = "/api/v1"
const server = "localhost:8000"
const idMusculo = '35e61af1-2ae4-4b19-a89d-90943eaa9d73'

describe('- Editar musculo sem body', () => {
    it('Deve retornar erro de body incompleto', () => {
        return chai
        .request(server)
        .put(baseUrl+'/backend/musculos/' + idMusculo)
        .then(res => {
        res.should.have.status(500)
        chai.expect(res.body).to.have.property("status")
        chai.expect(res.body).to.have.property("message")
        })
    })
})

describe('- Editar musculo corretamente', () => {
    it('Deve retornar musculo editada', () => {
      return chai
      .request(server)
      .put(baseUrl+'/backend/musculos/' + idMusculo)
      .send({
        nome: "teste unitario21",
        imagem:"img2",
      })
      .then(res => {
        
        res.should.have.status(200)
        console.log(res.body)
        // verificar se é um object
        chai.expect(res.body).to.be.an("object")

        //verificar se as propriedades todas existem
        chai.expect(res.body).to.have.property("nome")
        chai.expect(res.body).to.have.property("imagem")

        //verificar tipos das propriedades
        chai.expect(res.body['nome']).to.be.a("string")
        chai.expect(res.body['imagem']).to.be.a("string")
        })
    })
})