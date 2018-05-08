import { ApiModelPropertyOptional } from '@nestjs/swagger';

export class UpdateCommentResponse {
  @ApiModelPropertyOptional()
  public success?: boolean;
}
