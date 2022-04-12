import { Request, Response } from "express";
import { EditarMusculoService } from "../../services/musculos/editarMusculoService";

export class EditarMusculoController{
  async handle(request:Request, response:Response){
    const musculoId = request.params.musculoId;
    const {nome} = request.body;

    const editarMusculosService = new EditarMusculoService();
    const resp = await editarMusculosService.execute(musculoId,nome);

    response.json(resp)
  }
}