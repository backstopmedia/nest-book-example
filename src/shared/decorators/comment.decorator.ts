import { PipeTransform, createParamDecorator } from '@nestjs/common';

export const Comment: (
    data?: any,
    ...pipes: Array<PipeTransform<any>>
) => ParameterDecorator = createParamDecorator((data, req) => {
    return req.comment;
});
