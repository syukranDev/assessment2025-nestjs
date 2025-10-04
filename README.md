# NestJS GraphQL API

Simple CRUD API with GraphQL. You can create users, posts, tags. Has JWT tokenn so you need to login first to get the token, token is set to 1hour on purpose.

You can test using my own instance (<URL TBA>) or you can as setup below 

## Setup Steps

### 1. Clone and Install
```bash
git clone
cd assessment2025-nestjs
npm i
```

### 2. Database Setup
Remove .example from .env.example and fill below with your own key
```env
DB_HOST=localhost
DB_USERNAME=your_db_user
DB_PASSWORD=your_db_pass
DB_NAME=your_db_name
JWT_SECRET=your_secret_key_here
```

### 3. Run migrations
```bash
npm run db:run
```

### 4. Start  Server
```bash
npm run dev
```

Server will run on `http://localhost:3000`

## GraphQL Playground
Go to `http://localhost:3000/graphql` to test queries directly in browser

## Postman 
Or use postman collection raw code i shared in the codebase (filename : `TBA`), you might need to change to localhost base url if you wish to setup on your own..

## My findings when learning

### CQRS stuffs
- command handler for WRITE operations, query handler for READ operations
- commandBus payload must match ordering like what stated in command file
- commands must follow DTO i.e optional etc

### random
- use forwardRef if module A uses module B and module B use module A, to avoid circular dependency
- use JwtModule.registerAsync to ensure .env finish uploaded, without this will be undefined at auth.module during runtime
- joining table name: by default it will use tableA-tableB, so need to name it using @JoinTable({name: 'new name goes here'})
- @JoinTable() --> new tablename become "post-tags"
- @JoinTable({name : 'PostTags'}) --> new tablename become "PostTags"

### graphql stuffss
- code first approach (easier to maintain, less file lol) - just share the same typeorm entities and add the graphql decorator
- add resolver (query + mutation)
- user login no need CQRS lah..cus its service belong in Auth but controller at users