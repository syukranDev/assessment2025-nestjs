import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, ManyToMany, ManyToOne, JoinTable } from "typeorm";
import { Tag } from "../../tags/entities/tags.entity";
import { User } from "../../users/entities/user.entity";
import { Field, ObjectType,ID, Int } from '@nestjs/graphql';

@Entity('posts')
@ObjectType()
export class Post {
    @PrimaryGeneratedColumn()
    @Field(() => ID)
    id: number;

    @Column()
    @Field()
    title: string;

    @Column()
    @Field()
    description: string;

    @Column()
    @Field()
    created_by: string;

    @CreateDateColumn()
    @Field()
    created_at: Date;

    @UpdateDateColumn()
    @Field()
    updated_at: Date;

    @ManyToMany(() => Tag, tag => tag.posts)
    @JoinTable({ name: 'PostTags'})
    @Field(() => [Tag], {nullable: true})
    tags: Tag[];

    @ManyToOne(() => User, user => user.posts)
    @Field(() => User)
    user: User;
}