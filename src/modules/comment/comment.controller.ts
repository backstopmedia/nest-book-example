import { Controller, Get, Post, Put, Delete, HttpStatus, Res, Body, Param } from '@nestjs/common';
import { ApiUseTags, ApiBearerAuth, ApiOperation, ApiImplicitParam, ApiImplicitBody, ApiResponse } from '@nestjs/swagger';
import { Comment } from '../../shared/decorators/comment.decorator';
import { CommentService } from './comment.service';
import { IComment } from './interfaces';
import { IUser } from '../user/interfaces';
import { User } from '../../shared/decorators/user.decorator';
import { CreateCommentRequest } from './requests/createComment.request';
import { UpdateCommentRequest } from './requests/updateComment.request';
import { RetrieveCommentResponse } from './responses/retrieveComment.response';

@Controller('entries/:entryId')
@ApiUseTags('comments')
@ApiBearerAuth()
@ApiResponse({
    status: 500,
    description: 'Indicates an unhandled internal server error occurred. The response body may contain an error message.',
    type: 'string'
})
export class CommentController {
    constructor(private readonly commentService: CommentService) {}

    @Get('comments')
    @ApiOperation({
        title: 'Retrieve Comments',
        description: 'Retrieves all comments for the specific blog entry'
    })
    @ApiImplicitParam({
        name: 'entryId',
        description: 'The ID of the blog entry the comment belongs to',
        required: true,
        type: 'string'
    })
    @ApiResponse({
        status: 200,
        description: 'All the comments associated with the specific blog entry',
        type: RetrieveCommentResponse,
        isArray: true
    })
    public async index(@User() user: IUser, @Param('entryId') entryId: number, @Res() res) {
        const comments = await this.commentService.findAll({ where: { entryId }});
        return res.status(HttpStatus.OK).json(comments);
    }

    @Post('comments')
    @ApiOperation({
        title: 'Create Comment',
        description: 'Creates a comment on the specific blog entry'
    })
    @ApiImplicitParam({
        name: 'entryId',
        description: 'The ID of the blog entry the comment belongs to',
        required: true,
        type: 'string'
    })
    @ApiImplicitBody({
        name: 'CreateCommentRequest',
        description: 'The request body should contain a single property "body" that holds the content for the comment',
        type: CreateCommentRequest,
        required: true
    })
    @ApiResponse({
        status: 201,
        description: 'Indicates the comment was successfully saved. The response body will be empty.'
    })
    public async create(@User() user: IUser,  @Param('entryId') entryId: number, @Body() body: CreateCommentRequest, @Res() res) {
        if (!body || (body && Object.keys(body).length === 0)) return res.status(HttpStatus.BAD_REQUEST).send('Missing body.');

        const comment: IComment = { ...body, userId: user.id, entryId };
        await this.commentService.create(comment);

        return res.status(HttpStatus.CREATED).send();
    }

    @Get('comments/:commentId')
    @ApiOperation({
        title: 'Retrieve Comment',
        description: 'Retrieves the specific comment for the specific blog entry'
    })
    @ApiImplicitParam({
        name: 'entryId',
        description: 'The ID of the blog entry the comment belongs to',
        required: true,
        type: 'string'
    })
    @ApiImplicitParam({
        name: 'commentId',
        description: 'The ID of the comment to be retrieved',
        required: true,
        type: 'string'
    })
    @ApiResponse({
        status: 200,
        description: 'The contents of the specific comment',
        type: RetrieveCommentResponse
    })
    public async show(@User() user: IUser, @Comment() comment: IComment, @Res() res) {
        return res.status(HttpStatus.OK).json(comment);
    }

    @Put('comments/:commentId')
    @ApiOperation({
        title: 'Update Comment',
        description: 'Updates the specific comment for the specific blog entry'
    })
    @ApiImplicitParam({
        name: 'entryId',
        description: 'The ID of the blog entry the comment belongs to',
        required: true,
        type: 'string'
    })
    @ApiImplicitParam({
        name: 'commentId',
        description: 'The ID of the comment to be updated',
        required: true,
        type: 'string'
    })
    @ApiImplicitBody({
        name: 'UpdateCommentRequest',
        description: 'The request body should contain a single property "body" that holds the content for the comment',
        type: UpdateCommentRequest,
        required: true
    })
    @ApiResponse({
        status: 200,
        description: 'Indicates the comment was successfully updated. The response body will be empty.'
    })
    public async update(@User() user: IUser, @Comment() comment: IComment, @Body() body: UpdateCommentRequest, @Res() res) {
        if (user.id !== comment.userId) return res.status(HttpStatus.NOT_FOUND).send('Unable to find the comment.');
        await this.commentService.update(comment.id, body as IComment);
        return res.status(HttpStatus.OK).send();
    }

    @Delete('comments/:commentId')
    @ApiOperation({
        title: 'Delete Comment',
        description: 'Deletes a specific comment'
    })
    @ApiImplicitParam({
        name: 'entryId',
        description: 'The ID of the blog entry the comment belongs to',
        required: true,
        type: 'string'
    })
    @ApiImplicitParam({
        name: 'commentId',
        description: 'The ID of the comment to be deleted',
        required: true,
        type: 'string'
    })
    @ApiResponse({
        status: 200,
        description: 'Indicates the comment was successfully deleted. The response body will be empty.'
    })
    public async delete(@User() user: IUser, @Comment() comment: IComment, @Res() res) {
        if (user.id !== comment.userId) return res.status(HttpStatus.NOT_FOUND).send('Unable to find the comment.');
        await this.commentService.delete(comment.id);
        return res.status(HttpStatus.OK).send();
    }
}
