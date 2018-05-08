import { IsNotEmpty, IsDefined, IsString, Length } from 'class-validator';
import { ApiModelPropertyOptional } from '@nestjs/swagger';

export class UpdateCommentRequest {
    @IsNotEmpty()
    @IsDefined()
    @IsString()
    @ApiModelPropertyOptional()
    public body: string;
}
