import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdateBeginnerStatusDto } from './dto/update-beginnerstaus.dto';
import { UpdateHtmlStatusDto } from './dto/update-htmlstaus.dto';
import { UpdateTsStatusDto } from './dto/update-tsstaus.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':username')
  @UseGuards(AuthGuard('jwt'))
  findOne(@Param('username') username: string) {
    return this.usersService.findOne(username);
  }

  @Patch(':username')
  update(
    @Param('username') username: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(username, updateUserDto);
  }

  @Patch('beginnerstatus/:username')
  updateBeginnerStatus(
    @Param('username') username: string,
    @Body() updateBeginnerStatus: UpdateBeginnerStatusDto,
  ) {
    return this.usersService.updateBeginnerStatus(
      username,
      updateBeginnerStatus,
    );
  }

  @Patch('htmlstatus/:username')
  updateHtmlStatus(
    @Param('username') username: string,
    @Body() updateHtmlStatus: UpdateHtmlStatusDto,
  ) {
    return this.usersService.updateHtmlStatus(username, updateHtmlStatus);
  }

  @Patch('tsstatus/:username')
  updateTsStatus(
    @Param('username') username: string,
    @Body() updateTsStatus: UpdateTsStatusDto,
  ) {
    return this.usersService.updateTsStatus(username, updateTsStatus);
  }

  @Delete(':username')
  remove(@Param('username') username: string) {
    return this.usersService.remove(username);
  }
}
