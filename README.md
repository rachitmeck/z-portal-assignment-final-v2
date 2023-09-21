# There are three ways you can run this project:

## A. :3rd_place_medal: Download this code in your local :slightly_smiling_face:

1. Download this code in your local.
2. Unzip it
3. Open in VSCode
4. Please check whether `.env` file is present or not if not present then, You need to create `.env` file in your download project in this project and paste the below details for Google Oauth
   - GOOGLE_CLIENT_ID="557963300759-lpik0h0gm84o1i97ad5t7pltjubhp1e9.apps.googleusercontent.com"
   - GOOGLE_CLIENT_SECRET="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"
   - GOOGLE_CALLBACK_URL="http://localhost:4001/auth/google/callback"
   - SESSION_SECRET="this_is_my_802fe9f8-6974-41bd-8bb6-47f0139bdc17"
5. Then you can run: `npm install`
6. Then run: `npm run dev`
7. Open in `http://localhost:4001/login`

## B. :2nd_place_medal: Using Dockerfile images -- No Setup, only need Docker in your machine :grin: :heart_eyes: :100:

1. If your machine has docker, then its very easy :grin:
2. Open Command Line/Terminal, run : `docker --version`
3. Run this: `docker run -d -p 4001:4001 dok8/z-portal-assignment-final-alpine:2.0`
4. This will download the image from docker hub and run in detach mode.
5. Open in `http://localhost:4001/login`

## C. :1st_place_medal: Using `docker-compose.yml` -- No Setup, only need Docker in your machine :grin: :heart_eyes: :100:

1. Download the source code or **docker-compose.yml** from this repo.
2. Open Command Line/Terminal, run: `docker-compose up -d`
3. Open in `http://localhost:4001/login`
4. Stop the container: `docker-compose down`

# Below are useful commands used in this project's

## To install packages :technologist:

- `npm install`

## To run app :technologist:

- `npm run dev`

## Check Docker Version :technologist:

- `docker --version`

## Build Docker image, this is for alpine images, if you want to build non-alpine then uncomment from the Dockerfile in the project folder :technologist:

- `docker build -t <image_name> .`

## Alpine Image :technologist:

- `docker build -t z-portal-assignment-final-alpine .`

## Non-Alpine Image :technologist:

- `docker build -t z-portal-assignment-final-non-alpine .`

## Tag your Docker image :technologist:

- `docker tag z-portal-assignment-final-non-alpine dok8/z-portal-assignment-final-non-alpine:1.0`
- `docker tag z-portal-assignment-final-alpine dok8/z-portal-assignment-final-alpine:2.0`

## Push your Docker image to Docker Hub :technologist:

- `docker push dok8/z-portal-assignment-final-alpine:2.0`
- `docker push dok8/z-portal-assignment-final-non-alpine:1.0`

## Run docker: you can directly run(docker run) because it will pull the image if not present. :technologist: :1st_place_medal: :100:

- `docker run -d -p 4001:4001 dok8/z-portal-assignment-final-alpine:2.0`
- `docker run -d -p 4001:4001 dok8/z-portal-assignment-final-non-alpine:1.0`

## Pull Images :technologist:

- `docker pull dok8/z-portal-assignment-final-alpine`
- `docker pull dok8/z-portal-assignment-final-non-alpine`

## Useful command :technologist:

- `docker container ls`
- `docker stop <container_id>`
- `docker container ls -a`
- `docker rm <container_id>`
- `docker images`
- `docker rmi <image_id>`
