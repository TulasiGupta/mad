FROM maven

WORKDIR /opt/eventsapp

COPY . .

RUN mvn package 

EXPOSE 8080

CMD  java -jar target/EventsApp*jar
