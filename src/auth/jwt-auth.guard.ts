import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();

    try {
      const authHeader = req.headers.authorization;
      const [bearer, token] = authHeader.split(' ');

      if (bearer !== 'Bearer' || !token) throw new UnauthorizedException('You need to auth');

      console.log(token);

      const user = this.jwtService.verify(token);
      console.log('user', user);

      // req.user = user;

      return true;
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException('You need to auth');
    }
  }
}
