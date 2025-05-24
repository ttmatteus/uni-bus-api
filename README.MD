# Documentação – Entidade Linha

A `Linha` representa uma rota de ônibus do sistema. Abaixo estão os campos que compõem a entidade e o que cada um exige:

## Campos

* **id**: Identificador único da linha (gerado automaticamente).
* **nome**: Nome da linha – obrigatório (tipo: string).
* **descricao**: Descrição da linha – opcional (tipo: string).
* **campus**: Nome do campus ligado à linha – **obrigatório** (tipo: string).

  > Não dá pra criar uma linha sem informar o campus. Tá definido no modelo e no DTO.
* **tipo**: Tipo da linha – obrigatório. Aceita só:

  * `'circular'`
  * `'direto'`
  * `'expresso'`
* **turno**: Turno em que a linha opera – obrigatório. Pode ser:

  * `'manhã'`
  * `'tarde'`
  * `'noite'`

## Código – Entity

```ts
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

    @Column()
    turno: string;
}
```

## Código – DTO

```ts
import { IsIn, IsOptional, IsString } from "class-validator";

export class CreateLinhaDto {
    @IsString()
    nome: string;

    @IsOptional()
    @IsString()
    descricao?: string;

    @IsString()
    campus: string;

    @IsIn(['manhã', 'tarde', 'noite'])
    turno: string;

    @IsIn(['circular', 'direto', 'expresso'])
    tipo: string;
}
```

## Notas rápidas

* O campo `campus` tá como obrigatório no model e no DTO. Já foi testado e validado.
* O DTO faz a checagem certinho: tem que mandar o `campus` e ele tem que ser string.

## E se `campus` fosse opcional?

Se fosse pra deixar `campus` opcional, teria que mudar assim:

**Entity:**

```ts
@Column({ nullable: true })
campus?: string;
```

**DTO:**

```ts
@IsOptional()
@IsString()
campus?: string;
```

> Nesse caso, dava pra criar linha sem campus. Hoje não é assim, mas tá aí como referência.
