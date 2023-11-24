import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Blog } from "./Blog";

@Entity({name: "users"})
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    fullname: string

    @Column()
    address: string

    @Column()
    sex: string

    @Column()
    username: string

    @Column()
    password: string

    @Column()
    role: string

    @OneToMany(() => Blog, (blog) => blog.user, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
    })
    blogs: Blog[]
}