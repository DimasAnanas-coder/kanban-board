import { IsNotEmpty, IsString, IsOptional } from "class-validator";

export class CreateTaskRequestDTO {
    @IsString()
    @IsNotEmpty()
    title!: string;

    @IsOptional()
    @IsString()
    description?: string;
}