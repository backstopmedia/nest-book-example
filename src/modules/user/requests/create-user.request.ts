import { IsEmail, IsNotEmpty, IsDefined, IsString, Length, Matches } from 'class-validator';

export class CreateUserRequest {
  @IsEmail()
  @IsNotEmpty()
  @IsDefined()
  @IsString()
  public email: string;

  @Length(8)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)\S+$/)
  @IsDefined()
  @IsString()
  public password: string;

  @IsNotEmpty()
  @IsDefined()
  @IsString()
  public firstName: string;

  @IsNotEmpty()
  @IsDefined()
  @IsString()
  public lastName: string;
}
