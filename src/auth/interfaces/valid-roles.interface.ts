/**
 * Roles disponibles en la aplicación.
 *
 * Los valores coinciden con los strings almacenados en `User.roles` y se usan
 * en los decoradores de autorización (`@Auth`, `@RoleProtected`, etc.).
 */
export enum ValidRoles {
    /** Acceso total, incluida la ejecución de tareas administrativas. */
    superAdmin = 'superAdmin',
    /** Acceso a funciones administrativas. */
    admin = 'admin',
    /** Usuario estándar autenticado. */
    user = 'user'
}