# language: es
@login
Característica: Inicio de sesión en Sauce Demo
  Como cliente de Sauce Demo
  Quiero poder iniciar sesión en la aplicación
  Para poder acceder al catálogo de productos

  Antecedentes:
    Dado que el usuario está en la página de login

  @smoke @positivo
  Escenario: Login exitoso con credenciales válidas
    Cuando el usuario inicia sesión como "standard_user"
    Entonces debería ver la página de productos
    Y el título de la página debería ser "Products"

  @negativo
  Escenario: Login fallido con usuario bloqueado
    Cuando el usuario inicia sesión como "locked_out_user"
    Entonces debería ver un mensaje de error
    Y el mensaje de error debería contener "Sorry, this user has been locked out"

  @negativo
  Esquema del escenario: Login fallido con credenciales inválidas
    Cuando el usuario ingresa el usuario "<usuario>" y la contraseña "<password>"
    Entonces debería ver un mensaje de error
    Y el mensaje de error debería contener "<mensaje>"

    Ejemplos:
      | usuario         | password       | mensaje                                                            |
      | invalid_user    | wrong_password | Username and password do not match any user in this service       |
      | standard_user   | wrong_pass     | Username and password do not match any user in this service       |
      |                 | secret_sauce   | Username is required                                               |
      | standard_user   |                | Password is required                                              |
