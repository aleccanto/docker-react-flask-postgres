# Use uma imagem oficial do Python como imagem pai
FROM python:3.8-slim

# Define o diretório de trabalho no contêiner
WORKDIR /app

# Copia o conteúdo do diretório atual para o contêiner em /app
COPY . /app

# Instala quaisquer pacotes necessários especificados em requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Torna a porta 5000 disponível para o mundo fora deste contêiner
EXPOSE 5000

# Define a variável de ambiente
ENV NAME World

# Executa app.py quando o contêiner é iniciado
CMD ["python", "app.py"]
