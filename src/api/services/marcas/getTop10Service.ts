/**
 * @module GetTop10Service
 */

import { getTreinadorMarca } from "../../helpers/dbHelpers";
import { client } from "../../prisma/client";

/**
 * Classe responsavel pelo serviço que serve para obter os 10 melhores alunos
 */
export class GetTop10Service {
  /**
   * Método que permite obter os 10 melhores alunos tendo em conta a sua pontuação
   * @param uid id do utilizador
  
   */
  async execute(uid: string) {
    const marcaId = await getTreinadorMarca(uid);

    const users = await client.users.findMany({
      where: {
        OR: [
          {
            alunos_marca: {
              some: {
                marca_id: marcaId
              }
            }
          },
          {
            aluno_ginasio: {
              some: {
                ginasio: {
                  marca_id: marcaId
                }
              }
            }
          }
        ]
      },
      select: {
        hashtag: true,
        pontos: true,
        imagem_url: true
      },
      orderBy: {
        pontos: "desc"
      },
      take: 10
    })


    return { data: users, status: 200 };
  }
}