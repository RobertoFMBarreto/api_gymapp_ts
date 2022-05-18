import { Request, Response } from "express";
import { EditarPublicacaoService } from "../../services/posts/editarPublicacoesService";


export class EditarPublicacaoController{
  async handle(request : Request, response : Response) {
    const uId = request.params.userId;
    const publicacaoId = request.params.id;

    const { descricao } = request.body;
    if(publicacaoId === undefined || descricao === undefined){
      throw new Error("Pedido inválido")
    }
    let newData = new Date(Date.now());
    const editarPublicacaoService = new EditarPublicacaoService();

    const resp = await editarPublicacaoService.execute({
      uId,
      publicacaoId,
      newData,
      descricao
    });

    response.json(resp.data).status(resp.status);
  }
}
