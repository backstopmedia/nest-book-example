import {
    IsEmail,
    IsNotEmpty,
    IsDefined,
    IsString,
    Length,
    Matches,
    IsDate,
    IsOptional
} from 'class-validator';
import { ApiModelPropertyOptional } from '@nestjs/swagger';

export class UpdateUserRequest {
    @IsEmail()
    @IsOptional()
    @IsString()
    @ApiModelPropertyOptional()
    public email: string;

    @Length(8)
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)\S+$/)
    @IsOptional()
    @IsString()
    @ApiModelPropertyOptional()
    public password: string;

    @IsNotEmpty()
    @IsOptional()
    @IsString()
    @ApiModelPropertyOptional()
    public firstName: string;

    @IsNotEmpty()
    @IsOptional()
    @IsString()
    @ApiModelPropertyOptional()
    public lastName: string;

    @IsDate()
    @IsOptional()
    @ApiModelPropertyOptional()
    public birthday: Date;
}
