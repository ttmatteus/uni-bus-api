import { Linha } from "src/linha/linha.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity('rotas')
export class Rota {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nome: string;

    @ManyToOne(() => Linha, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'linha_id' })
    linha: Linha;

    @Column()
    linha_id: number;

    @Column('jsonb')
    pontos: { lat: number; lng: number}[];
}