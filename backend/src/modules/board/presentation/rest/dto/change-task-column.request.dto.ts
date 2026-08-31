import { TaskColumnName } from '../../../application/types/column.enum.js';
import { IsEnum } from 'class-validator';

export class ChangeTaskColumnRequestDTO {
    @IsEnum(TaskColumnName)
    columnName!: string;
}
