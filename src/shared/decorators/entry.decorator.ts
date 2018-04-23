import { PipeTransform, createRouteParamDecorator } from '@nestjs/common';

export const Entry: (
    data?: any,
    ...pipes: Array<PipeTransform<any>>
) => ParameterDecorator = createRouteParamDecorator((data, req) => {
    return req.entry;
});