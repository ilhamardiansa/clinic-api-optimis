import { Injectable } from '@nestjs/common';
import { JwtService as service } from '@nestjs/jwt';

@Injectable()
export class JwtService {
  constructor(private readonly jwtService: service) {}

  async generateToken(payload: any): Promise<string> {
    return this.jwtService.sign(payload);
  }

  async verifyToken(token: string): Promise<any> {
    return this.jwtService.verify(token);
  }
}