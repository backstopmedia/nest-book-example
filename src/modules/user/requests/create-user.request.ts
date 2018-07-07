import {
    IsEmail,
    IsNotEmpty,
    IsDefined,
    IsString,
    Length,
    Matches
} from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class CreateUserRequest {
    @IsEmail()
    @IsNotEmpty()
    @IsDefined()
    @IsString()
    @ApiModelProperty()
    public email: string;

    @Length(8)
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)\S+$/)
    @IsDefined()
    @IsString()
    @ApiModelProperty()
    public password: string;

    @IsNotEmpty()
    @IsDefined()
    @IsString()
    @ApiModelProperty()
    public firstName: string;

    @IsNotEmpty()
    @IsDefined()
    @IsString()
    @ApiModelProperty()
    public lastName: string;
}
