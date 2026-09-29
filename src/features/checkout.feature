# language: es
@checkout
Característica: Proceso de compra (checkout)
  Como cliente autenticado de Sauce Demo
  Quiero completar el proceso de compra
  Para adquirir los productos que necesito

  Antecedentes:
    Dado que el usuario ha iniciado sesión como "standard_user"
    Y está en la página de productos

  @smoke @e2e
  Escenario: Completar una compra hasta la confirmación
    Cuando el usuario agrega el producto "Sauce Labs Backpack" al carrito
    Y el usuario abre el carrito
    Y el usuario procede al checkout
    Y el usuario ingresa la información "David" "Lopez" "15001"
    Y el usuario finaliza la compra
    Entonces debería ver la confirmación de compra "Thank you for your order!"

  @e2e
  Escenario: Comprar varios productos hasta la confirmación
    Cuando el usuario agrega el producto "Sauce Labs Backpack" al carrito
    Y el usuario agrega el producto "Sauce Labs Bolt T-Shirt" al carrito
    Y el usuario abre el carrito
    Y el usuario procede al checkout
    Y el usuario ingresa la información "Ana" "Torres" "15002"
    Y el usuario finaliza la compra
    Entonces debería ver la confirmación de compra "Thank you for your order!"

  @negativo
  Esquema del escenario: Checkout con información incompleta
    Cuando el usuario agrega el producto "Sauce Labs Backpack" al carrito
    Y el usuario abre el carrito
    Y el usuario procede al checkout
    Y el usuario ingresa la información "<nombre>" "<apellido>" "<zip>"
    Entonces debería ver un error de checkout que contenga "<mensaje>"

    Ejemplos:
      | nombre | apellido | zip   | mensaje                      |
      |        | Lopez    | 15001 | First Name is required       |
      | David  |          | 15001 | Last Name is required        |
      | David  | Lopez    |       | Postal Code is required      |
