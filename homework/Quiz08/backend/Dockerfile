FROM node:14
RUN mkdir myfolder

COPY ./package.json /myfolder/
COPY ./yarn.lock /myfolder/

COPY . /myfolder/
WORKDIR /myfolder/
RUN yarn install

CMD yarn dev