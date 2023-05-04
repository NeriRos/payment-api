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

```bash
nest g app authentication
```

This app will be a microservice.

```bash
yarn add @nestjs/microservices
```

In main.ts change the NestFactory to create a microservice.

```typescript
const app = await NestFactory.createMicroservice(AppModule, {
  transport: Transport.TCP,
  options: { port: 3000 }
});
```

</details>

# TODO

## Basic flow

1. Create app
2. Create api-gateway
    1. Create auth module
    2. Create payment module
3. Create authentication microservice
    1. Create user entity
    2. Use service property as database
    3. Create jwt strategy
    4. Create register and auth routes
4. Create payment microservice
    1. Create purchase entity
    2. Use service property as database
    3. Create checkout route
        1. verify user token
        2. send request to refresh if expired
        3. complete purchase

## Advanced flow

1. Add EventBus
    1. Use RabbitMQ
2. Add prisma
    1. Use Redis for caching
    2. Use Postgres for storage
3. Add docker
4. Add CI/CD
5. Add AWS