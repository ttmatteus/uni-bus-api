import { Linha } from "src/linha/linha.entity";
import { Rota } from "src/rota/rota.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm";



@Entity('onibus')
@Unique(['codigo'])
export class Onibus {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    codigo: string;

    @Column('double precision')
    lat: number;

    @Column('double precision')
    lng: number;

    @ManyToOne(() =>  Linha, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'linha_id' })
    linha: Linha;

    @ManyToOne(() => Rota, { onDelete: 'SET NULL', nullable: true })
    @JoinColumn({ name: 'rota_id' })
    rota: Rota;
}