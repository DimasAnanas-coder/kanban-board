import { IsInt, Min } from 'class-validator';

export class MoveTaskRequestDTO {
    @IsInt()
    @Min(1)
    columnId!: number;
}
