# Use uma imagem oficial do Node.js como imagem pai
FROM node:20

# Define o diretório de trabalho no contêiner
WORKDIR /app

# Copia o package.json
COPY package.json ./

# Instala as dependências
RUN npm install

# Copia o resto do código da aplicação
COPY . .

# Torna a porta 3000 disponível para o mundo fora deste contêiner
EXPOSE 3000

# Executa a aplicação quando o contêiner é iniciado
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
