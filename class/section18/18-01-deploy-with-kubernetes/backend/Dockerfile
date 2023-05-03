# 1. 운영체제 및 프로그램 설치
# FROM ubuntu:22.04  
# hub.docker.com 으로 부터 우분투 설치
# RUN sudo at install nodejs
# RUN sudo npm install -g yarn

# 1.  운영체제 및 프로그램 설치(이미 리눅스, node, npm,yarn까지 모두 깔려 있는 컴퓨터 다운로드 하기)
FROM node:14

# 2. 내 컴퓨터에 있는 폴더나 파일을 도커 컴퓨터 안으로 복사하기
# RUN mkdir myfolder => mkdir을 통해 폴더를 만들지 않아도 COPY시 없으면 알아서 생성
COPY ./package.json /myfolder/
COPY ./yarn.lock /myfolder/
WORKDIR /myfolder/

RUN yarn install

COPY . /myfolder/
# 왼쪽 내컴퓨터 파일 , 오른 쪽 도커컴퓨터 안에 복사할 파일 경로
# RUN cd foldertest
WORKDIR /myfolder


# 3. 도커안에서 index.js 실행시키기
CMD yarn start:dev
# CMD 실행명령어로서 1번만 작성 가능