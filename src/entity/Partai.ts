import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Paslon } from "./Paslon";

@Entity({name: "partai"})
export default class Partai {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    partaiNumber: number

    @Column()
    name: string

    @Column()
    leader: string

    @Column()
    image: string

    @Column()
    visionMission: string

    @Column()
    address: string

    @ManyToOne(() => Paslon, (paslon) => paslon.partai)
    paslon: Paslon
}