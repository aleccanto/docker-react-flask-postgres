# Use uma imagem oficial do Node.js como imagem pai
FROM node:16

# Define o diretório de trabalho no contêiner
WORKDIR /app

# Copia package.json e package-lock.json
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia o resto do código da aplicação
COPY . .

# Torna a porta 3000 disponível para o mundo fora deste contêiner
EXPOSE 3000

# Executa a aplicação quando o contêiner é iniciado
CMD ["npm", "start"]
