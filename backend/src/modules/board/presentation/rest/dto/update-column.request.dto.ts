import { IsNotEmpty, IsString, Matches, ValidateIf } from 'class-validator';

export class UpdateColumnRequestDTO {
    @ValidateIf((_object, value) => value !== undefined)
    @IsString()
    @IsNotEmpty()
    name?: string;

    @ValidateIf((_object, value) => value !== undefined)
    @IsString()
    @Matches(/^#(?:[0-9a-f]{3}|[0-9a-f]{6})$/i, {
        message: 'Цвет должен быть в HEX-формате #RGB или #RRGGBB',
    })
    color?: string;
}
