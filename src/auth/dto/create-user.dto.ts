
import { IsEmail, IsString, IsStrongPassword, MaxLength, MinLength } from "class-validator"

/**
 * DTO para registrar un nuevo usuario.
 *
 * Las validaciones se ejecutan automáticamente gracias al `ValidationPipe`
 * global configurado en `main.ts`.
 */
export class CreateUserDto {

    /** Nombre completo; no puede estar vacío. */
    @IsString()
    @MinLength(1)
    fullName: string

    /** Email válido; debe ser único en la base de datos. */
    @IsString()
    @IsEmail()
    email: string

    /**
     * Contraseña segura de máximo 50 caracteres: mínimo 8, con al menos una
     * minúscula, una mayúscula, un número y un símbolo.
     */
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
