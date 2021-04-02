FROM node:14.16.0-alpine3.10  
WORKDIR /src
# install app dependencies
COPY package*json ./
RUN yarn install
# add app
COPY . .
# start app
EXPOSE 3000
CMD ["yarn", "start"]