/**
 * Importa as funções do arquivo lib/main.js
 */
import { 
  criarTarefa, 
  listarTarefas, 
  concluirTarefa, 
  excluirTarefa,
  banco
} from "./lib/main.js"

/**
 * Seleciona os elementos do HTML
 */
const nomeTarefa = document.querySelector('#tarefa')
const button =document.querySelector('#button')
let todolistElemento = document.querySelector('#todolist')
const todolistItems = document.querySelectorAll('#todolist')

/**
 * Mostra os itens na tela
 */
function renderizar() {
  todolistElemento.innerHTML = ''

  banco.forEach(el => {
    /**
     * Caso estiver concluida, mostra um tachado na tarefa
     */
    const markAsDone = el.concluida
      ? 'style="text-decoration: line-through;"'
      : 'style="text-decoration: solid;"';

      /**
       * Adiciona o todo no HTML
       */
    todolistElemento.innerHTML += `
      <p class="todolist_item" data-id=${el.id} data-concluida=${el.concluida} ${markAsDone}>${el.descricao}</p>
    `
  })
}

/**
 * Atribui evento de clique no botão de criar tarefa
 * para que quando for clicado no botão executamos um bloco de código
 */
button.addEventListener('click', (event) =>   {
  /**
   * Cancela o comportamento padrão do browser
   */
  event.preventDefault();

  /**
   * Pega a tarefa e insere no banco local
   */
  const tarefa = criarTarefa(nomeTarefa.value)

  /**
   * Adiciona a tarefa no HTML
   */
  todolistElemento.innerHTML += `
    <p class="todolist_item" data-id=${tarefa.id} data-concluida=${tarefa.concluida}>${tarefa.descricao}</p>
  `

  /**
   * Lista as tarefas no console do browser
   */
  listarTarefas();

  /**
   * Limpa o input da tarefa
   */
  nomeTarefa.value= ''
})

/**
 * Para cada item da lista de tarefas, faça
 */
for(const item of todolistItems) {
  /**
   * Atribui um evento de clique para cada item
   */
  item.addEventListener('click', (event) => {

    /**
     * Abre um prompt para o usuário digitar se deseja concluir ou excluir tarefa
     */
    const option = window.prompt('Você deseja concluir tarefa ou excluir?').toLowerCase()
    
    if(option == 'concluir' || option == 'concluir tarefa') {
      /**
        * Acessa o banco e marca como 'true' a tarefa com tal id
       */
      concluirTarefa(event.target.dataset.id)
    } else if(option == 'excluir' || option == 'remover' || option == 'deletar' || option == 'delete') {
      /**
       * Acessa o banco e exclui a tarefa que seja igual ao id do parametro
       */
      excluirTarefa(event.target.dataset.id)
    } else {
      alert('O valor digitado é inválido, tente novamente!')
    }

    /**
     * Limpa os itens e renderiza novamente
    */
   renderizar()
  })
}
