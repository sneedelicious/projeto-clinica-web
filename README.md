# Sistema de Atendimento Inteligente para Clínicas Médicas

## 📖 Sobre o Projeto

Este projeto é uma aplicação web full-stack desenvolvida para modernizar e otimizar o processo de agendamento de consultas em clínicas médicas de pequeno porte. A solução visa substituir processos manuais por um sistema digital, seguro e eficiente, melhorando a experiência tanto para pacientes quanto para a administração da clínica.

A plataforma conta com um sistema de autenticação, painéis de controle distintos para pacientes e secretariado, e integrações com APIs externas para enriquecer a experiência do usuário, como a busca automática de endereço por CEP e a exibição da previsão do tempo para o dia da consulta.

Este repositório contém todo o código-fonte, dividido entre as pastas `backend` e `frontend`.

---

## 🚀 Tecnologias Utilizadas

O projeto foi construído utilizando um ecossistema moderno baseado em JavaScript, tanto no frontend quanto no backend.

#### **Backend**
* **Node.js:** Ambiente de execução do JavaScript no servidor.
* **Express.js:** Framework para a construção da API RESTful.
* **MongoDB:** Banco de dados NoSQL para persistência dos dados.
* **Mongoose:** ODM para modelagem dos dados da aplicação com o MongoDB.
* **JWT (JSON Web Token):** Para a implementação de um sistema de autenticação seguro.
* **Dotenv:** Para gerenciamento de variáveis de ambiente.
* **CORS:** Middleware para permitir requisições de origens diferentes.

#### **Frontend**
* **Vue.js:** Framework progressivo para a construção da interface de usuário (SPA).
* **Vue Router:** Para o gerenciamento de rotas no lado do cliente.
* **Vuex:** Para o gerenciamento de estado global da aplicação.
* **Axios:** Cliente HTTP para realizar a comunicação com a API do backend.

#### **APIs Externas**
* **ViaCEP:** Para a consulta e preenchimento automático de endereços a partir do CEP.
* **OpenWeatherMap:** Para obter a previsão do tempo para a data e local da consulta.

---

## ⚙️ Instruções de Uso e Instalação

Siga os passos abaixo para executar o projeto em seu ambiente local.

### **Pré-requisitos**
* [Node.js](https://nodejs.org/en/) (versão 16 ou superior)
* [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (uma conta gratuita para o banco de dados em nuvem)

### **1. Configuração do Backend**

```bash
# 1. Clone este repositório e navegue até a pasta do backend
git clone [https://github.com/sneedelicious/projeto-clinica-web.git](https://github.com/sneedelicious/projeto-clinica-web.git)
cd projeto-clinica-web/backend

# 2. Instale as dependências
npm install

# 3. Crie um arquivo .env na raiz da pasta /backend e preencha com suas chaves
```

**Arquivo `backend/.env`:**
```env
MONGO_URI=mongodb+srv://sneedz:sm181003@clinica.ndskgfn.mongodb.net/?retryWrites=true&w=majority&appName=Clinica
PORT=5000
OPENWEATHER_API_KEY=64d3b0fc765c53e587b4a9d88e27bf64
JWT_SECRET=123
```

```bash
# 4. Inicie o servidor do backend
node server.js
```
> O servidor estará rodando em `http://localhost:5000`.

### **2. Configuração do Frontend**

```bash
# 1. Abra um novo terminal e navegue até a pasta do frontend
cd projeto-clinica-web/frontend

# 2. Instale as dependências
npm install

# 3. Inicie o servidor de desenvolvimento do Vue
npm run serve
```
> A aplicação estará acessível em `http://localhost:8080`.

---

## 🌐 Deploy

A aplicação foi implantada e pode ser acessada através dos seguintes links:

* **Frontend (Aplicação Web):** `https://projeto-clinica-web.vercel.app/`
* **Backend (API):** `https://clinica-api-sergio.onrender.com`

---

## 👨‍💻 Autor

**Sérgio Martins Filho**

* **GitHub:** [sneedelicious](https://github.com/sneedelicious)

