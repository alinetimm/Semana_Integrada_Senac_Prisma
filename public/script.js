document.addEventListener('DOMContentLoaded', () => {
    const listaEventos = document.getElementById('lista-eventos');
    const modal = document.getElementById('modal-inscricao');
    const formInscricao = document.getElementById('form-inscricao');
    const btnCancelar = document.getElementById('btn-cancelar');

    // Função para buscar e exibir os eventos na tela
    async function carregarEventos() {
        try {
            // Faz a requisição para a API do backend
            const response = await fetch('/eventos'); 
            if (!response.ok) {
                throw new Error('Falha ao carregar eventos.');
            }
            const eventos = await response.json();

            // Limpa a mensagem de "Carregando..."
            listaEventos.innerHTML = ''; 

            if (eventos.length === 0) {
                listaEventos.innerHTML = '<p class="text-center text-gray-500">Nenhum evento encontrado.</p>';
                return;
            }

            // Cria os cards para cada evento
            eventos.forEach(evento => {
                const dataFormatada = new Date(evento.data).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
                
                const card = document.createElement('div');
                card.className = 'bg-white rounded-lg shadow-md p-6 flex flex-col md:flex-row items-start md:items-center gap-6';
                card.innerHTML = `
                    <div class="w-full md:w-1/4">
                        <p class="text-lg font-bold text-blue-600">${dataFormatada}</p>
                        <p class="text-sm text-gray-500">${evento.local}</p>
                    </div>
                    <div class="w-full md:w-2/4">
                        <h3 class="text-xl font-bold text-gray-800">${evento.titulo}</h3>
                        <p class="text-gray-600 mt-1">${evento.descricao}</p>
                    </div>
                    <div class="w-full md:w-1/4 text-left md:text-right mt-4 md:mt-0">
                        <button data-id="${evento.id}" data-titulo="${evento.titulo}" class="btn-inscrever bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 font-semibold">
                            Inscrever-se
                        </button>
                    </div>
                `;
                listaEventos.appendChild(card);
            });

        } catch (error) {
            console.error('Erro:', error);
            listaEventos.innerHTML = '<p class="text-center text-red-500">Ocorreu um erro ao carregar os eventos. Tente novamente mais tarde.</p>';
        }
    }

    // Função para abrir o modal de inscrição
    function abrirModal(eventoId, eventoTitulo) {
        document.getElementById('evento-id').value = eventoId;
        document.getElementById('modal-titulo-evento').textContent = eventoTitulo;
        formInscricao.reset(); // Limpa o formulário
        modal.classList.remove('hidden');
    }

    // Função para fechar o modal
    function fecharModal() {
        modal.classList.add('hidden');
    }

    // Event Listener para abrir o modal ao clicar em "Inscrever-se"
    listaEventos.addEventListener('click', (e) => {
        if (e.target.classList.contains('btn-inscrever')) {
            const id = e.target.dataset.id;
            const titulo = e.target.dataset.titulo;
            abrirModal(id, titulo);
        }
    });

    // Event Listener para fechar o modal no botão "Cancelar"
    btnCancelar.addEventListener('click', fecharModal);
    
    // Event Listener para fechar o modal clicando fora dele
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            fecharModal();
        }
    });

    // Event Listener para o envio do formulário de inscrição
    formInscricao.addEventListener('submit', async (e) => {
        e.preventDefault(); // Evita o recarregamento da página

        const eventoId = document.getElementById('evento-id').value;
        const nomeAluno = document.getElementById('nome-aluno').value;
        const emailAluno = document.getElementById('email-aluno').value;

        try {
            const response = await fetch(`/eventos/${eventoId}/inscrever`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nomeAluno, emailAluno }),
            });

            const result = await response.json();

            if (!response.ok) {
                // Se a API retornar um erro (ex: e-mail já cadastrado), exibe a mensagem
                throw new Error(result.error || 'Erro desconhecido.');
            }
            
            alert('Inscrição realizada com sucesso!');
            fecharModal();

        } catch (error) {
            console.error('Erro na inscrição:', error);
            alert(`Erro ao inscrever: ${error.message}`);
        }
    });

    // Carrega os eventos assim que a página é aberta
    carregarEventos();
});