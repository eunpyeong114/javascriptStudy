#  1. 운영체제 및 프로그램 설치
# doceker hub로부터 다운 받아 온다
# FROM ubuntu : 22.04

# 우분투 운영체제에서 프로그램 설치
# RUN sudo apt install nodejs

# yarn 설치
# RUN sudo npm install -g yarn

#
# 위의 설치 프로그램이 다 설치 된 컴퓨터도 업로드 되어있음,  여기서 업로드 되어 있는 컴퓨터를 이미지라 부름

# 1. 운영체제 및 프로그램 설치(이미 리눅스, node, npm, yarn 까지 모두 깔려 있는 컴퓨터 다운로드하기)
FROM node:14

# 2. 내 컴퓨터에 있는 폴더나 파일을 도커 컴퓨터 안으로 복사하기
# 도커파일 안에 my folder 폴더 생성
# RUN mkdir myfolder  => 아래 copy에서 myfolder란 이름의 폴더가 없으면 자동으로 만들어 주기 때문에 생략 가능
# qqq 폴더안에 내 모든 파일을 도커 내 qqq폴더 안으로 복사하고 싶다 ( 왼쪽 : 내 컴퓨터에 존재하는 파일 / 오른쪽: 도커 컴퓨터 파일&'/'로 시작)

# index.js나 email.js등에 약간의 변경사항만 있을 뿐 package.json의 변경이 없다면 아래 문구를 copy ./myfolder/ 윗부분으로 끌어올리면 따로 불필요한 설치없이 새로운 컴퓨터 생성가능
COPY ./package.json /myfolder/
COPY ./yarn.lock /myfolder/ 

COPY . /myfolder/
# myfolder 폴더로 들어가고 싶다
#RUN cd myfolder 
# or myfolder 폴더로 들어가서 커서 깜빡이게 해줘
WORKDIR /myfolder/
# node_modules 다른 사람들과 일관성있게 하기 위해 다시 설치
# 커서가 myfolder에 있는 상태에서 yarn install 조회가능하기 때문에 얘는 따로 끌어올리지 않고 아래에 냅둔 것!
RUN yarn install
#<-------지금까지 컴퓨터 만들기 과정-------> 터미널에 docker build 명령어로 만듦
# 딱 한번만 만들고 복사 및 저장해놓고 계속 쓸 예정 => 이미지(=컴퓨터) , RUN 명령어는 여러번 사용 가능

# 3. 도커 안에서 index.js 실행시키기
# index.js 실행시키고 싶다 , CMD는 실행 명령어로서 한번만 사용
CMD yarn start:dev
#<----------컴퓨터 실행하기 과정-----------> 터미널에 docker images 명령어 -> 생성된 컴퓨터 조회 / docker run 컴퓨터 아이디 -> 컴퓨터 실행