import { IsInt, IsOptional, Min } from 'class-validator';

export class MoveTaskRequestDTO {
    @IsInt()
    @Min(1)
    columnId!: number;
    
    @IsOptional()
    @IsInt()
    @Min(1)
    beforeTaskId: number | null = null;

    @IsOptional()
    @IsInt()
    @Min(1)
    afterTaskId: number | null = null;
}
