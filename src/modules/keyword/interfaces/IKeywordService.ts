import { Keyword } from '../keyword.entity';

export interface IKeywordService {
  findAll(): Promise<Array<Keyword>>;
}
