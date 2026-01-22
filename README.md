# NestJS Mixins Example

A simple example project demonstrating how to use **TypeScript mixins** with NestJS for entities and services.

Here I'm using `typeorm` with `sqlite`

## What is this?

This project shows a practical implementation of mixins in NestJS to:

- Add reusable properties to **entities** like `createdAt`, `updatedAt`, `deletedAt`

## ⚠️ Important Note

**TypeScript supports mixins** through a pattern that uses successive class extensions. Behind the scenes, the `compose` function creates a chain of classes that extend each other:

```typescript
// Instead of a chain like:
class Temp1 extends BaseEntity {}
class Temp2 extends WithCreatedAt(Temp1) {}
class Temp3 extends WithUpdatedAt(Temp2) {}
class Final extends WithDeletedAt(Temp3) {}

// I'm trying to do this:
export class User extends compose(
  BaseEntity,
  WithCreatedAt,
  WithUpdatedAt,
  WithDeletedAt,
) {}
```

**This pattern has limitations with NestJS:**

- Dependency injection decorators (`@InjectRepository()`, etc.) don't work inside mixin classes

## Getting Started with pnpm

Install dependencies:

```bash
pnpm install
```

Run in development mode:

```bash
pnpm run start:dev
```

The API will be available at `http://localhost:3000`
