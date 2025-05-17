import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Linha {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nome: string;

    @Column({ nullable: true })
    descricao?: string;

    @Column()
    campus: string;

    @Column()
    tipo: string;
}