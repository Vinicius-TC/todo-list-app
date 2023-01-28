/**
 * @param string id
 * @param string descricao
 * @param bool concluida 
 */
export let banco = [];

export function criarTarefa(descricao, concluida = false) {

  const ids = banco.map(el => el.id)

  const lastItem = ids[ids.length - 1] || 0;
  
  let dados = {
    id: lastItem + 1,
    descricao: descricao,
    concluida: concluida
  };

  banco.push(dados);

  return dados
}

export function listarTarefas() {
  console.log(banco);
}

export function concluirTarefa(id) {
  banco.forEach(tarefa => {
    if (tarefa.id == id) {
      tarefa.concluida = true;
    }
  });
}

export function editarTarefa(id, descricao) {
  banco.forEach((tarefa) => {
    if (tarefa.id == id) {
      tarefa.descricao = descricao;
    }
  });
}

export function excluirTarefa(id) {
  banco.splice((parseInt(id) - 1), 1);
}
