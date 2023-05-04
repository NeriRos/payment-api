# What i've done

Start with initiating the project with the following command:

```bash
nest new payment-api
```

Use microservices.

```bash
yarn add @nestjs/microservices
```

```typescript
const app = await NestFactory.createMicroservice(AppModule, {
  transport: Transport.TCP,
  options: { port: 3000 }
});
```

Create the payment module.
This module will contain the business logic for the checkout process.

create a new resource with the following command:

```bash
nest g res payment
```

