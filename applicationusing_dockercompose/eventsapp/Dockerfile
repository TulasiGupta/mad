FROM maven

WORKDIR /opt/applicationusing_dockercompose/eventsapp

COPY . .

RUN mvn package 

EXPOSE 8080

CMD  java -jar target/EventsApp*jar

