// import { Injectable } from '@nestjs/common';
// import { AuthGuard } from '@nestjs/passport';

// @Injectable()
// export class JwtAuthGuard extends AuthGuard('jwt') {}
// src/auth/jwt-auth.guard.ts

// import {
//   Injectable,
//   ExecutionContext,
//   UnauthorizedException,
// } from '@nestjs/common';
// import { AuthGuard } from '@nestjs/passport';
// import { Reflector } from '@nestjs/core';
// import { IS_PUBLIC_KEY } from '../public.decorator';


// @Injectable()
// export class JwtAuthGuard extends AuthGuard('jwt') {
//   constructor(private reflector: Reflector) {
//     super();
//   }

//   canActivate(context: ExecutionContext) {
//     // allow skipping auth if route is marked @Public()
//     const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
//       context.getHandler(),
//       context.getClass(),
//     ]);
//     if (isPublic) {
//       return true;
//     }
//     return super.canActivate(context);
//   }

//   handleRequest(err: any, user: any) {
//     if (err || !user) {
//       throw new UnauthorizedException('Invalid or missing token');
//     }
//     return user;
//   }
// }
import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) return true;
    return super.canActivate(context);
  }

  handleRequest(err: any, user: any) {
    if (err || !user) {
      throw new UnauthorizedException('Invalid or missing token');
    }
    return user;
  }
}
