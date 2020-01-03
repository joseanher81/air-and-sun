## AirSun
**AirSun** es una aplicación móvil que proporciona al usuario, de manera clara y sencilla, información sobre el **índice de contaminación atmosférica** y el **índice de radiación ultravioleta**. La aplicación utiliza el GPS del dispositivo y varios servicios REST para obtener información en tiempo real de estos valores medioambientales en la localización del usuario. Además, permite al usuario configurar alertas para recibir notificaciones cuando los índices sobrepasen el valor máximo determinado para una localización establecida.

## Pantallas
### Principal
La información principal sobre el índice de contaminación atmosférica y el índice de radiación ultravioleta se muestra en la pantalla principal de la aplicación. Los valores se informan mediante un índice numérico, el icono de un rostro y un color de fondo significativo, que varían según la gravedad del índice medido.

![Captura de pantalla 2020-01-03 21 20 07](https://user-images.githubusercontent.com/23436377/71747037-e7e44b00-2e6e-11ea-98db-0b5637e36e3b.png)

### Crear Alerta
La navegación en la aplicación se realiza mediante un sistema de tabs que nos permite desplazarnos a las pantallas de creación de nueva alerta y de listado de alertas existentes.

La creación de una alerta nueva es un proceso muy sencillo. Tan sólo hay que rellenar en los campos correspondientes el nombre del lugar para el que se quiere establecer la alerta, el valor del índice a partir del cual enviar una notificación al usuario y el factor medioambiental a medir.

![Captura de pantalla 2020-01-03 21 22 37](https://user-images.githubusercontent.com/23436377/71747138-2ed24080-2e6f-11ea-9eb5-9f42f195da5d.png)

### Lista de Alertas

En la pantalla de alertas encontraremos un listado con las alertas almacenadas en la memoria del dispositivo. Deslizando un dedo sobre uno de los elementos de la lista aparecerán las opciones para editar y borrar la alerta seleccionada.

![Captura de pantalla 2020-01-03 21 24 09](https://user-images.githubusercontent.com/23436377/71747232-6640ed00-2e6f-11ea-8b4e-eb29e1bdcfbe.png)

## Notificaciones

Si en algún momento el usuario se desplaza a una localización para la cual existe una alerta y se cumplen las condiciones medioambientales establecidas, se avisará al usuario mediante una notificación.

![Captura de pantalla 2020-01-03 21 25 30](https://user-images.githubusercontent.com/23436377/71747292-938d9b00-2e6f-11ea-865d-49aa814d3855.png)