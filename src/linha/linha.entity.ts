import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

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
    turno: string;

    @Column()
    tipo: string;

    @Column('simple-array', { nullable: true })
    horarios?: string[];
}