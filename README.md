# Formulário de Inscrição - Programa Trilhas

Este projeto é um formulário de inscrição para o **Programa Trilhas**, desenvolvido com HTML, CSS, JavaScript e Bootstrap. Ele permite que candidatos se inscrevam escolhendo uma trilha de aprendizado, preenchendo dados pessoais e realizando login posteriormente. Os dados são armazenados no `localStorage`.

## Funcionalidades

- Máscaras nos campos de CPF, telefone e data de nascimento.
- Validação de campos obrigatórios com mensagens de erro.
- Salvamento dos dados no `localStorage`.
- Preenchimento automático do formulário caso o usuário já tenha feito o cadastro.
- Tela de login com verificação de credenciais.
- Design responsivo com Bootstrap.

## Tecnologias Utilizadas

- HTML5
- CSS3
- JavaScript
- Bootstrap

## Estrutura do Projeto

```
/projeto-trilhas
│
├── index.html          # Página principal com o formulário de inscrição
├── login.html          # Página de login
├── style.css           # Estilização personalizada
├── script.js           # Lógica de máscaras, validações e salvamento de dados
└── README.md           # Este arquivo
```

## Como Usar

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/projeto-trilhas.git
   ```

2. Abra o arquivo `index.html` em seu navegador para visualizar o formulário.

3. Após o cadastro, use `login.html` para realizar login com os dados cadastrados.

## Imagens do Projeto

### Página de Inscrição
![Formulário](./screenshots/formulario.png)

### Página de Login
![Login](./screenshots/login.png)

## Autor

Desenvolvido por **Matheus Abreu** como parte do Programa Trilhas - FAPEMA/SECTI - Inova Maranhão.

---

**Observação:** Este projeto utiliza `localStorage` apenas para fins de demonstração. Para produção, recomenda-se a utilização de um banco de dados e back-end seguros.