
import { Body, Controller, Get, HttpStatus, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthenticateDto } from './dto/authenticate.dto';
import { JwtAuthGuard } from 'src/jwt.guard';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @UseGuards(JwtAuthGuard)
    @Get()
    profile(@Req() req,@Res() res){
    return res.status(HttpStatus.OK).json(req.user);
}
    @Post()

    login(@Res() res, @Body() AuthenticateDto: AuthenticateDto) {
        try {
            const response = this.authService.authenticate(AuthenticateDto);
            return res.status(HttpStatus.OK).json({ response });
        }
        catch (error) {
            return res.status(error.status).json(error.response);
        }
    }
}
