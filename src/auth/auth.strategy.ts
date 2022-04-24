import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      // どこからトークンを取り出すか
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // 有効期限切れのトークンはエラーにする
      ignoreExpiration: false,
      secretOrKey: 'secret',
    });
  }
  // 必ず必要
  async validate(payload: JwtPayload) {
    // ほとんどpassportでバリデーションをしてくれている。
    return payload;
  }
}
