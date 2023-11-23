import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"
import { User } from "./User";

@Entity({name: "blogs"})
export class Blog {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    author: string;

    @Column()
    image: string;

    @Column()
    dateCreated: Date

    @ManyToOne(() => User, (user) => user.blogs, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
    })
    user: User
}