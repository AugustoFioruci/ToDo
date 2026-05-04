# Imagem base do Node
FROM node:20

# Pasta de trabalho
WORKDIR /app

# Copia os arquivos de dependências
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia o restante do código
COPY . .

# Expõe a porta padrão do Vite
EXPOSE 5173

# Comando para rodar o Vite expondo para a rede do Docker
CMD ["npm", "run", "dev", "--", "--host"]
