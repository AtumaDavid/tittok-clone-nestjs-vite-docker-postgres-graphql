import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      // Use Apollo as the GraphQL driver
      driver: ApolloDriver,

      // Automatically generate GraphQL schema file in the specified location
      // This creates a schema.gql file in the src directory
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),

      // Sort the generated schema alphabetically for consistency
      sortSchema: true,

      // Enable GraphQL Playground for interactive API testing and exploration
      playground: true,

      // Provide request and response objects to GraphQL resolvers
      // Allows access to HTTP context in resolver functions
      context: ({ req, res }) => ({ req, res }),
    }),
    // Allows loading environment variables and configuration
    ConfigModule.forRoot({}),
    AuthModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
