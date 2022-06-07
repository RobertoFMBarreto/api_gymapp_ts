/**
 * @module RemoverDesafioService
 */
import { checkDesafioDisponivel, checkDesafioIdExists, getDonoMarca, getFuncaoId, getGinasioDesafio, getMarcaGym, getTreinadorMarca, getUserFuncao } from "../../helpers/dbHelpers";
import { client } from "../../prisma/client";

export class RemoverDesafioService {
    async execute(desafio_id: string, uId: string) {

        const search_desafio = await checkDesafioIdExists(desafio_id);
        if (!search_desafio) {
            return { data: "Não existe o desafio", status: 500 }
        }

        const funcao = await getUserFuncao(uId);
        const treinador = await getFuncaoId("Treinador");

        const ginasio_desafio = await getGinasioDesafio(desafio_id);
        const marca_ginasio = (await getMarcaGym(ginasio_desafio)).marca_id;
        const dono_marca = await getDonoMarca(marca_ginasio);

        const desafio_disponivel = await checkDesafioDisponivel(desafio_id);
        if (!desafio_disponivel) {
            return { data: "O desafio já não está disponível", status: 500 }
        }

        // treinador
        if (funcao == treinador) {
            const marca_treinador = await getTreinadorMarca(uId)
            if (marca_treinador != marca_ginasio) {
                return { data: "Não tem autorização", status: 500 }
            }
        }
        // admin
        else {
            if (uId != dono_marca) {
                return { data: "Não tem autorização", status: 500 }
            }
        }

        const desafioDeleted = await client.desafios.update({
            where: { desafio_id: desafio_id },
            data: {
                isDeleted: true
            }
        })

        return { data: "O desafio foi eliminado com sucesso", status: 200 };
    }
}