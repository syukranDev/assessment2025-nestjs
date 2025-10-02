import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, ManyToMany, ManyToOne, JoinTable } from "typeorm";
import { Tag } from "../../tags/entities/tags.entity";
import { User } from "../../users/entities/user.entity";

@Entity('posts')
export class Post {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    created_by: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @ManyToMany(() => Tag, tag => tag.posts)
    @JoinTable({ name: 'PostTags'})
    tags: Tag[];

    @ManyToOne(() => User, user => user.posts)
    user: User;
}