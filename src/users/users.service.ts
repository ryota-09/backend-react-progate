import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './interfaces/user.interface';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async create(user: CreateUserDto) {
    const salt = await bcrypt.genSalt();

    const createdUser = new this.userModel({
      username: user.username,
      email: user.email,
      password: await bcrypt.hash(user.password, salt),
      avatar: '',
      remarks: '',
      beginnerStatus: false,
      htmlStatus: false,
      tsStatus: false,
    });
    return await createdUser.save();
  }

  async findAll() {
    return await this.userModel.find().exec();
  }

  async findOne(username: string) {
    const user = await this.userModel.findOne({ username: username }).exec();
    return user;
  }

  async update(username: string, updateUserDto: UpdateUserDto) {
    await this.userModel
      .updateOne({ username: username }, updateUserDto)
      .exec();
    const updatedUser = await this.userModel
      .findOne({ username: username })
      .exec();
    return updatedUser;
  }

  async remove(username: string) {
    await this.userModel.deleteOne({ username: username }).exec();
    return 'DELETE成功';
  }
}
