import { Request, Response } from "express";
import { ObterAlunosGinasioService } from "../../../services/admin/alunos/obterAlunosGinasioService";

export class ObterAlunosGinasioController{
    async handle(request : Request, response :Response){
        const ginasioId = request.params.id;
        const {userId} = request.body;

        const obterAlunosGinasioController = new ObterAlunosGinasioService();
        const message = await obterAlunosGinasioController.execute({
            ginasioId,
            userId
        });

        return message;
    }
}