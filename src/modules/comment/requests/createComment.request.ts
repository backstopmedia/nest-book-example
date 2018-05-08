import { IsNotEmpty, IsDefined, IsString, Length } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class CreateCommentRequest {
  @IsNotEmpty()
  @IsDefined()
  @IsString()
  @ApiModelProperty()
  public body: string;
}
