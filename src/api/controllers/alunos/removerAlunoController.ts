import { RemoverAlunoService } from "../../services/alunos/removerAlunoService";
import { Request, Response } from "express";


export class RemoverAlunoController {
  async handle(request: Request, response: Response) {
    const uId = request.params.uId;
    const adminId = request.params.adminId;
    if (uId === undefined || adminId === undefined) {
      response.json("Pedido inválido").status(500);
    }

    const removerAlunoService = new RemoverAlunoService();
    const resp = await removerAlunoService.execute(uId, adminId);
    response.status(resp.status).json(resp.data);
  };
}

