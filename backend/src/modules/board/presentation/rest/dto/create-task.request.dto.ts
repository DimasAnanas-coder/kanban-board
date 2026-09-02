import { IsNotEmpty, IsString, IsOptional, IsInt, Min } from 'class-validator';

export class CreateTaskRequestDTO {
    @IsString()
    @IsNotEmpty()
    title!: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsInt()
    @Min(1)
    columnId!: number;
}
