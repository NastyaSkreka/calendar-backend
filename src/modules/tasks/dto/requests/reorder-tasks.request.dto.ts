import { IsArray, IsString, Matches } from 'class-validator';

export class ReorderTasksRequestDto {
  @IsString()
  @Matches(/^\d{4}-\d{2}-\d{2}$/)
  day: string;

  @IsArray()
  orderedIds: string[];
}