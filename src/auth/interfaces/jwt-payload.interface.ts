/**
 * Contenido que se firma dentro del token JWT.
 *
 * Solo se incluye el `id` del usuario; el resto de sus datos se consulta en la
 * base de datos cuando `JwtStrategy.validate` procesa el token.
 */
export interface JwtPayload {
    id: string
}