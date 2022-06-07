
/**
 * @module VerTodosDesafiosService
 */
import { checkGinasioExists, getAlunoMarca, getDonoMarca, getFuncaoId, getMarcaGym, getTreinadorMarca, getUserFuncao } from "../../helpers/dbHelpers";
import { client } from "../../prisma/client";

/**
 * @param uId id do utilizador
 * @param ginasioId id do ginásio que se pretende ver todos os desafios
 */
export interface IGinasios {
    uId: string,
    ginasioId: string
}

/**
 * Classe responsavel pelo serviço que serve para obter todos os desafios
 */
export class VerTodosDesafiosService {
    /**
 * Método que permite obter todos os desafios disponíveis da base de dados tendo em conta todas as verificações necessárias
 * 
 * @param uId id do utilizador
 * @param ginasioId id do ginásio
 */
    async execute({ uId, ginasioId }: IGinasios) {
        const exists_dst = await checkGinasioExists(ginasioId);
        if (!exists_dst) {
            return { data: "O ginasio não existe", status: 500 }
        }

        const funcao = await getUserFuncao(uId);
        const treinador = await getFuncaoId("Treinador");
        const aluno = await getFuncaoId("Aluno");

        const marca_ginasio = (await getMarcaGym(ginasioId)).marca_id;
        const dono_marca = await getDonoMarca(marca_ginasio);

        // treinador
        if (funcao == treinador) {
            const marca_treinador = await getTreinadorMarca(uId)
            if (marca_treinador != marca_ginasio) {
                return { data: "Não tem autorização", status: 500 }
            }
        }
        // aluno
        else if (funcao == aluno) {
            const aluno_marca = await getAlunoMarca(uId);
            if (aluno_marca != marca_ginasio) {
                return { data: "Não tem autorização", status: 500 }
            }
        }
        else {
            if (uId != dono_marca) {
                return { data: "Não tem autorização", status: 500 }
            }
        }

        const desafios = await client.desafios.findMany({
            where: {
                ginasio_id: ginasioId,
                isDeleted: false

            }, select: {
                nome: true,
                data_inicio: true,
                data_fim: true,
                recompensa: true,
                descricao: true,
                isEncerrado: true
            }
        })
        return { data: desafios, status: 200 };
    }
}