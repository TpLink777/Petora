
import { IsEmail, IsString, IsStrongPassword, MaxLength } from "class-validator"

export class LoginUserDto {

    @IsString()
    @IsEmail()
    email: string

    @IsString()
    @MaxLength(50)
    @IsStrongPassword(
        {
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1,
        },
        {
            message: `The password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.`,
        }
    )
    password: string

}
