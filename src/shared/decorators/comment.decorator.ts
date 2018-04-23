import { PipeTransform, createRouteParamDecorator } from '@nestjs/common';

export const Comment: (
    data?: any,
    ...pipes: Array<PipeTransform<any>>
) => ParameterDecorator = createRouteParamDecorator((data, req) => {
    return req.comment;
});