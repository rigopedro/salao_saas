# Salão SaaS - Agendamento Inteligente

Um sistema completo de agendamento online (SaaS) para salões de beleza, construído do zero com Django e React, focado em uma experiência de usuário simples e intuitiva.

<br>

## 💡 A Inspiração do Projeto

Este projeto nasceu de uma observação do mundo real: ver minha avó, dona de um salão, gerenciar sua agenda complexa de clientes em um simples caderninho. A pergunta que me moveu foi: "Como posso usar a tecnologia para criar uma experiência de agendamento digital que seja, ao mesmo tempo, incrível para o gestor e incrivelmente fácil para clientes de todas as idades?". O Salão SaaS é a minha resposta a esse desafio, transformando uma ideia em um produto funcional.

## ✅ Funcionalidades Atuais (MVP Concluído)

O projeto, no seu estado atual, é um Mínimo Produto Viável completo e funcional. Um cliente pode:

- [x] **Criar uma Conta de Usuário:** Sistema de cadastro seguro.
- [x] **Fazer Login e Logout:** Autenticação baseada em Tokens JWT, com a sessão persistida no navegador.
- [x] **Navegar por Páginas:** Sistema de roteamento para Home, Agendamento, Cadastro, Login e "Meus Agendamentos".
- [x] **Iniciar um Fluxo de Agendamento:** Um fluxo de múltiplas etapas guiado e intuitivo.
- [x] **Selecionar Múltiplos Serviços:** O cliente pode escolher um ou mais serviços para o mesmo agendamento.
- [x] **Escolher uma Profissional:** A lista de profissionais é filtrada com base nos serviços escolhidos.
- [x] **Ver Disponibilidade em Tempo Real:** Um calendário interativo que consulta a API e mostra apenas os horários livres da profissional para a data e serviços selecionados.
- [x] **Confirmar e Salvar o Agendamento:** A marcação é salva no banco de dados associada ao cliente logado.
- [x] **Ver seu Histórico:** Uma página privada onde o cliente pode consultar seus próximos agendamentos.

## 🛠️ Tecnologias Utilizadas

Este projeto foi construído utilizando uma arquitetura full-stack moderna, separando claramente as responsabilidades do back-end e do front-end.

### **Back-end**
* **Framework:** Python 3 com **Django** e **Django REST Framework**.
* **Autenticação:** **Simple JWT** para geração de JSON Web Tokens.
* **Banco de Dados:** **SQLite** (para desenvolvimento) com plano de migração para **PostgreSQL** (para produção).
* **Outros:** `django-cors-headers` para gerenciamento de CORS.

### **Front-end**
* **Framework:** **React 18** com **Vite**.
* **Linguagem:** JavaScript (ES6+).
* **Roteamento:** **React Router DOM**.
* **Requisições HTTP:** **Axios**, com uma instância configurada com interceptors para autenticação.
* **Gerenciamento de Estado Global:** **React Context API** para o estado de autenticação.
* **Componentes:** `react-datepicker` para o calendário.

### **Ferramentas e Boas Práticas**
* **Controle de Versão:** **Git** e **GitHub**.
* **Ambientes Virtuais:** `venv` para o back-end e `npm` para o front-end.
* **Editor:** Visual Studio Code.

## 🚀 Como Executar o Projeto Localmente

Siga os passos abaixo para rodar a aplicação no seu ambiente.

### **Configurando o Back-end**
```bash
# 1. Navegue até a pasta do backend
cd backend

# 2. Ative o ambiente virtual
# No Windows:
venv\Scripts\activate
# No Mac/Linux:
# source venv/bin/activate

# 3. Instale as dependências
pip install -r requirements.txt

# 4. Aplique as migrações do banco de dados
python manage.py migrate

# 5. Rode o servidor
python manage.py runserver
```
O back-end estará rodando em `http://127.0.0.1:8000`.

### **Configurando o Front-end**
```bash
# 1. Em um NOVO terminal, navegue até a pasta do frontend
cd frontend

# 2. Instale as dependências
npm install

# 3. Rode o servidor de desenvolvimento
npx vite
```
O front-end estará acessível em `http://localhost:5173`.

## 🗺️ Próximos Passos (Roadmap)

Com o MVP funcional, o plano é evoluir o SaaS com funcionalidades que agregam ainda mais valor ao negócio:

- [ ] **Painel da Profissional:** Uma área para a equipe do salão visualizar e gerenciar sua própria agenda.
- [ ] **Programas de Fidelidade:** Um sistema para incentivar a retenção de clientes.
- [ ] **Banco de Dados de Clientes (CRM):** Ferramentas para o gestor segmentar clientes e criar promoções.

---

Feito por **Pedro Rigo**.