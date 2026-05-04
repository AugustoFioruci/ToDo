# 1. Imagem base do Node
FROM node:20

# 2. Pasta de trabalho
WORKDIR /app

# 3. Copia os arquivos de dependências
COPY package*.json ./

# 4. Instala as dependências (incluindo o Prisma)
RUN npm install

# 5. Copia a pasta do Prisma (onde está o seu schema.prisma)
# Isso é essencial para o Prisma funcionar no Docker
COPY prisma ./prisma/

# 6. Gera o Prisma Client
RUN npx prisma generate

# 7. Copia o restante do código
COPY . .

# 8. Expõe a porta que o seu server.js usa (geralmente 3000)
EXPOSE 3000

# 9. Comando para rodar
CMD ["npm", "start"]