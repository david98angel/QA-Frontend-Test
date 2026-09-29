/**
 * Repositorio centralizado de credenciales de prueba.
 * Evita "magic strings" repartidos por los step definitions.
 */
export interface User {
  username: string;
  password: string;
}

export const USERS: Record<string, User> = {
  standard_user: { username: 'standard_user', password: 'secret_sauce' },
  locked_out_user: { username: 'locked_out_user', password: 'secret_sauce' },
  problem_user: { username: 'problem_user', password: 'secret_sauce' },
  performance_glitch_user: {
    username: 'performance_glitch_user',
    password: 'secret_sauce',
  },
  invalid_user: { username: 'invalid_user', password: 'wrong_password' },
};

/**
 * Devuelve las credenciales de un usuario por clave lógica.
 * Si la clave no existe se asume que se trata de un username directo
 * combinado con la contraseña estándar.
 */
export function getUser(key: string): User {
  return USERS[key] ?? { username: key, password: 'secret_sauce' };
}
