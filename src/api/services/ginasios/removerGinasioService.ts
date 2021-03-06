/**
 * @module RemoverGinasioService
 */

import { client } from "../../prisma/client";
import { checkGinasioExists, getMarcaGym } from "../../helpers/dbHelpers";

/**
 * Classe responsavel pelo serviço de remoção de ginásios
 */
class RemoverGinasioService {
  /**
   * Remover um ginásio tendo em conta todas as verificações necessárias
   * @param uId id do utilizador
   * @param ginasioId id do ginásio
  
   */
  async execute(uId: string, ginasioId: string) {
    const exists_ginasio = await checkGinasioExists(ginasioId);
    if (!exists_ginasio) {
      return { data: "O ginasio não existe", status: 500 }
    }

    const marca = await getMarcaGym(ginasioId);
    marca.dono_id

    if (marca.dono_id != uId) {
      return { data: "Não possui autorização", status: 500 }
    }

    await client.ginasio.update({
      where: {
        ginasio_id: ginasioId
      },
      data: {
        isDeleted: true
      }
    })

    return {
      data: "Ginásio removido com sucesso",
      status: 200
    };
  }
}

export { RemoverGinasioService };
