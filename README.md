# bsale-challenge-back
Este proyecto es una Api rest demo realizada usando Node JS, entrega todos los productos agrupados, ideal para hacer paginación en el front, y también filtra los productos por nombre y su categoría, de acuerdo a los valores de sus parámetros.

## Pre-requisitos
- Node v16.14.2

## Instalación
- Ejecuta en la terminal `npm install`

## Configuración
debes crear un archivo `.env` y agregarle los parametros especificados en el archivo `.example.env`
```
PORT=
HOST=
USER=
PASSWORD=
DATABASE=
DIALECT=
BACKEND_URL=
```
- El puerto, es el número de slot disponible en tu equipo para levantar el backend (3000, 5000, 4200, 8000, etc)
- Host, user, password, database, son las configuraciones propias para conectarte a la base de datos
- Dialect, tipo de base de datos relacional (postgrees, mysql, etc)
- backend_url, es la url del backend en sí; puedes usar local o de producción, este parámetro es util para servir una imagen por defecto cuando un producto NO tiene una url imagen específica. 

## Ejecutar la aplicación localmente
Hay de dos formas, ejecutando en la terminal:
- `nodemon app`
- `npm start`

Si estas en modo desarrollo, recomiendo usar la primera opción, para que al hacer cualquier cambio, el local server reinicie automáticamente.

# Endpoints:

## GET Categorías
`GET https://marv-bsale.herokuapp.com/api/categories` retornará todas las categorías existentes de los productos.

**Parámetros:**
Ninguno

**Ejemplo:**
`GET https://marv-bsale.herokuapp.com/api/categories`

Respuesta:
```json
[
    {
        "id": 1,
        "name": "bebida energetica"
    },
    {
        "id": 2,
        "name": "pisco"
    },
    {
        "id": 3,
        "name": "ron"
    },
    {
        "id": 4,
        "name": "bebida"
    },
    {
        "id": 5,
        "name": "snack"
    },
    {
        "id": 6,
        "name": "cerveza"
    },
    {
        "id": 7,
        "name": "vodka"
    }
]
```


## GET Productos
`GET https://marv-bsale.herokuapp.com/api/products` retornará todas los productos existentes, en formato json para paginación.

**Parámetros:**
- page - Ocional, indica la página actual de la navegación, por defecto es 0
- size - Opcional, limita la cantidad de items de la respuesta JSON, por defecto es 8.
- category - Opcional, Permite filtrar los productos por categoría, se le asigna algún categoryId existente.
- search - Opcional, permite buscar productos por su nombre, se le asigna cualquier cadena de texto.

**Ejemplos:**
- `GET https://marv-bsale.herokuapp.com/api/products?page=0&search=pisco`
- `GET https://marv-bsale.herokuapp.com/api/products?size=8&category=2`
- `GET https://marv-bsale.herokuapp.com/api/products?page=0&category=2`

**Nota:** *No se puede usar los parametros search y category en una misma url.*

Respuesta, el primer url de los ejemplos devuelve lo siguiente:
```json
{
    "totalItems": 21,
    "totalPages": 3,
    "currentPage": 0,
    "products": [
        {
            "id": 8,
            "name": "PISCO ALTO DEL CARMEN 35º",
            "url_image": "https://dojiw2m9tvv09.cloudfront.net/11132/product/alto8532.jpg",
            "price": 7990,
            "discount": 10,
            "category": 2,
            "categoria": {
                "id": 2,
                "name": "pisco"
            }
        },
        {
            "id": 9,
            "name": "PISCO ALTO DEL CARMEN 40º ",
            "url_image": "https://dojiw2m9tvv09.cloudfront.net/11132/product/alto408581.jpg",
            "price": 5990,
            "discount": 0,
            "category": 2,
            "categoria": {
                "id": 2,
                "name": "pisco"
            }
        },
        {
            "id": 10,
            "name": "PISCO ARTESANOS 35º ",
            "url_image": "https://dojiw2m9tvv09.cloudfront.net/11132/product/artesanos8818.jpg",
            "price": 3990,
            "discount": 0,
            "category": 2,
            "categoria": {
                "id": 2,
                "name": "pisco"
            }
        },
        {
            "id": 11,
            "name": "PISCO BAUZA 40º ",
            "url_image": "https://dojiw2m9tvv09.cloudfront.net/11132/product/bauza408831.jpg",
            "price": 4990,
            "discount": 0,
            "category": 2,
            "categoria": {
                "id": 2,
                "name": "pisco"
            }
        },
        {
            "id": 12,
            "name": "PISCO CAMPANARIO 35º",
            "url_image": "https://dojiw2m9tvv09.cloudfront.net/11132/product/campanario8845.jpg",
            "price": 2990,
            "discount": 20,
            "category": 2,
            "categoria": {
                "id": 2,
                "name": "pisco"
            }
        },
        {
            "id": 13,
            "name": "PISCO CAMPANARIO 40º",
            "url_image": "https://dojiw2m9tvv09.cloudfront.net/11132/product/campanario408881.jpg",
            "price": 3990,
            "discount": 20,
            "category": 2,
            "categoria": {
                "id": 2,
                "name": "pisco"
            }
        },
        {
            "id": 14,
            "name": "PISCO ESPIRITU DEL ELQUI 40º",
            "url_image": "https://dojiw2m9tvv09.cloudfront.net/11132/product/espiritu8936.jpg",
            "price": 5990,
            "discount": 20,
            "category": 2,
            "categoria": {
                "id": 2,
                "name": "pisco"
            }
        },
        {
            "id": 15,
            "name": "PISCO ESPIRITU DEL ELQUI 45º",
            "url_image": "https://dojiw2m9tvv09.cloudfront.net/11132/product/espiritu8957.jpg",
            "price": 6990,
            "discount": 5,
            "category": 2,
            "categoria": {
                "id": 2,
                "name": "pisco"
            }
        }
    ]
}
```

## GET Default Image
`GET https://marv-bsale.herokuapp.com/api/images/no-image.jpg` 
Retornará una imagen por defecto, es usada cuando un producto tiene una url de imagen vacía o null.

**Parámetros:**
Ninguno
