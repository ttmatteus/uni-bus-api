import { Favorito } from "src/favorito/favorito.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";


@Entity('usuarios')
@Unique(['matricula'])

export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nome: string;

    @Column()
    matricula: string

    @OneToMany(() => Favorito, favorito => favorito.usuario)
    favoritos: Favorito[];
    
}