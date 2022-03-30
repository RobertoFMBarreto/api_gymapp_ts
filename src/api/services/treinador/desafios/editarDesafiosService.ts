import { client } from "../../../prisma/client";

interface Idata {
    nome: string,
    data_inicio: Date,
    data_fim: Date,
    recompensa: number,
    estado: number,
    descricao: string,
}

export class EditarDesafioService {
    async execute(data: Idata,desafio_id:string) {

        if(data.data_inicio>data.data_fim){
            throw new Error("A data de final começa antes da inicial")
        }

        const atualizarDesafio = await client.desafios.update({
            where:{
                desafio_id:desafio_id
            },
            data:{
                nome: data.nome,
                data_inicio: data.data_inicio,
                data_fim: data.data_fim,
                recompensa: data.recompensa,
                estado : data.estado,
                descricao: data.descricao
            }
        })

        return atualizarDesafio
           
    }
}