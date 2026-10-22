
/**
 * Forma de un usuario dentro de los datos del seed.
 *
 * La contraseña debe venir ya hasheada, porque el seed guarda los usuarios
 * directamente en el repositorio sin pasar por `AuthService`.
 */
export interface SeedUser {
    /** Nombre completo del usuario. */
    fullName: string
    /** Email único del usuario. */
    email:    string
    /** Contraseña hasheada con bcrypt. */
    password: string
    /** Roles asignados (`superAdmin`, `admin`, `user`). */
    roles:    string[]
}