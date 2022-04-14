import { client } from "../../prisma/client";
import { checkUserIdExists, findUserDefinicoes } from "../../helpers/dbHelpers";

export class EditarPerfilPrivadoService {
  async execute( uId:string, is_privado:boolean ){
    const existsUser = await checkUserIdExists(uId);
    if(!existsUser){
      throw new Error("Utilizador inexistente")
    }

    const defId = await findUserDefinicoes(uId);

    const perfilEdited = await client.definicoes_user.update({
        where : {
          usersuid: uId
        },
        data : {
          is_privado: true,
        }
    })
    return {
      perfilEdited, 
    };
  }
}
  

