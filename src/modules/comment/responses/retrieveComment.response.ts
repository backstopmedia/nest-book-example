import { ApiModelProperty } from '@nestjs/swagger';

export class RetrieveCommentResponse {
  @ApiModelProperty({
    description: 'The ID of the comment',
    example: 1
  })
  id: number;

  @ApiModelProperty({
    description: 'The content of the comment',
    example: 'This is a comment'
  })
  body: string;
}