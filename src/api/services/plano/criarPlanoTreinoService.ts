import { checkExercicioExists, checkModalidadeExists, checkUserIdExists, getAlunoMarca, getAutorExercicio, getMarcaGym, getModalidadeGinasio, getTreinadorMarca } from "../../helpers/dbHelpers";
import { client } from "../../prisma/client";
import { Bloco } from "../../Providers/blocoProvider";



interface IPlano{
    alunoId : string;
    treinadorId : string;
    data : Date;
    modalidadeId : string;
    blocos: Array<Bloco>;
}

export class CriarPlanoTreinoService{
  async execute({ alunoId, treinadorId, data, modalidadeId, blocos}: IPlano) {
    const exists_aluno = await checkUserIdExists(alunoId);
    if (!exists_aluno) {
      throw new Error("O aluno não existe");
    }

    const exists_treinador = await checkUserIdExists(treinadorId);
    if (!exists_treinador) {
      throw new Error("Ginásio não existe");
    }

    const exists_modalidade = await checkModalidadeExists(modalidadeId);
    if (!exists_modalidade) {
      throw new Error("A modalidade não existe");
    }

    const ginasio_modalidade = await getModalidadeGinasio(modalidadeId);
    const marca_modalidade = (await getMarcaGym(ginasio_modalidade)).marca_id;
    
    const marcaId = await getTreinadorMarca(treinadorId);
    const aluno = await getAlunoMarca(alunoId);

    if(marcaId != aluno || marcaId != marca_modalidade)
    {
      throw new Error ("Não possui autorização")
    }

    const plano = await client.planos_treino.create({
      data:{
        aluno_id: alunoId,
        treinador_id: treinadorId,
        data: data,
        modalidade_id: modalidadeId
      },
    })

    // Percorrer cada bloco
    for (let i = 0; i < blocos.length; i++) {
      const bloco = await client.bloco_treino.create({
        data:{
          n_ordem:blocos[i].nOrdem,
          plano_treino_id: plano.plano_treino_id,
          nome : blocos[i].nome,
          descricao: blocos[i].descricao
        },
      })
      // Percorrer cada exercicio do bloco
      const exercicios = blocos[i].exercicios
      for(let j = 0; j<exercicios.length; j++) {
        const exists_exercicio = await checkExercicioExists(exercicios[i].exercicioId);
        if (!exists_exercicio) {
            throw new Error("O exercicio não existe");
        }

        const autor_exercicio = await getAutorExercicio(exercicios[i].exercicioId);
        const marca_autor = await getTreinadorMarca(autor_exercicio);

        const marca_treinador = await getTreinadorMarca(treinadorId)
        if(marca_treinador != marca_autor){
            throw new Error("Não tem autorização");
        }

        const exr = await client.exercicios_bloco.create({
          data:{
            bloco_id: bloco.bloco_id,
            exercicio_id:exercicios[j].exercicioId,
            n_ordem_exercicio: exercicios[j].nOrdem
          },
        });
        //Percorre as séries de cada exericio
        const series = exercicios[i].series
        for(let y = 0; y<series.length; y++) {
          await client.series_exercicio.create({
            data:{
              n_ordem_serie: series[y].nOrdem,
              valor: series[y].valor,
              exercicios_bloco_id:exr.exercicios_bloco_id
            },
          });
        }
      }
    }

    const planoTreino = await client.planos_treino.findFirst({
      where:{
        plano_treino_id:plano.plano_treino_id
      },
      select:{
        data:true,
        isRealizado:true,
        treinador:{
          select:{
            nome:true,
            email:true,
            imagem_url:true,
          }
        },
        modalidade:{
          select:{
            nome:true
          }
        },
        bloco_treino:{
          select:{
            nome:true,
            descricao:true,
            exercicios_bloco:{
              select:{
                n_ordem_exercicio:true,
                series_exercicio:{
                  select:{
                    valor:true,
                    n_ordem_serie:true
                  }
                },
                exercicio:{
                  select:{
                    nome:true,
                    descricao:true,
                    imagens:{
                      select:{
                        url:true
                      }
                    },
                    musculos:{
                      select:{
                        musculos:{
                          select:{
                            nome:true,
                            img_url:true
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        },
      }
    })
    return {data: planoTreino, status: 200};
  }
}
