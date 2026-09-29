# language: es
@cart
Característica: Gestión del carrito de compras
  Como cliente autenticado de Sauce Demo
  Quiero agregar y revisar productos en mi carrito
  Para preparar mi compra

  Antecedentes:
    Dado que el usuario ha iniciado sesión como "standard_user"
    Y está en la página de productos

  @smoke
  Escenario: Agregar un producto al carrito
    Cuando el usuario agrega el producto "Sauce Labs Backpack" al carrito
    Entonces el contador del carrito debería mostrar "1"

  Escenario: Ver un producto agregado dentro del carrito
    Cuando el usuario agrega el producto "Sauce Labs Backpack" al carrito
    Y el usuario abre el carrito
    Entonces el carrito debería contener el producto "Sauce Labs Backpack"
    Y el carrito debería tener 1 productos

  Escenario: Agregar múltiples productos al carrito
    Cuando el usuario agrega el producto "Sauce Labs Backpack" al carrito
    Y el usuario agrega el producto "Sauce Labs Bike Light" al carrito
    Y el usuario abre el carrito
    Entonces el carrito debería contener el producto "Sauce Labs Backpack"
    Y el carrito debería contener el producto "Sauce Labs Bike Light"
    Y el carrito debería tener 2 productos

  Escenario: Eliminar un producto del carrito
    Cuando el usuario agrega el producto "Sauce Labs Backpack" al carrito
    Y el usuario elimina el producto "Sauce Labs Backpack" del carrito
    Entonces el contador del carrito debería estar vacío
