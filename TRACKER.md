# What i've done

<details>
<summary>Click to expand</summary>

## Setup

Initialize the project with the following command:

```bash
nest new payment-api
```

## API Gateway

Create a new app called api-gateway to manage communication between microservices.

```bash
nest g app api-gateway
```

Delete the previously created app.

```bash
rm -rf apps/payment-api
```

## Authentication

Create another app called authentication.

This app will be a microservice.

```bash
yarn add @nestjs/microservices
```

In main.ts change the NestFactory to create a microservice.

```typescript
const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.TCP,
    options: {port: 3000}
});
```

## Common

Create a common module to share code between apps.

```bash
nest g lib common
```

Add DTOs for the various apps.

```bash
nest g class common/<app>/<dto>.dto
```

## Mail

Create a mailer app microservice.

Install dependencies.

```bash
yarn add  @nestjs-modules/mailer nodemailer handlebars
yarn add --dev @types/nodemailer
```

</details>

# TODO

## Basic app

1. [x] Create app
2. [x] Create api-gateway
    - [x] Create auth module
    - [x] Create payment module
3. [x] Create authentication microservice
    - [x] Create user entity
    - [x] Use service property as database
    - [x] Create jwt strategy
    - [x] Create register and auth routes
4. [x] Create payment microservice
    - [x] Create checkout route
        - [x] protect route with jwt
        - [x] complete purchase
5. [ ] Create mailer microservice
    - [ ] Send email

## Advanced app

1. Add EventBus
    1. Use RabbitMQ
2. Add prisma
    1. Use Redis for caching
    2. Use Postgres for storage
3. Add docker
4. Add CI/CD
5. Add AWS