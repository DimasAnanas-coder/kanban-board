import { IsString, IsOptional } from 'class-validator';

export class UpdateTaskRequestDTO {
    @IsString()
    @IsOptional()
    title?: string;

    @IsString()
    @IsOptional()
    description?: string;
}
