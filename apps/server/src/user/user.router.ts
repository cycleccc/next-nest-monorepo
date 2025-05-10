import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { UserGetDto } from './user.dto';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post('get')
    async get(@Body() input: UserGetDto) {
        return this.userService.get(input);
    }
}
