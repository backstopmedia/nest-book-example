import { IsNotEmpty, IsDefined, IsString, Length } from 'class-validator';
import { ApiModelPropertyOptional } from '@nestjs/swagger';

export class UpdateEntryRequest {
  @IsNotEmpty()
  @IsDefined()
  @IsString()
  @ApiModelPropertyOptional()
  public title: string;

  @Length(8)
  @IsDefined()
  @IsString()
  @ApiModelPropertyOptional()
  public content: string;

  @IsNotEmpty()
  @IsDefined()
  @IsString()
  @ApiModelPropertyOptional({ isArray: true })
  public keywords: string[];
}
