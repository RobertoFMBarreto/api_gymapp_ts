import { client } from "../../../prisma/client";
import { checkUserIdExists, checkGinasioExists, checkModalidadeExists, checkExercicioExists } from "../../../helpers/dbHelpers";

interface ICriarDesafioService {
    criadorId: string;
    nome: string;
    modalidadeId: string;
    dataInicio: Date;
    dataFim: Date;
    recompensa: number;
    estado: number;
    ginasioId: string;
    descricao: string;
    exercicios: string;
    regras:string;
}

class CriarDesafioService {
    async execute({criadorId, nome, modalidadeId, dataInicio, dataFim, recompensa, estado, ginasioId, descricao, exercicios, regras}: ICriarDesafioService) {
    //     const exists_criador = await checkUserIdExists(criadorId);
    //     if (!exists_criador) {
    //         throw new Error("O user não existe");
    //     }

    //     const exists_ginasio = await checkGinasioExists(ginasioId);
    //     if (!exists_ginasio) {
    //         throw new Error("Ginásio não existe");
    //     }

    //     const exists_modalidade = await checkModalidadeExists(modalidadeId);
    //     if (!exists_modalidade) {
    //         throw new Error("A modalidade não existe");
    //     }

    //     const exists_exercicio = await checkExercicioExists(exercicioId);
    //     if (!exists_exercicio) {
    //         throw new Error("O exercicio não existe");
    //     }

    //     const desafio = await client.desafios.create({
    //         data:{
    //             criador_id: criadorId,
    //             nome,
    //             modalidade_id: modalidadeId,
    //             data_inicio: dataInicio,
    //             data_fim: dataFim,
    //             recompensa,
    //             estado,
    //             descricao,
    //         },
    //     });
    //     // console.log(desafio);

    //     // para preencher a tabela regras com as suas informações
    //     for (let i = 0; i < regras.length; i++){
    //         const regra = await client.regras_desafio.create({
    //             data:{ desafio_id: desafio["dataValues"]["desafio_id"],
    //             descricao: regras[i]["descricao"],},
    //         });
    //     }

    //     // para preencher a tabela exercicios e series com as suas informações
    //     for (let i = 0; i < exercicios.length; i++) {
    //         const exercicio = await client.exercicios_desafio.create({
    //             data:{desafio_id: desafio["dataValues"]["desafio_id"],
    //             n_ordem_exercicio: exercicios[i]["n_ordem_exercicio"],
    //             exercicio_id: exercicios[i]["exercicio_id"],
    //             genero: exercicios[i]["genero"],
    //             //series: exercicios[i][]
    //             }
    //         });
    //         const series = exercicios[i]["series"]
    //         // console.log(exercicio);
    //         for(let j = 0; j<series.length; j++) {
    //         const series = await client.series_desafio.create({data:{
    //             exercicio_desafio_id: exercicio["dataValues"]["exercicio_desafio_id"],
    //             n_ordem_serie: series[j]["n_ordem_serie"],
    //             repeticoes: series[j]["repeticoes"],
    //             peso: series[j]["peso"],
    //             unidade_medida: series[j]["unidade_medida"],};
    //         });
    //         }
    //     }
    //     return {
    //         msg: "O desafio foi criado com sucesso!",
    //     };
    }
}


export { CriarDesafioService };