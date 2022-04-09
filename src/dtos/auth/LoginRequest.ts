import { IsNotEmpty, IsString } from 'class-validator';

export class LoginRequestDto {
    @IsNotEmpty()
    @IsString()
    public email: string;

    @IsNotEmpty()
    @IsString()
    public password: string;
}