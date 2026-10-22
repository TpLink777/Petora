
import { IsEmail, IsString, IsStrongPassword, MaxLength } from "class-validator"

/**
 * DTO para iniciar sesión.
 *
 * Solo se solicitan email y contraseña. Las reglas de contraseña coinciden
 * con las de registro para mantener la misma política de seguridad.
 */
export class LoginUserDto {

    /** Email válido del usuario. */
    @IsString()
    @IsEmail()
    email: string

    /** Contraseña del usuario (mismas reglas que en el registro). */
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
