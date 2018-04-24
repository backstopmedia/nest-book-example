import { checkLoggedInUserGuard } from '../../shared/guards/checkLoggedInUser.guard';
import { Comment } from '../../shared/decorators/comment.decorator';
import { CommentService } from './comment.service';
import { Controller, Get, Post, Put, Delete, HttpStatus, Res, Body, Param, UseGuards } from '@nestjs/common';
import { IComment } from './interfaces';
import { IUser } from '../user/interfaces';
import { User } from '../../shared/decorators/user.decorator';

@Controller('entries/:entryId')
export class CommentController {
    constructor(private readonly commentService: CommentService) { }

    @Get('comments')
    public async index(@User() user: IUser, @Param('entryId') entryId: number, @Res() res) {
        const comments = await this.commentService.findAll({ where: { entryId }});
        return res.status(HttpStatus.OK).json(comments);
    }

    @Post('comments')
    public async create(@User() user: IUser,  @Param('entryId') entryId: number, @Body() body: any, @Res() res) {
        if (!body || (body && Object.keys(body).length === 0)) return res.status(HttpStatus.BAD_REQUEST).send('Missing body.');

        const comment: IComment = { ...body, userId: user.id, entryId };
        await this.commentService.create(comment);

        return res.status(HttpStatus.CREATED).send();
    }

    @Get('comments/:commentId')
    public async show(@User() user: IUser, @Comment() comment: IComment, @Res() res) {
        return res.status(HttpStatus.OK).json(comment);
    }

    @Put('comments/:commentId')
    public async update(@User() user: IUser, @Comment() comment: IComment, @Body() body: any, @Res() res) {
        if (user.id != comment.userId) return res.status(HttpStatus.NOT_FOUND).send('Unable to find the comment.');
        await this.commentService.update(comment.id, body);
        return res.status(HttpStatus.OK).send();
    }

    @Delete('comments/:commentId')
    public async delete(@User() user: IUser, @Comment() comment: IComment, @Res() res) {
        if (user.id != comment.userId) return res.status(HttpStatus.NOT_FOUND).send('Unable to find the comment.');
        await this.commentService.delete(comment.id);
        return res.status(HttpStatus.OK).send();
    }
}
