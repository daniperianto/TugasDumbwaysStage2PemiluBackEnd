import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { Paslon } from "./Paslon";

@Entity({name: "voters"})
export class Voter {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    address: string

    @Column()
    sex: string

    @Column()
    paslonName: string

    @OneToOne(() => User)
    @JoinColumn()
    user: User

    @ManyToOne(() => Paslon, (paslon) => paslon.voters, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
    })
    paslon: Paslon
}