/**
 * @module EditarAtividadesService
 */
import { client } from "../../prisma/client";
import { checkAtividadeExists } from "../../helpers/dbHelpers";

/**
 * @param atividadeId id da atividade que se pretende editar
 * @param descricao descricao da atividade
 * @param icon icon que a atividade irá ter
 */
export interface IEditarAtividades {
    atividadeId: string,
    descricao: string,
    icon: string,
}

export class EditarAtividadesService {
    async execute(data: IEditarAtividades) {
        const exists_dst = await checkAtividadeExists(data.atividadeId);
        if (!exists_dst) {
            return { data: "A atividade não existe", status: 500 }
        }

        const atualizarAtividade = await client.atividades.update({
            where: {
                atividade_id: data.atividadeId
            },
            data: {
                descricao: data.descricao,
                icon: data.icon
            }
        })
        return { data: atualizarAtividade, status: 200 };
    }
}
