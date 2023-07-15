
import { Body, Controller, Get, HttpStatus, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthenticateDto } from './dto/authenticate.dto';
import { JwtAuthGuard } from 'src/jwt.guard';
import { Roles } from './roles/roles.decorator';
import { RoleGuard } from './role/role.guards';
import { Request, Response } from 'express'

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }
 
    @Post()

    login(@Res() res: Response, @Body() AuthenticateDto: AuthenticateDto) {
        try {
            const response = this.authService.authenticate(AuthenticateDto);
            return res.status(HttpStatus.OK).json({ response });
        }
        catch (error) {
            return res.status(error.status).json(error.response);
        }
    }

    @Roles('admin', 'customer')
    @UseGuards(JwtAuthGuard, RoleGuard)
    @Get()
    profile(@Req() req: Request, @Res() res: Response) 
    {
        return res.status(HttpStatus.OK).json(req.user);
    }
}
