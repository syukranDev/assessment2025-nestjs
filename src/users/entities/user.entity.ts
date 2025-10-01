import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn , OneToOne } from "typeorm";
import { UserProfile } from "./userProfile.entity";
@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @OneToOne(() => UserProfile, userProfile => userProfile.user)
    profile?: UserProfile
}