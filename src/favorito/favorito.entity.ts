import { Onibus } from "src/onibus/onibus.entity";
import { User } from "src/user/user.entity";
import { Entity, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm";


@Entity('favoritos')
@Unique(['usuario', 'onibus'])

export class Favorito {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, user => user.favoritos, { onDelete: 'CASCADE' })
    usuario: User;

    @ManyToOne(() => Onibus, { onDelete: 'CASCADE'})
    onibus: Onibus;
}