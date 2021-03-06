/**
 * @module EditarAvaliacaoController
 */
import { Request, Response } from "express";
import { EditarAvaliacaoService } from "../../services/avaliacoes/editarAvaliacoesService";

/**
 * Classe responsável por receber e chamar os métodos do serviço que serve para editar avaliações
 */
export class EditarAvaliacaoController {
  /**
   * Permite editar avaliações recebendo os dados pelo body e parâmetro do request, verificando se este existem e redirecionado de seguida para o serviço associado
   *
   * {@link CriarAvaliacaoService}
   * @param request pedido efetuado.
   * @param response resposta.
   */
  async handle(request: Request, response: Response) {
    //Declarar Serviço
    const editarAvaliacaoService = new EditarAvaliacaoService();
    const treinadorId = request.params.treinadorId;
    //Pedir request.body (Request)
    const data = {
      peso: request.body.peso,
      unidade_peso: request.body.unidade_peso,
      musculo: request.body.musculo,
      gordura_corporal: request.body.gordura_corporal,
      gordura_visceral: request.body.gordura_visceral,
      agua: request.body.agua,
      proteina: request.body.proteina,
      massa_ossea: request.body.massa_ossea,
      metabolismo_basal: request.body.metabolismo_basal,
      medidas: request.body.medidas,
      imagens: request.body.imagens,
      imc: request.body.imc
    };

    try {
      if (
        treinadorId === undefined ||
        data.peso === undefined ||
        data.unidade_peso === undefined ||
        data.musculo === undefined ||
        data.gordura_corporal === undefined ||
        data.gordura_visceral === undefined ||
        data.agua === undefined ||
        data.proteina === undefined ||
        data.massa_ossea === undefined ||
        data.imc === undefined ||
        data.metabolismo_basal === undefined ||
        data.medidas === undefined ||
        data.imagens === undefined
      ) {
        throw new Error("Pedido inválido");
      }

      //Avaliação ID por parametro
      const avaliacao_id = request.params.id;

      //Utilizar Serviço criado
      const resp = await editarAvaliacaoService.execute(
        data,
        avaliacao_id,
        treinadorId
      );

      response.status(resp.status).json(resp.data);
    } catch (e) {
      response.status(500).json(e.message)
    }
  }
}
