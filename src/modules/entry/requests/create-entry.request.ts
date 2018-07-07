import { IsNotEmpty, IsDefined, IsString, Length } from 'class-validator';
import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';

export class CreateEntryRequest {
    @IsNotEmpty()
    @IsDefined()
    @IsString()
    @ApiModelProperty()
    public title: string;

    @Length(8)
    @IsDefined()
    @IsString()
    @ApiModelProperty()
    public content: string;

    @IsNotEmpty()
    @IsDefined()
    @IsString()
    @ApiModelPropertyOptional({ isArray: true })
    public keywords: string[];
}
