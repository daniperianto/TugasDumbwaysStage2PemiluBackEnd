import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import Partai from "./Partai"
import { Voter } from "./Voter"

@Entity({name: "paslon"})
export class Paslon {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    paslonNumber: number

    @Column()
    visionMission: string

    @Column()
    image: string

    @OneToMany(() => Voter, (voter) => voter.paslon, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
    })
    voters: Voter[]

    @OneToMany(() => Partai, (partai) => partai.paslon)
    partai: Partai[]

}
