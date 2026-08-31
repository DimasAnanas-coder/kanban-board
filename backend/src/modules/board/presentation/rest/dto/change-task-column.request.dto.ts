import { IsNotEmpty, IsString } from 'class-validator';

export class ChangeTaskColumnRequestDTO {
    @IsString()
    @IsNotEmpty()
    columnName!: string;
}
