# 빌드 이미지로 node:14 지정 
FROM node:14 AS build

WORKDIR /app

# 라이브러리 설치에 필요한 파일만 복사
COPY package.json .
COPY package-lock.json .

# 라이브러리 설치
RUN npm install

# 소스코드 복사
COPY . /app

# 소스코드 빌드
RUN npm run build

# 프로덕션 스테이지
FROM nginx:1.21.4-alpine 
COPY nginx.conf /etc/nginx/conf.d/default.conf.template
ENV BACKEND_PORT 8080
ENV BACKEND_HOST yeet-backend

COPY docker-entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

# 빌드 이미지에서 생성된 dist 폴더를 nginx 이미지로 복사 (vue는 dist 폴더에 빌드되고 react는 build 폴더에 빌드된다.그래서 build 사용!)
COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80
ENTRYPOINT ["docker-entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]