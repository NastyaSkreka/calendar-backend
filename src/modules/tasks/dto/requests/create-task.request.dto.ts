import { IsString, Length, Matches } from 'class-validator';

export class CreateTaskRequestDto {
  @IsString()
  @Length(1, 200)
  title: string;

  @IsString()
  @Matches(/^\d{4}-\d{2}-\d{2}$/)
  day: string;

}