import { Injectable, CanActivate, ExecutionContext, HttpException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/entity/profile/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from 'src/entity/role.entity';
import { format_json } from 'src/env';
import { Response } from 'express';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly jwtService: JwtService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }
    
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();
    const token = request.headers.authorization?.split(' ')[1]; 
    if (!token) {
      this.throwFormattedException(response, 400, 'Token not found', 'UnauthorizedException');
      return false;
    }

    try {
      const decodedToken = this.jwtService.verify(token);
      const user = await this.findUserById(decodedToken.userId);

      if (!user || !user.role_id) {
        this.throwFormattedException(response, 403, 'Access denied', 'ForbiddenException');
        return false;
      }

      const userRoles = await Promise.all(roles.map(roleName => this.findRole(roleName)));
      const userRoleIds = userRoles.map(role => role.id);

      const hasRole = userRoleIds.includes(user.role_id);
      if (!hasRole) {
        this.throwFormattedException(response, 403, 'Access denied', 'ForbiddenException');
        return false;
      }
      return hasRole;
    } catch (error) {
      this.throwFormattedException(response, 400, 'Invalid token', 'UnauthorizedException');
      return false;
    }
  }

  async findUserById(userId: number): Promise<User> {
    return this.userRepository.findOne({ where: { id: userId } });
  }

  async findRole(role: string): Promise<Role> {
    return this.roleRepository.findOne({ where: { name: role } });
  }

  private throwFormattedException(response: Response, status: number, message: string, exceptionType: string) {
    const formattedResponse = format_json(
      status,
      false,
      message,
      null,
      message,
      null,
    );
    response.status(status).json(formattedResponse);
  }
}
