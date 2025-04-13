import { BadRequestException, Injectable } from '@nestjs/common';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService
  ) {}


  async login(loginUserDto: LoginUserDto) {
    const {email, password} = loginUserDto;
    if(!(email == 'admin@admin.com' && password == '12345678')) {
      throw new BadRequestException('Invalid credentials');
    }

    return {
      token: this.getJwtToken(email),
    }
  }

  private getJwtToken(email: string) {
    const payload = { email };
    return this.jwtService.sign(payload);
  }
}
