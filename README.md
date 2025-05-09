# Reservation Services

### Technologies Used

- **Frontend:** React, TailwindCSS, Zustand ,TanStack Query
- **Backend:** Node.js, NestJS, Prisma, PostgreSQL
- **Others:** Docker

### Installation Guide

1. Clone the Repository
   Clone the repository to your local machine using the following command:

```bash
git clone <repository_url>
cd <repository_directory>
```

2. Backend Setup

```bash
## 1. Navigate to the server directory
cd ./server

## 2.	Run Docker Compose to start the backend services in detached mode
docker compose up -d

## 3. Configure database connection
## Make sure your .env file is correctly set up to connect to the PostgreSQL database running in Docker
## Path = ./server/.env (from project root)

########################### Example .env setup ################################

POSTGRES_USER=myuser
POSTGRES_PASSWORD=mypassword
POSTGRES_DB=mydb

DATABASE_URL="postgresql://myuser:mypassword@localhost:5432/mydb?schema=public"

###############################################################################

## 4.	Install the necessary backend dependencies
npm install

## 5. Prisma migrate to create tables
npx prisma migrate dev --name init

## 6.	Seed the offices database using Prisma
npx prisma db seed

## 7.	Start the backend server in development mode
npm run start:dev
```

3. Frontend Setup

```bash
## 1.	Navigate to the frontend directory
cd ./client

## 2.	Install the necessary frontend dependencies
npm install

## 3.	Start the frontend server
npm run dev
```
