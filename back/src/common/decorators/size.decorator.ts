import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const Size = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.product;
  },
);
