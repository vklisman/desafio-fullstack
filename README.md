# Desafio Fullstack

Este é um projeto fullstack desenvolvido como parte de um desafio técnico. Ele consiste em um **frontend** desenvolvido com Angular e um **backend** desenvolvido com Django, utilizando Celery para processamento assíncrono e RabbitMQ como broker de mensagens. O objetivo do projeto é processar números enviados pelo frontend, calcular a média e a mediana, e exibir os resultados.

---

## Tecnologias Utilizadas

### Backend
- **Django**: Framework web para o backend.
- **Django REST Framework**: Para criação de APIs RESTful.
- **Celery**: Para processamento assíncrono de tarefas.
- **RabbitMQ**: Broker de mensagens para o Celery.
- **PostgreSQL**: Banco de dados relacional (configurado no `docker-compose.yml`).

### Frontend
- **Angular**: Framework para desenvolvimento do frontend.
- **Bootstrap**: Para estilização básica.

### Infraestrutura
- **Docker**: Para containerização do projeto.
- **Docker Compose**: Para orquestração dos serviços.

---

## Funcionalidades

1. **Frontend**:
   - Formulário para entrada de três números.
   - Exibição de uma tabela com os números enviados, status do processamento, média e mediana.

2. **Backend**:
   - API para receber os números e iniciar o processamento.
   - API para consultar o status do processamento e os resultados.

3. **Processamento Assíncrono**:
   - O backend utiliza Celery para calcular a média e a mediana de forma assíncrona.
   - RabbitMQ é usado como broker de mensagens.

---

## Estrutura do Projeto

```
desafio-fullstack/
├── backend/                # Código do backend
│   ├── core/               # Configurações principais do Django
│   ├── processamento/      # App Django para processamento de números
│   ├── requirements.txt    # Dependências do backend
│   ├── Dockerfile          # Dockerfile do backend
│   └── manage.py           # Script de gerenciamento do Django
├── frontend/               # Código do frontend
│   ├── src/                # Código-fonte do Angular
│   ├── package.json        # Dependências do frontend
│   ├── angular.json        # Configuração do Angular CLI
│   └── Dockerfile          # Dockerfile do frontend
├── docker-compose.yml      # Orquestração dos serviços
└── README.md               # Documentação do projeto
```

---

## Pré-requisitos

Certifique-se de ter as seguintes ferramentas instaladas em sua máquina:
- **Docker**: [Instalar Docker](https://docs.docker.com/get-docker/)
- **Docker Compose**: [Instalar Docker Compose](https://docs.docker.com/compose/install/)

---

## Passo a Passo para Rodar o Projeto

### 1. Clone o Repositório

```bash
git clone https://github.com/vklisman/desafio-fullstack.git
cd desafio-fullstack
```

---

### 2. Configure o Ambiente

Certifique-se de que as portas abaixo estão disponíveis:
- **Backend**: `8000`
- **Frontend**: `4200`
- **RabbitMQ**: `5672` e `15672`

---

### 3. Suba os Serviços com Docker Compose

Execute o seguinte comando para iniciar todos os serviços:

```bash
docker-compose up --build
```

Isso irá:
- Construir as imagens do backend e frontend.
- Iniciar os serviços do backend, frontend, RabbitMQ e Celery.

---

### 4. Acesse os Serviços

- **Frontend**: [http://localhost:4200](http://localhost:4200)
- **Backend**: [http://localhost:8000/api/](http://localhost:8000/api/)
- **RabbitMQ (Painel de Controle)**: [http://localhost:15672](http://localhost:15672)  
  - **Usuário**: `guest`
  - **Senha**: `guest`

---

### 5. Teste o Funcionamento

1. Acesse o frontend em [http://localhost:4200](http://localhost:4200).
2. Insira três números no formulário e clique em "Calcular".
3. Verifique os resultados na tabela abaixo do formulário.

---

## Endpoints da API

### 1. **Processar Números**
- **URL**: `/api/processar/`
- **Método**: `POST`
- **Descrição**: Envia três números para processamento.
- **Exemplo de Payload**:
  ```json
  {
    "num1": 1,
    "num2": 2,
    "num3": 3
  }
  ```
- **Resposta**:
  ```json
  {
    "id": 1,
    "status": "Processando"
  }
  ```

### 2. **Consultar Status**
- **URL**: `/api/status/<id>/`
- **Método**: `GET`
- **Descrição**: Consulta o status e os resultados do processamento.
- **Resposta**:
  ```json
  {
    "id": 1,
    "num1": 1,
    "num2": 2,
    "num3": 3,
    "media": 2.0,
    "mediana": 2.0,
    "status": "Concluído"
  }
  ```

---

## Comandos Úteis

### Parar os Serviços
```bash
docker-compose down
```

### Aplicar Migrações no Backend
```bash
docker-compose exec backend python manage.py makemigrations
docker-compose exec backend python manage.py migrate
```

### Acessar o Shell do Django
```bash
docker-compose exec backend python manage.py shell
```

---

## Possíveis Problemas e Soluções

### 1. Porta em Uso
Se alguma porta estiver em uso, altere as portas no arquivo `docker-compose.yml`.

### 2. Erro de Banco de Dados
Certifique-se de que as migrações foram aplicadas:
```bash
docker-compose exec backend python manage.py migrate
```

---

## Melhorias Futuras

- Atualização automática no frontend via Polling/WebSockets para exibir status em
tempo real.
- Testes unitários no backend (Pytest/Django TestCase).​
- [x] Melhorias na interface (UI/UX).​
  - Implementado layout responsivo com divisão entre campos de entrada e resultados.
  - Adicionado estilo de card com efeito de blur para os campos de entrada.
  - Melhorada a tabela de resultados com:
    - Centralização dos valores.
    - Ajuste dinâmico das colunas conforme os dados.
    - Cores alternadas nas linhas e efeito de hover.
  - Adicionada borda ao formulário e à tabela para melhor organização visual.
- [x] Validação para garantir que os valores são numéricos no frontend e backend.

---

## Autor

Desenvolvido por **Victor Klisman** como parte de um desafio técnico. 😊
