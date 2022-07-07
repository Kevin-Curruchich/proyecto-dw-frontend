## BUILD
# docker build -t front:0.1.0 -f front.dockerfile .

## RUN
# docker run -d -p 3000:3000 front:0.1.0

FROM node:16.10.0-stretch-slim


# Copy application
COPY . /opt/app

WORKDIR /opt/app

#RUN npm install -g npm
RUN npm install

RUN npm run build

## Fase de ejecucion
#FROM node:16.10.0-stretch-slim

#COPY --from=compilacion /opt/app/build /opt/app/build

RUN npm install -g serve 
CMD ["serve","-s","build"]