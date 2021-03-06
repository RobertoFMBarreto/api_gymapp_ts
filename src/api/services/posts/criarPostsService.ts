/**
 * @module CriarPostsService
 */
import { publicacoes } from "@prisma/client";
import { checkUserIdExists, getMarcaGym } from "../../helpers/dbHelpers";
import { client } from "../../prisma/client";
import { VerInfoPostService } from "./obter/verInfoPostService";

/**
 * @param criadorId id do utilizador que está a criar o post
 * @param data data de criação do post
 * @param descricao descrição do post
 * @param tipo tipo do post
 * @param ginasioId id do ginasio
 * @param identificacao identificações do post
 */
export interface ICriarPostsService {
  criadorId: string;
  data: Date;
  descricao: string;
  tipo: number;
  ginasioId: string;
  identificacao: Array<string>;
}

/**
 * Classe responsavel pelo serviço de criação de posts
 */
class CriarPostsService {
  /**
 * Método que permite inserir uma publicação na base de dados tendo em conta todas as verificações necessárias
 * 
 * @param ICriarPostsService interface de dados do serviço
 */
  async execute({
    criadorId,
    data,
    descricao,
    tipo,
    ginasioId,
    identificacao
  }: ICriarPostsService) {
    if (criadorId == null && ginasioId == null) {
      // enviar erro - ou é de um ou é de outro
      return { data: "Impossível criar post!", status: 500 }
    } else {


      const exists_user = await checkUserIdExists(criadorId)
      if (!exists_user) {
        return { data: "O utilizador não existe!", status: 500 }
      }



      let post: publicacoes;
      if ((criadorId != null && ginasioId != null)) {
        post = await client.publicacoes.create({
          data: {
            criador_id: undefined,
            data,
            descricao,
            tipo: 0,
            ginasio_id: ginasioId,
          }
        })
      }
      else if (criadorId != null && ginasioId == null) {
        post = await client.publicacoes.create({
          data: {
            criador_id: criadorId,
            data,
            descricao,
            tipo: 1,
            ginasio_id: undefined,
          }
        })
      }

      if (identificacao != null && identificacao.length > 0) {
        for (let i = 0; i < identificacao.length; i++) {
          await client.identificacoes_publicacoes.create({
            data: {

              publicacao_id: post.publicacao_id,
              usersuid: identificacao[i]
            }
          })
        }
      }

      const verInfoPostService = new VerInfoPostService();
      const resp = await verInfoPostService.execute(post.publicacao_id)
      return resp;
    }
  }
}

export { CriarPostsService }
