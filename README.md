# Projeto Básico com Docker: React, Python (Flask) e PostgreSQL

Este projeto demonstra uma aplicação web básica utilizando React para o front-end, Python com Flask para o back-end, e um banco de dados PostgreSQL. Tudo isso orquestrado com Docker and Docker Compose.

## Estrutura do Projeto

```
.
├── back-end/
│   ├── Dockerfile
│   ├── requirements.txt
│   └── app.py
├── front-end/
│   ├── Dockerfile
│   ├── package.json
│   ├── public/
│   │   └── index.html
│   └── src/
│       ├── App.css
│       ├── App.js
│       ├── index.css
│       └── index.js
├── docker-compose.yml
└── README.md
```

- **`back-end/`**: Contém a aplicação Python/Flask.
- **`front-end/`**: Contém a aplicação React.
- **`docker-compose.yml`**: Arquivo de orquestração do Docker Compose.
- **`README.md`**: Este arquivo.

## Docker: O que é e como funciona?

O Docker é uma plataforma de containerização que permite empacotar uma aplicação com todas as suas dependências em uma unidade padronizada para desenvolvimento, envio e implantação.

### Imagens Docker

Uma imagem Docker é um pacote leve, autônomo e executável que inclui tudo o que é necessário para executar uma aplicação: código, tempo de execução, ferramentas de sistema, bibliotecas e configurações.

**Onde encontrar imagens?**

As imagens Docker são geralmente armazenadas em um registro de contêineres. O mais popular é o [Docker Hub](https://hub.docker.com/). Nele, você pode encontrar imagens oficiais para a maioria das tecnologias populares, como:

- **Python:** [https://hub.docker.com/_/python](https://hub.docker.com/_/python)
- **Node.js:** [https://hub.docker.com/_/node](https://hub.docker.com/_/node)
- **PostgreSQL:** [https://hub.docker.com/_/postgres](https://hub.docker.com/_/postgres)

### Dockerfile

Um `Dockerfile` é um arquivo de texto que contém todos os comandos que um usuário poderia chamar na linha de comando para montar uma imagem. O Docker pode construir imagens automaticamente lendo as instruções de um `Dockerfile`.

**Exemplo do `Dockerfile` do nosso back-end:**

```dockerfile
# Utiliza uma imagem oficial do Python como imagem base
FROM python:3.8-slim

# Define o diretório de trabalho no contêiner
WORKDIR /app

# Copia o conteúdo do diretório atual para o contêiner em /app
COPY . /app

# Instala os pacotes necessários especificados em requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Expõe a porta 5000 para acesso externo
EXPOSE 5000

# Executa app.py quando o contêiner é iniciado
CMD ["python", "app.py"]
```

**Comandos para construir e rodar um `Dockerfile` individualmente:**

1.  **Construir a imagem:**
    Navegue até o diretório que contém o `Dockerfile` (por exemplo, `back-end/`) e execute:

    ```bash
    docker build -t nome-da-sua-imagem .
    ```

    - `-t`:  Define o nome e a tag da imagem.

2.  **Rodar o contêiner:**

    ```bash
    docker run -p 5000:5000 nome-da-sua-imagem
    ```

    - `-p`: Mapeia a porta do seu computador para a porta do contêiner.

## Docker Compose: Orquestrando Múltiplos Contêineres

O Docker Compose é uma ferramenta para definir e executar aplicações Docker de múltiplos contêineres. Com o Compose, você usa um arquivo YAML para configurar os serviços da sua aplicação. Em seguida, com um único comando, você cria e inicia todos os serviços a partir da sua configuração.

### `docker-compose.yml`

Este arquivo define os serviços que compõem sua aplicação, incluindo o back-end, front-end e o banco de dados.

**Nosso `docker-compose.yml`:**

```yaml
version: '3.8'

services:
  # Serviço do back-end (Python/Flask)
  back-end:
    build: ./back-end
    ports:
      - "5000:5000"
    volumes:
      - ./back-end:/app
    depends_on:
      - db

  # Serviço do front-end (React)
  front-end:
    build:
      context: ./front-end
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
    volumes:
      - ./front-end:/app
      - /app/node_modules
    depends_on:
      - back-end

  # Serviço do banco de dados (PostgreSQL)
  db:
    image: postgres:13
    environment:
      POSTGRES_PASSWORD: password
      POSTGRES_USER: postgres
      POSTGRES_DB: postgres
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

### Comandos do Docker Compose

Com o arquivo `docker-compose.yml` na raiz do projeto, você pode usar os seguintes comandos:

1.  **Construir e iniciar os contêineres:**

    ```bash
    docker-compose up --build
    ```

    - `--build`: Força a reconstrução das imagens.

2.  **Iniciar os contêineres em segundo plano (modo "detached")**

    ```bash
    docker-compose up -d
    ```

3.  **Parar os contêineres:**

    ```bash
    docker-compose down
    ```

4.  **Listar os contêineres em execução:**

    ```bash
    docker-compose ps
    ```

## Como Rodar Este Projeto

1.  **Pré-requisitos:**
    - Docker: [https://www.docker.com/get-started](https://www.docker.com/get-started)
    - Docker Compose: Geralmente já vem instalado com o Docker.

2.  **Clone o repositório (ou crie os arquivos como descrito acima).**

3.  **Navegue até a raiz do projeto e execute:**

    ```bash
    docker-compose up --build
    ```

4.  **Acesse as aplicações:**
    - **Front-end (React):** [http://localhost:3000](http://localhost:3000)
    - **Back-end (Python/Flask):** [http://localhost:5000](http://localhost:5000)