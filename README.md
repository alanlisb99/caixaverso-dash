# CaixaVerso
# 📊 CaixaVerso Dashboard

Projeto desenvolvido como parte de um desafio técnico.  
O objetivo é criar um dashboard funcional com autenticação, consumo de API fake, gráficos, simulador de investimentos e testes unitários com cobertura acima de 80%.

---

## 🚀 Tecnologias Utilizadas

- **Angular 19**
- **TypeScript**
- **Chart.js + ng2-charts**
- **RxJS**
- **JSON Server** (fake backend)
- **Karma + Jasmine** (testes unitários)
- **HTML / CSS**

---

## 📁 Estrutura do Projeto

src/
├── app/
│ ├── auth/ # Login e autenticação
│ ├── core/ # Guard + Interceptor
│ ├── dashboard/ # Páginas e componentes do dashboard
│ ├── models/ # Interfaces e tipagens
│ └── services/ # Serviços (API, perfil, investimentos)
└── fake-api/ # Backend fake (JSON Server)

## Development server


A API ficará disponível em:

👉 http://localhost:3000/

Endpoints importantes:

- `POST /autenticacao/login`
- `GET /investimentos`
- `GET /perfil`

---

## 🔐 Login Fake

Use o login configurado na API:

email: teste@teste.com

senha: 123456


## 🧪 Como rodar os testes

ng test

---

## 📊 Gerar cobertura de testes


O relatório ficará em:

/coverage/index.html

yaml
Copy code

O projeto mantém **+80% de cobertura** em:

- Statements  
- Branches  
- Lines  

## Running end-to-end tests

## ✨ Funcionalidades Implementadas

- ✔ Autenticação com login fake (JSON Server + token)
- ✔ AuthGuard com bloqueio e redirecionamento
- ✔ Interceptor adicionando token nas requisições
- ✔ Dashboard completo contendo:
  - gráfico da evolução dos investimentos
  - lista de produtos recomendados
  - perfil de risco do usuário
  - simulador de investimentos
- ✔ Testes unitários para components, services e guards
- ✔ Cobertura acima de 80%


**Alan Lisboa**  
Projeto desenvolvido para avaliação técnica.
