import { IsInt, IsOptional, IsString, Length, Matches, Min } from 'class-validator';

export class UpdateTaskRequestDto {
  @IsOptional()
  @IsString()
  @Length(1, 200)
  title?: string;

  @IsOptional()
  @IsString()
  @Matches(/^\d{4}-\d{2}-\d{2}$/)
  day?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  order?: number;
}