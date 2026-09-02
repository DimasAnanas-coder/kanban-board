import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class CreateColumnRequestDTO {
    @IsString()
    @IsNotEmpty()
    name!: string;

    @IsString()
    @Matches(/^#(?:[0-9a-f]{3}|[0-9a-f]{6})$/i, {
        message: 'Цвет должен быть в HEX-формате #RGB или #RRGGBB',
    })
    color!: string;
}
