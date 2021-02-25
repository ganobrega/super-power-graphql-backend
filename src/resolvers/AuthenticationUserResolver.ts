import {
  Resolver,
  InputType,
  Field,
  Query,
  Mutation,
  Args,
  ArgsType,
  Ctx,
  ObjectType,
} from 'type-graphql';

import { User } from '@prisma/generated/type-graphql';
import { IContext } from '@interfaces/index';
import { GraphQLError } from 'graphql';

@InputType({ isAbstract: true, description: undefined })
class UserAuthenticateInput {
  @Field(() => String, {
    nullable: false,
    description: undefined,
  })
  email!: string;

  @Field(() => String, {
    nullable: false,
    description: undefined,
  })
  password!: string;
}

@ArgsType()
class AuthenticateUserArgs {
  @Field(() => UserAuthenticateInput, { nullable: false })
  data!: UserAuthenticateInput;
  error: any;
}

@ObjectType({
  isAbstract: true,
  description: undefined,
  simpleResolvers: undefined,
})
class AuthenticateUser {
  @Field(() => String, {
    nullable: false,
    description: undefined,
  })
  token: string;

  @Field(() => User, {
    nullable: false,
    description: undefined,
  })
  user: User;
}

@Resolver((of) => User)
class AuthenticationUserResolver {
  @Query((of) => AuthenticateUser, {
    nullable: true,
    description: undefined,
  })
  async authenticateUser(
    @Ctx() ctx: IContext,
    @Args() args: AuthenticateUserArgs
  ): Promise<AuthenticateUser | undefined> {
    try {
      const user = await ctx.prisma.user.findUnique({
        where: {
          email: args.data.email,
        },
      });

      if (user) {
        if (args.data.password === user?.password) {
          return {
            token: 'AAAAA',
            user,
          };
        } else {
          throw {
            status: 'error',
            message: 'Invalid Credentials',
          };
        }
      } else {
        throw {
          status: 'error',
          message: 'Invalid Credentials',
        };
      }
    } catch (error) {
      return error;
    }
  }

  // @Query((of) => User, { nullable: true, description: undefined })
  // async validateToken(
  //   @Ctx() ctx: IContext,
  //   @Args() token: string
  // ): Promise<any> {}
}

export default AuthenticationUserResolver;
