import { IsInt, Min } from 'class-validator';

export class ChangeTaskColumnRequestDTO {
    @IsInt()
    @Min(1)
    columnId!: number;
}
