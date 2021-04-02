FROM node:14.16.0-alpine3.10  
WORKDIR /src
COPY package*json ./
RUN npm install  
COPY . . 
EXPOSE 4000
CMD ["npm","run","start"]