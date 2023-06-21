import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from './entities/user.entity';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async generateToken(user: User): Promise<string> {
    const payload = { id: user.id };
    const secretKey = 'funca'; // Reemplaza esto con tu propia clave secreta

    const token = await this.jwtService.signAsync(payload, { secret: secretKey });

    return token;
  }

  async verifyToken(token: string): Promise<any> {
    try {
      return this.jwtService.verifyAsync(token);
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
