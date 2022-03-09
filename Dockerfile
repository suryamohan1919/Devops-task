FROM node:16
#Creating a new directory for app files and setting path in the container
RUN mkdir -p /usr/src/app
#setting working directory in the container
WORKDIR /usr/src/app
#copying the package.json file(contains dependencies) from project source dir to container dir
COPY package.json /usr/src/app
# installing the dependencies into the container
RUN npm install
#copying the source code of Application into the container dir
COPY . /usr/src/app
RUN cd naya-web && npm install && cd ..
RUN cd naya-api && npm install && cd ..
#container exposed network port number
EXPOSE 3000
EXPOSE 8080
ENV MONGO_URI=mongodb://mongo:27017
#command to run within the container
CMD npm run dev