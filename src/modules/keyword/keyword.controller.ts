import { Controller, Get, HttpStatus, Param, Query, Res } from '@nestjs/common';
import { KeywordService } from './keyword.service';

@Controller()
export class KeywordController {
    constructor(private readonly keywordService: KeywordService) {}

    @Get('keywords')
    public async index(
        @Query('search') search: string,
        @Query('limit') limit: string,
        @Res() res
    ) {
        const keywords = await this.keywordService.findAll(
            search,
            Number(limit)
        );
        return res.status(HttpStatus.OK).json(keywords);
    }

    @Get('keywords/hot')
    public async hot(@Res() res) {
        const keywords = await this.keywordService.findHotLinks();
        return res.status(HttpStatus.OK).json(keywords);
    }

    @Get('keywords/:keywordId')
    public async show(@Param('keywordId') keywordId: string, @Res() res) {
        const keyword = await this.keywordService.findById(Number(keywordId));
        return res.status(HttpStatus.OK).json(keyword);
    }
}
