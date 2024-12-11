import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field()
  id?: number;

  @Field()
  fullname: string;

  @Field({ nullable: true })
  email?: string;

  @Field()
  bio?: string;

  @Field({ nullable: true })
  image: string;

  @Field()
  password: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
