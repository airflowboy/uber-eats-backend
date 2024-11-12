import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateAccountInput } from './dtos/create-account.dto';
import { LoginInput } from './dtos/login.dto';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly users: Repository<User>,
  ) {}

  async createAccount(createAccountInput: CreateAccountInput): Promise<{ok: boolean, error?: string}> {
    try {
      const exists = await this.users.findOne({
        where: { email: createAccountInput.email },
      });
      if (exists) {
        return {ok: false, error: 'Already Exists!!'};
      }
      await this.users.save(this.users.create(createAccountInput));
      return {ok: true};
    } catch (e) {
      return {ok: false, error: 'Could not create account.'};
    }
  }

  async login(loginInput: LoginInput): Promise<{ok: boolean, error?: string, token?: string}> {
    // 1. 유저 조회
    try {
      const user = await this.users.findOne({
        where: {email: loginInput.email},
      })
      if(!user) {
        return {ok: false, error: "User not found"};
      }
      // 2. 유저 비밀번호 확인
      const passwordCorrect = await user.checkPassword(loginInput.password);
      if(!passwordCorrect) {
        return {ok: false, error: "Wrong password"};
      }
      return {ok: true, token: "token"};
      // 3. 토큰 생성
    }catch(e) {
      return {ok: false, error: e.message};
    }
  }
}
