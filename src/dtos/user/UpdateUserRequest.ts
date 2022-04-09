import { IsOptional, IsString, IsEmail, Matches } from 'class-validator';

export class UpdateUserRequestDto {
    @IsOptional()
    @IsEmail()
    public email: string;

    @IsOptional()
    @IsString()
    @Matches(
        /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[*.!@$%&:;<>?_\-=+])[0-9a-zA-Z*.!@$%&:;<>?_\-=+]{8,20}$/,
        { message: 
            'The password must be at least 8 characters long and no more than 20 characters long, ' + 
            'it must contain a number, an uppercase letter, an lowercase letter and a special character !.*$%&:;<>,.?_+=-'
        }
    )
    public password: string;
}