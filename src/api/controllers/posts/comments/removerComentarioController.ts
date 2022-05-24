import { Request, Response } from "express";
import { RemoverComentarioService } from "../../../services/posts/comments/removerComentarioService";

export class RemoverComentarioController {
  async handle(request: Request, response: Response) {
    const criadorId = request.params.userId;
    const comentarioId = request.params.comentarioId;
    const publicacaoId = request.params.publicacaoId;

    try{
      if (
        criadorId === undefined ||
        comentarioId === undefined ||
        publicacaoId === undefined
      ) {
        throw new Error("Pedido inválido");
      }
  
      const removerComentarioService = new RemoverComentarioService();
      const resp = await removerComentarioService.execute(
        criadorId,
        comentarioId,
        publicacaoId
      );
  
      response.status(resp.status).json(resp.data);
    } catch (e) {
      response.status(500).json(e.message)
    }
  }
}
