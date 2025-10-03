import { OneToOne, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, JoinColumn } from "typeorm";
import { User } from "./user.entity";
import { Field, ObjectType,ID, Int } from '@nestjs/graphql';
@Entity('user_profiles')
@ObjectType()
export class UserProfile {
    @PrimaryGeneratedColumn()
    @Field(() => ID)
    id: number;

    @Column()
    @Field()
    first_name: string;

    @Column()
    @Field()
    last_name: string;

    @Column()
    @Field(() => Int)
    age?: number

    @CreateDateColumn()
    @Field()
    created_at: Date;

    @UpdateDateColumn()
    @Field()
    updated_at: Date;

    @OneToOne(() => User, user => user.profile)
    @JoinColumn()
    user: User
}