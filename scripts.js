//                        Mascaras 

//   telefone
document.getElementById('telefone').addEventListener('input', function (e) {
    let value = e.target.value.replace(/\D/g, '');
    value = value.replace(/^(\d{2})(\d)/g, '($1) $2');
    value = value.replace(/(\d{5})(\d)/, '$1-$2');
    e.target.value = value;
  });
  
  //  CPF
  document.getElementById('cpf').addEventListener('input', function (e) {
    let value = e.target.value.replace(/\D/g, '');
    value = value.replace(/(\d{3})(\d)/, '$1.$2');
    value = value.replace(/(\d{3})(\d)/, '$1.$2');
    value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    e.target.value = value;
  });
  
  //  data
  document.getElementById('dataNascimento').addEventListener('input', function (e) {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 2) value = value.replace(/(\d{2})(\d)/, '$1/$2');
    if (value.length > 5) value = value.replace(/(\d{2})\/(\d{2})(\d+)/, '$1/$2/$3');
    e.target.value = value;
  });
  
  //  CEP
  document.getElementById('cep').addEventListener('input', function (e) {
    let value = e.target.value.replace(/\D/g, '');
    value = value.replace(/^(\d{5})(\d)/, '$1-$2');
    e.target.value = value;
  });
  
  // Validaçao de senhas
  document.getElementById('formulario')?.addEventListener('submit', function (e) {
    e.preventDefault();
  
    const senha = document.getElementById('senha').value;
    const confirmarSenha = document.getElementById('confirmarSenha').value;
  
    const erroSenha = document.getElementById('erroSenha');
    const erroConfirmar = document.getElementById('erroConfirmar');
  
    let temErro = false;
  
    erroSenha.textContent = '';
    erroConfirmar.textContent = '';
  
    // Verifica se senha tem pelo menos 6 caracteres
    if (senha.length < 6) {
      erroSenha.textContent = 'A senha deve ter no mínimo 6 caracteres.';
      temErro = true;
    }
  
    // Verifica senhas iguais
    if (senha !== confirmarSenha) {
      erroConfirmar.textContent = 'As senhas não coincidem.';
      temErro = true;
    }
  
    if (temErro) return;
  
    const email = document.getElementById('email').value;
  
    const dados = {
      nome: document.getElementById('nomeCompleto').value,
      email,
      senha
    };
  
    localStorage.setItem('usuario', JSON.stringify(dados));
    alert('Cadastro realizado com sucesso!');
    window.location.href = 'login.html';
  });

  
  // Botão cancelar
  document.getElementById('cancelar')?.addEventListener('click', function () {
    if (confirm('Deseja realmente cancelar?')) {
      document.getElementById('formulario').reset();
    }
  });
  
  // Validaçao de login
  document.getElementById('formLogin')?.addEventListener('submit', function (e) {
    e.preventDefault();
  
    const email = document.getElementById('loginEmail').value;
    const senha = document.getElementById('loginSenha').value;
    const dadosSalvos = JSON.parse(localStorage.getItem('usuario'));
  
    if (!dadosSalvos) {
      alert('Nenhum usuário cadastrado. Crie uma conta primeiro.');
      return;
    }
  
    if (email === dadosSalvos.email && senha === dadosSalvos.senha) {
      alert('Login realizado com sucesso!');
    
    } else {
      alert('E-mail ou senha incorretos.');
    }
  });
  
