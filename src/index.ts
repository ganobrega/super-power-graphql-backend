import 'reflect-metadata';
import 'tsconfig-paths/register';

import path from 'path';

import { ApolloServer } from 'apollo-server';
import { PrismaClient } from '@prisma/client';
import { buildSchema } from 'type-graphql';

// Auto-generated Resolvers
import {
  PostRelationsResolver,
  PostCrudResolver,
  UserRelationsResolver,
  FindUniqueUserResolver,
  FindManyUserResolver,
  AggregateUserResolver,
} from '@prisma/type-graphql';

// Custom Resolvers
import CreateUserResolver from '@resolvers/CreateUserResolver';
import AuthenticationUserResolver from '@resolvers/AuthenticationUserResolver';

// Interfaces
import { IContext } from '@interfaces/index';

(async () => {
  try {
    const schema = await buildSchema({
      resolvers: [
        /* User */
        AggregateUserResolver,
        FindManyUserResolver,
        FindUniqueUserResolver,
        UserRelationsResolver,
        CreateUserResolver,
        AuthenticationUserResolver,

        ,
        /* Post */
        PostRelationsResolver,
        PostCrudResolver,
      ],
      emitSchemaFile: path.resolve(__dirname, '../generated-schema.graphql'),
      validate: false,
    });

    const prisma = new PrismaClient();

    const server = new ApolloServer({
      schema,
      playground: true,
      context: (): IContext => ({ prisma }),
    });

    const { port } = await server.listen(8000);

    console.log(`GraphQL is listening on ${port}!`);
  } catch (error) {
    console.error(console.error);
  }
})();
