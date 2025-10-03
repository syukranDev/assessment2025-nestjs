import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, ManyToMany } from "typeorm";
import { Post } from "../../posts/entities/posts.entity";
import { Field, ObjectType,ID, Int } from '@nestjs/graphql';

@Entity('tags')
export class Tag {
    @PrimaryGeneratedColumn()
    @Field(() => ID)
    id: number;

    @Column()
    @Field()
    name: string;

    @CreateDateColumn()
    @Field()
    created_at: Date;

    @UpdateDateColumn()
    @Field()
    updated_at: Date;

    @ManyToMany(() => Post, post => post.tags)
    posts: Post[];
}