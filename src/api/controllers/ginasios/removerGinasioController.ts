import { Request, Response } from "express";
import { RemoverGinasioService } from "../../services/ginasios/removerGinasioService";

class RemoverGinasioController {
  async handle(request: Request, response: Response) {
    const uId = request.params.adminId;
    const ginasioId = request.params.id;
    if (uId === undefined || ginasioId === undefined) {
      response.status(500).json("Pedido inválido");
    }

    const removerGinasioService = new RemoverGinasioService();
    const resp = await removerGinasioService.execute(uId, ginasioId);
    response.status(resp.status).json(resp.data);
  }
}

export { RemoverGinasioController };
