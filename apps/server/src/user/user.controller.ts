import { Controller } from '@nestjs/common';
import { TsRestHandler, tsRestHandler } from '@ts-rest/nest';
import { UserService } from './user.service';
import { userContract } from '@ws/shared';

@Controller()
export class UserController {
    constructor(private readonly userService: UserService) {}

    @TsRestHandler(userContract.getUser)
    async getUser() {
        return tsRestHandler(userContract.getUser, async ({ body }) => {
            const user = await this.userService.get(body);

            if (!user) {
                return {
                    status: 404,
                    body: {
                        message: 'User not found',
                    },
                };
            }

            return {
                status: 200,
                body: user,
            };
        });
    }
}
