import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn , OneToOne, OneToMany } from "typeorm";
import { UserProfile } from "./userProfile.entity";
import { Post } from "../../posts/entities/posts.entity";
import { Field, ObjectType,ID, Int } from '@nestjs/graphql';
@Entity('users')
@ObjectType()
export class User {
    @PrimaryGeneratedColumn()
    @Field(() => ID)
    id: number;

    @Column({ unique: true })
    @Field()
    username: string;

    @Column({ unique: true })
    @Field()
    email: string;

    @Column()
    password: string;

    @CreateDateColumn()
    @Field()
    created_at: Date;

    @UpdateDateColumn()
    @Field()
    updated_at: Date;

    @OneToOne(() => UserProfile, userProfile => userProfile.user)
    @Field(() => UserProfile)
    profile?: UserProfile

    @OneToMany(() => Post, post => post.user)
    posts: Post[];
}