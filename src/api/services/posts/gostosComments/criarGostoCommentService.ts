/**
 * @module CriarGostoCommentService
 */
import { checkComentarioExists, checkIsComentarioPublicacaoExists, checkPostExists } from "../../../helpers/dbHelpers";
import { client } from "../../../prisma/client";

/**
 * Classe responsavel pelo serviço de criação de gostos em comentários
 */
export class CriarGostoCommentService {
  /**
   * Método que permite criar um gosto em um comentário realizando todas as as verificações necessárias
   * @param comentarioId id do comentário
   * @param publicacaoId id da publicação
   * @param criadorId id do criador
  
   */
  async execute(comentarioId: string, publicacaoId: string, criadorId: string) {
    const existsComment = await checkComentarioExists(comentarioId)
    if (!existsComment) {
      return { data: "Comentario não existe", status: 500 }
    }

    const existsPost = await checkPostExists(publicacaoId)
    if (!existsPost) {
      return { data: "Publicação não existe", status: 500 }
    }

    const isComentarioPost = await checkIsComentarioPublicacaoExists(comentarioId, publicacaoId)
    if (!isComentarioPost) {
      return { data: "Comentário inexistente na publicação", status: 500 }
    }

    const gosto = await client.gostos_comentario.create({
      data: {
        criador_id: criadorId,
        comentario_id: comentarioId,
      }
    })

    return { data: gosto, status: 200 };
  }
}