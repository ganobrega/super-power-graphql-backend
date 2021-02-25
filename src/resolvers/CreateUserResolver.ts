import { Resolver, Mutation, Ctx, Args } from 'type-graphql';
import { ApolloError } from 'apollo-server';
import bcrypt from 'bcrypt';

import { User, CreateUserArgs } from '@prisma/generated/type-graphql';
import { IContext } from '@interfaces/index';

@Resolver((of) => User)
class CreateUserResolver {
  @Mutation((of) => User, {
    nullable: false,
    description: undefined,
  })
  async createUser(
    @Ctx() ctx: IContext,
    @Args() args: CreateUserArgs
  ): Promise<User> {
    try {
      bcrypt.hash(args.data.password, 10, (err: any, hash: string) => {
        args.data.password = hash;
      });

      const newUser = await ctx.prisma.user.create(args);

      return newUser;
    } catch (error) {
      throw new ApolloError('Invalid details for user');
    }
  }
}

export default CreateUserResolver;
