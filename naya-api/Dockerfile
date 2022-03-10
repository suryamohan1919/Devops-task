FROM node:16
#Creating a new directory for app files and setting path in the container
RUN mkdir -p /usr/src/app/api
#setting working directory in the container
WORKDIR /usr/src/app/api
#copying the package.json file(contains dependencies) from project source dir to container dir
COPY . /usr/src/app/api
# installing the dependencies into the container
RUN npm install
#container exposed network port number
EXPOSE 8080
ENV MONGO_URI="mongodb+srv://surya:surya@cluster0.ijpqd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
ARG weburl
ENV REACT_APP_WEBURL=$weburl
ARG apiurl
ENV REACT_APP_APIURL=$apiurl
#command to run within the container
CMD npm start
