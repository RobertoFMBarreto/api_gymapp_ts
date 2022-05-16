import { checkEmail, checkUserIdExists } from "../../helpers/dbHelpers";
import { client } from "../../prisma/client";


interface IEditarPerfil{
    uId:string,
    email: string,
    nome:  string,
    password: string,
    genero: number,
    descricao: string,
    imagemUrl: string  
}


export class EditarPerfilService {
  async execute({  
    uId,
    email,
    nome,
    password,
    genero,
    descricao,
    imagemUrl 

  } : IEditarPerfil){
    const existsUser = await checkUserIdExists(uId);
    if(!existsUser){
      throw new Error("Utilizador inexistente")
    }

    // verificar se o aluno já está registado
    let existsEmail = await checkEmail(email);
    if(existsEmail){
        throw Error("Email já registado!")
    }

    const user = await client.users.update({
        where : {
          uid:uId
              
        },
        data : {
          email:email,
          nome:nome,
          password:password,
          genero:genero,
          descricao:descricao,
          imagem_url:imagemUrl
        }
    })
    return user;
  }
}
  


