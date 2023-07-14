import { Injectable, NotFoundException } from '@nestjs/common';
import { IAuthenticate, Role } from './interface/user.interface';
import { sign } from 'jsonwebtoken';
import { faker } from '@faker-js/faker'
import { AuthenticateDto } from './dto/authenticate.dto';

@Injectable()
export class AuthService {

    users = [
        {
           id: faker.datatype.uuid(), 
            userName: 'Geo',
            password: 'q1w2e3',
            role: Role.Admin,
        },
        {
            id: faker.datatype.uuid(),
            userName: 'Josh',
            password: 'r4t5y6',
            role: Role.Customer,
        },
    ];

    authenticate(authenticateDto: AuthenticateDto): IAuthenticate {
        const user = this.users.find(
            (u) =>
                u.userName === authenticateDto.userName
                &&
                u.password === authenticateDto.password,
        );

        if (!user) throw new NotFoundException('Invalid credentials');

        const token = sign({ ...user }, 'secrete');

        return  { token, user }
    }
}
