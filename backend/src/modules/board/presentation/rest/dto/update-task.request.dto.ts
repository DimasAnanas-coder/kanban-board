import { IsString, IsOptional, IsNotEmpty } from 'class-validator';

export class UpdateTaskRequestDTO {
    @IsString()
    @IsOptional()
    @IsNotEmpty()
    title?: string;

    @IsString()
    @IsOptional()
    description?: string;
}
