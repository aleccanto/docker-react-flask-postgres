# Projeto Básico com Docker: React, Python (Flask) e PostgreSQL

Este projeto demonstra uma aplicação web básica utilizando React para o front-end, Python com Flask para o back-end, e um banco de dados PostgreSQL. Tudo isso orquestrado com Docker e Docker Compose.

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
│   ├── vite.config.js
│   ├── index.html
│   └── src/
│       ├── App.jsx
│       ├── main.jsx
│       └── index.css
├── docker-compose.yml
└── README.md
```

- **`back-end/`**: Contém a aplicação Python/Flask.
- **`front-end/`**: Contém a aplicação React.
- **`docker-compose.yml`**: Arquivo que define e inicia todos os serviços da aplicação via Docker Compose.
- **`README.md`**: Este arquivo.

## O que é o Docker?

O Docker é uma plataforma que permite criar, testar e implantar aplicações de forma padronizada, utilizando contêineres.

### Por que usar Docker no desenvolvimento?

O Docker resolve o clássico problema de "funciona na minha máquina, mas não em produção", garantindo que o ambiente de desenvolvimento seja idêntico ao de produção.

**Vantagens no dia a dia:**

- **Ambientes Padronizados:** Garante que toda a equipe utilize as mesmas versões de linguagens e dependências.
- **Isolamento de Projetos:** Permite trabalhar em múltiplos projetos com diferentes tecnologias na mesma máquina, sem conflitos.
- **Facilidade na Configuração:** Simplifica a instalação de serviços como bancos de dados e servidores de mensageria.
- **Simulação do Ambiente de Produção:** Ajuda a encontrar e corrigir bugs antes da implantação.
- **Integração Contínua (CI/CD):** É uma ferramenta essencial para automatizar testes e implantações.

### O que são contêineres?

Um contêiner é uma "caixa" que empacota o código de uma aplicação e todas as suas dependências. Isso garante que a aplicação seja executada de forma rápida e confiável em qualquer ambiente.

**Diferença para Máquinas Virtuais (VMs):**

- **VMs:** Virtualizam o hardware e cada uma possui um sistema operacional completo, o que as torna pesadas.
- **Contêineres:** Virtualizam o sistema operacional e compartilham o mesmo kernel, sendo mais leves e eficientes.

### Imagens Docker

Uma imagem Docker é um modelo para criar contêineres. Você pode encontrar imagens prontas no [Docker Hub](https://hub.docker.com/) para tecnologias como:

- [Python](https://hub.docker.com/_/python)
- [Node.js](https://hub.docker.com/_/node)
- [PostgreSQL](https://hub.docker.com/_/postgres)

### Dockerfile

O `Dockerfile` é um arquivo de texto com instruções para construir uma imagem Docker.

**Exemplo do `Dockerfile` do back-end:**

```dockerfile
# Utiliza uma imagem oficial do Python como imagem base
FROM python:3.8-slim

# Define o diretório de trabalho no contêiner
WORKDIR /app

# Copia os arquivos da aplicação para o contêiner
COPY . /app

# Instala as dependências
RUN pip install --no-cache-dir -r requirements.txt

# Expõe a porta 5000
EXPOSE 5000

# Comando para executar a aplicação
CMD ["python", "app.py"]
```

## O que é o Docker Compose?

O Docker Compose é uma ferramenta para definir e executar aplicações com múltiplos contêineres. Com um único arquivo YAML, você configura e sobe todos os serviços da sua aplicação.

### `docker-compose.yml`

Este arquivo descreve os serviços, redes e volumes da aplicação.

**Nosso `docker-compose.yml`:**

```yaml
services:
  back-end:
    build: ./back-end
    ports:
      - "5000:5000"
    volumes:
      - ./back-end:/app
    depends_on:
      - db

  front-end:
    build:
      context: ./front-end
      dockerfile: Dockerfile
    ports:
      - "3000:5173" # Mapeia a porta do host para a porta do Vite
    volumes:
      - ./front-end:/app
      - /app/node_modules # Isola o node_modules para evitar conflitos
    depends_on:
      - back-end

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

## Como Rodar o Projeto

**Pré-requisitos:**

- [Docker](https://www.docker.com/get-started)
- Docker Compose (geralmente instalado com o Docker)

**Comandos:**

1.  **Subir os contêineres:**

    ```bash
    docker-compose up --build
    ```

    - Para executar em segundo plano, adicione `-d`.

2.  **Parar os contêineres:**

    ```bash
    docker-compose down
    ```

    - Para uma limpeza completa que também remove os volumes (como o banco de dados), use:
    ```bash
    docker-compose down -v
    ```

3.  **Listar os contêineres:**

    ```bash
    docker-compose ps
    ```

**Acesse as aplicações:**

- **Front-end (React):** [http://localhost:3000](http://localhost:3000)
- **Back-end (Python/Flask):** [http://localhost:5000](http://localhost:5000)
