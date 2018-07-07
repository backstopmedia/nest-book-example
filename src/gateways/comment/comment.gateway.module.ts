import { CommentGateway } from './comment.gateway';
import { CommentModule } from '../../modules/comment/comment.module';
import { Module } from '@nestjs/common';
import { UserModule } from '../../modules/user/user.module';

@Module({
    imports: [UserModule, CommentModule],
    providers: [CommentGateway]
})
export class CommentGatewayModule {}
