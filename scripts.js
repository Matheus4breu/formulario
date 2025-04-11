// Máscaras
// Aplica a máscara de formatação nos campos CPF, telefone e data de nascimento
function aplicarMascara(input, tipo) {
    let valor = input.value.replace(/\D/g, ''); // Remove tudo que não for número

    if (tipo === 'cpf') {
        // Máscara de CPF: 000.000.000-00
        valor = valor.replace(/(\d{3})(\d)/, '$1.$2')
                     .replace(/(\d{3})(\d)/, '$1.$2')
                     .replace(/(\d{3})(\d{2})$/, '$1-$2');
    } else if (tipo === 'telefone') {
        // Máscara de telefone: (00) 00000-0000
        valor = valor.replace(/^(\d{2})(\d)/g, '($1) $2')
                     .replace(/(\d{5})(\d{4})$/, '$1-$2');
    } else if (tipo === 'data') {
        // Máscara de data: DD/MM/AAAA
        valor = valor.replace(/(\d{2})(\d)/, '$1/$2')
                     .replace(/(\d{2})(\d)/, '$1/$2')
                     .replace(/(\d{4}).*/, '$1');
    }

    input.value = valor;
}

// Validações
// Valida campos específicos do formulário
const validacoes = {
    email: (valor) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor) ? '' : 'E-mail inválido',
    cpf: (valor) => /^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(valor) ? '' : 'CPF inválido (formato: 000.000.000-00)',
    telefone: (valor) => /^\(\d{2}\)\s\d{5}-\d{4}$/.test(valor) ? '' : 'Telefone inválido (formato: (00) 00000-0000)',
    dataNascimento: (valor) => {
        const regex = /^\d{2}\/\d{2}\/\d{4}$/;
        if (!regex.test(valor)) return 'Data inválida (formato: DD/MM/AAAA)';
        const [d, m, a] = valor.split('/');
        const data = new Date(`${a}-${m}-${d}`);
        return (data.getDate() == d && data.getMonth() + 1 == m && data.getFullYear() == a) ? '' : 'Data inválida';
    }
};

// Funções de armazenamento
// Salva os dados do formulário no localStorage com a chave baseada no e-mail do usuário
function salvarDadosFormulario(userId, dados) {
    localStorage.setItem(`formulario_${userId}`, JSON.stringify(dados));
}

// Recupera os dados salvos do formulário com base no e-mail
function recuperarDadosFormulario(userId) {
    const dados = localStorage.getItem(`formulario_${userId}`);
    return dados ? JSON.parse(dados) : null;
}

// Cadastro
// Função executada ao enviar o formulário de cadastro
function handleCadastro(event) {
    event.preventDefault(); // Impede o envio padrão do formulário

    const dados = {}; // Objeto para armazenar os dados do formulário
    let valido = true; // Flag de validação geral

    // Percorre todos os inputs e selects do formulário
    document.querySelectorAll('#formulario input, #formulario select').forEach(input => {
        if (input.type !== 'submit' && input.type !== 'radio' && input.type !== 'file') {
            dados[input.id] = input.value;
        }

        if (input.type === 'radio' && input.checked) {
            dados[input.name] = input.value;
        }

        // Validação de cada campo
        const campo = input.id;
        const validador = validacoes[campo];
        const erro = validador ? validador(input.value) : '';
        const divErro = obterOuCriarErro(input);

        if (!input.value) {
            mostrarErro(divErro, 'Campo obrigatório');
            valido = false;
        } else if (erro) {
            mostrarErro(divErro, erro);
            valido = false;
        } else {
            esconderErro(divErro);
        }
    });

    if (!valido) return; // Impede envio se algum campo for inválido

    // Cria objeto de login e salva no localStorage
    const usuario = { email: dados.email, senha: dados.senha };
    localStorage.setItem(`usuario_${dados.email}`, JSON.stringify(usuario));
    salvarDadosFormulario(dados.email, dados);

    alert('Cadastro realizado com sucesso!');
    document.getElementById('formulario').reset(); // Limpa o formulário
}

// Login
// Função de login que verifica se o e-mail e senha estão corretos
function handleLogin(event) {
    event.preventDefault();

    const email = document.getElementById('login-email').value;
    const senha = document.getElementById('login-senha').value;

    const dadosSalvos = localStorage.getItem(`usuario_${email}`);
    if (!dadosSalvos) {
        alert('Usuário não encontrado!');
        return;
    }

    const usuario = JSON.parse(dadosSalvos);
    if (usuario.senha === senha) {
        alert('Login realizado com sucesso!');
        localStorage.setItem('usuario_logado', email);
    } else {
        alert('E-mail ou senha inválidos!');
    }
}

// Preencher formulário salvo
// Preenche o formulário automaticamente com os dados do localStorage
function preencherFormularioSalvo(userId) {
    const dados = recuperarDadosFormulario(userId);
    if (!dados) return;

    Object.entries(dados).forEach(([campo, valor]) => {
        const input = document.getElementById(campo);
        if (input) {
            if (input.type === 'radio') {
                if (input.value === valor) input.checked = true;
            } else if (input.type !== 'file') {
                input.value = valor;
            }
        }
    });
}

// Mensagens de erro
// Exibe a mensagem de erro no campo correspondente
function mostrarErro(div, mensagem) {
    div.textContent = mensagem;
    div.style.display = 'block';
}

// Esconde a mensagem de erro
function esconderErro(div) {
    div.style.display = 'none';
}

// Cria a div de erro, se ainda não existir
function obterOuCriarErro(input) {
    let div = input.closest('.form-group')?.querySelector('.mensagem-erro');

    if (!div) {
        div = document.createElement('div');
        div.className = 'mensagem-erro';
        div.style.color = 'red';
        div.style.fontSize = '0.9em';
        div.style.marginTop = '5px';
        input.insertAdjacentElement('afterend', div);
    }

    return div;
}

//  Eventos 


// Configura os eventos assim que a página for carregada
document.addEventListener('DOMContentLoaded', () => {
    const formulario = document.getElementById('formulario');
    if (formulario) {
        formulario.addEventListener('submit', handleCadastro);

        const usuarioLogado = localStorage.getItem('usuario_logado');
        if (usuarioLogado) preencherFormularioSalvo(usuarioLogado);

        // Aplica as máscaras automaticamente nos campos conforme digitado
        document.getElementById('cpf')?.addEventListener('input', (e) => aplicarMascara(e.target, 'cpf'));
        document.getElementById('telefone')?.addEventListener('input', (e) => aplicarMascara(e.target, 'telefone'));
        document.getElementById('dataNascimento')?.addEventListener('input', (e) => aplicarMascara(e.target, 'data'));
    }

    const loginForm = document.getElementById('form-login');
    if (loginForm) loginForm.addEventListener('submit', handleLogin);
});
