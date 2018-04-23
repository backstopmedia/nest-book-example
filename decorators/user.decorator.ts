import { PipeTransform, createRouteParamDecorator } from '@nestjs/common';

export const User: (
    data?: any,
    ...pipes: Array<PipeTransform<any>>
) => ParameterDecorator = createRouteParamDecorator((data, req) => {
    return req.user;
});