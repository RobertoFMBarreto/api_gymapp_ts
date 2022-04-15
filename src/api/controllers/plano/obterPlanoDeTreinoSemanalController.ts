import { Request, Response } from "express";
import { ObterPlanoTreinoSemanalService } from "../../services/plano/obterPlanoTreinoSemanalService";

export class ObterPlanoTreinoSemanalController{
  async handle(request:Request, response:Response){
    const uid = response.locals.uid;
    const startDate = request.params.startDate;
    const endDate = request.params.endDate;

    const startDateParsed = new Date(startDate)
    const endDateParsed =new Date(endDate)
    console.log(startDateParsed,endDateParsed)
    const obterPlanoTreinoSemanalService = new ObterPlanoTreinoSemanalService();
    const resp = await obterPlanoTreinoSemanalService.execute(uid,startDateParsed,endDateParsed)
    response.json(resp)
    
  }
}