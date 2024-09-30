FROM node:latest

WORKDIR /app

COPY package.json .

RUN npm install --force
 
COPY . .

# RUN npx prisma generate
# RUN npx prisma migrate deploy

RUN npm run build

EXPOSE 3001

ENV PORT 3001

CMD HOSTNAME="0.0.0.0" npm start
