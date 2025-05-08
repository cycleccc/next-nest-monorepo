import { Injectable } from '@nestjs/common';
import type { UserLoginDtoType } from './user.dto';
import type { UserLoginResponse } from '@server/user/user.types';

@Injectable()
export class UserService {
    constructor(private readonly prismaService: PrismaService) {}

    async login(userLoginDto: UserLoginDtoType): Promise<UserLoginResponse> {
        const user = await this.prismaService.user.findFirst({
            where: {
                email: userLoginDto.email,
                deletedAt: null,
            },
            include: {
                roles: true,
            },
        });

        // update user lastLoggedInAt
        await this.prismaService.user.update({
            where: {
                id: user.id,
            },
            data: {
                lastLoggedInAt: new Date(),
            },
        });

        // return login response
        return {
            jwt,
            user,
        };
    }
}
