
import { SeedProduct } from "../interfaces/seed-product.interface.js";


export const initialData: { products: SeedProduct[] } = {
    products: [
        {
            title: 'Croquetas de pollo para perro adulto 2 kg',
            price: 18,
            description: 'Alimento seco de pollo para perros adultos. Presentación de 2 kg.',
            slug: 'croquetas-pollo-perro-adulto-2kg',
            stock: 35,
            type: 'alimentos',
            tags: ['perros', 'alimento-seco', 'adultos'],
            images: [
                'croquetas-pollo-perro-adulto-2kg-1.jpg',
                'croquetas-pollo-perro-adulto-2kg-2.jpg',
            ]
        },
        {
            title: 'Croquetas de pollo para perro adulto 8 kg',
            price: 56,
            description: 'Alimento seco de pollo para perros adultos. Presentación de 8 kg.',
            slug: 'croquetas-pollo-perro-adulto-8kg',
            stock: 18,
            type: 'alimentos',
            tags: ['perros', 'alimento-seco', 'adultos'],
            images: [
                'croquetas-pollo-perro-adulto-8kg-1.jpg',
                'croquetas-pollo-perro-adulto-8kg-2.jpg',
            ]
        },
        {
            title: 'Croquetas de cordero para perro adulto 2 kg',
            price: 21,
            description: 'Alimento seco de cordero para perros adultos. Presentación de 2 kg.',
            slug: 'croquetas-cordero-perro-adulto-2kg',
            stock: 22,
            type: 'alimentos',
            tags: ['perros', 'alimento-seco', 'adultos'],
            images: [
                'croquetas-cordero-perro-adulto-2kg-1.jpg',
                'croquetas-cordero-perro-adulto-2kg-2.jpg',
            ]
        },
        {
            title: 'Croquetas de salmón para perro adulto 8 kg',
            price: 69,
            description: 'Alimento seco de salmón para perros adultos. Presentación de 8 kg.',
            slug: 'croquetas-salmon-perro-adulto-8kg',
            stock: 14,
            type: 'alimentos',
            tags: ['perros', 'alimento-seco', 'adultos'],
            images: [
                'croquetas-salmon-perro-adulto-8kg-1.jpg',
                'croquetas-salmon-perro-adulto-8kg-2.jpg',
            ]
        },
        {
            title: 'Croquetas para cachorro raza pequeña 2 kg',
            price: 20,
            description: 'Alimento seco formulado para cachorros de razas pequeñas. Presentación de 2 kg.',
            slug: 'croquetas-cachorro-raza-pequena-2kg',
            stock: 27,
            type: 'alimentos',
            tags: ['perros', 'alimento-seco', 'cachorros'],
            images: [
                'croquetas-cachorro-raza-pequena-2kg-1.jpg',
                'croquetas-cachorro-raza-pequena-2kg-2.jpg',
            ]
        },
        {
            title: 'Croquetas para cachorro raza mediana 4 kg',
            price: 34,
            description: 'Alimento seco para cachorros de razas medianas. Presentación de 4 kg.',
            slug: 'croquetas-cachorro-raza-mediana-4kg',
            stock: 19,
            type: 'alimentos',
            tags: ['perros', 'alimento-seco', 'cachorros'],
            images: [
                'croquetas-cachorro-raza-mediana-4kg-1.jpg',
                'croquetas-cachorro-raza-mediana-4kg-2.jpg',
            ]
        },
        {
            title: 'Croquetas para perro senior 2 kg',
            price: 23,
            description: 'Alimento seco pensado para perros de edad avanzada. Presentación de 2 kg.',
            slug: 'croquetas-perro-senior-2kg',
            stock: 16,
            type: 'alimentos',
            tags: ['perros', 'alimento-seco', 'senior'],
            images: [
                'croquetas-perro-senior-2kg-1.jpg',
                'croquetas-perro-senior-2kg-2.jpg',
            ]
        },
        {
            title: 'Alimento húmedo de pollo para perro 400 g',
            price: 4,
            description: 'Lata de alimento húmedo sabor pollo para perros. Contenido de 400 g.',
            slug: 'alimento-humedo-pollo-perro-400g',
            stock: 50,
            type: 'alimentos',
            tags: ['perros', 'alimento-humedo'],
            images: [
                'alimento-humedo-pollo-perro-400g-1.jpg',
                'alimento-humedo-pollo-perro-400g-2.jpg',
            ]
        },
        {
            title: 'Alimento húmedo de res para perro 400 g',
            price: 4,
            description: 'Lata de alimento húmedo sabor res para perros. Contenido de 400 g.',
            slug: 'alimento-humedo-res-perro-400g',
            stock: 38,
            type: 'alimentos',
            tags: ['perros', 'alimento-humedo'],
            images: [
                'alimento-humedo-res-perro-400g-1.jpg',
                'alimento-humedo-res-perro-400g-2.jpg',
            ]
        },
        {
            title: 'Paté de pavo para cachorro 150 g',
            price: 3,
            description: 'Porción de alimento húmedo sabor pavo para cachorros. Contenido de 150 g.',
            slug: 'pate-pavo-cachorro-150g',
            stock: 32,
            type: 'alimentos',
            tags: ['perros', 'alimento-humedo', 'cachorros'],
            images: [
                'pate-pavo-cachorro-150g-1.jpg',
                'pate-pavo-cachorro-150g-2.jpg',
            ]
        },
        {
            title: 'Galletas de avena para perro 250 g',
            price: 6,
            description: 'Premios horneados de avena para ofrecer durante el entrenamiento. Bolsa de 250 g.',
            slug: 'galletas-avena-perro-250g',
            stock: 40,
            type: 'snacks',
            tags: ['perros', 'galletas', 'entrenamiento'],
            images: [
                'galletas-avena-perro-250g-1.jpg',
                'galletas-avena-perro-250g-2.jpg',
            ]
        },
        {
            title: 'Bocaditos de pollo para perro 150 g',
            price: 7,
            description: 'Pequeños bocaditos sabor pollo para premiar a tu perro. Bolsa de 150 g.',
            slug: 'bocaditos-pollo-perro-150g',
            stock: 29,
            type: 'snacks',
            tags: ['perros', 'premios', 'entrenamiento'],
            images: [
                'bocaditos-pollo-perro-150g-1.jpg',
                'bocaditos-pollo-perro-150g-2.jpg',
            ]
        },
        {
            title: 'Tiras de salmón para perro 100 g',
            price: 9,
            description: 'Tiras masticables sabor salmón para perros. Bolsa de 100 g.',
            slug: 'tiras-salmon-perro-100g',
            stock: 24,
            type: 'snacks',
            tags: ['perros', 'premios', 'masticables'],
            images: [
                'tiras-salmon-perro-100g-1.jpg',
                'tiras-salmon-perro-100g-2.jpg',
            ]
        },
        {
            title: 'Palitos dentales para perro pequeño 14 unidades',
            price: 10,
            description: 'Paquete de 14 palitos masticables para perros pequeños.',
            slug: 'palitos-dentales-perro-pequeno-14u',
            stock: 31,
            type: 'snacks',
            tags: ['perros', 'masticables', 'higiene-dental'],
            images: [
                'palitos-dentales-perro-pequeno-14u-1.jpg',
                'palitos-dentales-perro-pequeno-14u-2.jpg',
            ]
        },
        {
            title: 'Palitos dentales para perro grande 14 unidades',
            price: 14,
            description: 'Paquete de 14 palitos masticables para perros grandes.',
            slug: 'palitos-dentales-perro-grande-14u',
            stock: 17,
            type: 'snacks',
            tags: ['perros', 'masticables', 'higiene-dental'],
            images: [
                'palitos-dentales-perro-grande-14u-1.jpg',
                'palitos-dentales-perro-grande-14u-2.jpg',
            ]
        },
        {
            title: 'Pelota de caucho para perro pequeña',
            price: 8,
            description: 'Pelota de caucho para juegos de lanzar y recoger con perros pequeños.',
            slug: 'pelota-caucho-perro-pequena',
            stock: 42,
            type: 'juguetes',
            tags: ['perros', 'pelotas', 'juego'],
            images: [
                'pelota-caucho-perro-pequena-1.jpg',
                'pelota-caucho-perro-pequena-2.jpg',
            ]
        },
        {
            title: 'Pelota de caucho para perro grande',
            price: 12,
            description: 'Pelota de caucho de tamaño grande para juegos al aire libre.',
            slug: 'pelota-caucho-perro-grande',
            stock: 25,
            type: 'juguetes',
            tags: ['perros', 'pelotas', 'juego'],
            images: [
                'pelota-caucho-perro-grande-1.jpg',
                'pelota-caucho-perro-grande-2.jpg',
            ]
        },
        {
            title: 'Cuerda de algodón con dos nudos',
            price: 9,
            description: 'Cuerda de algodón con dos nudos para juegos de tirar con perros.',
            slug: 'cuerda-algodon-dos-nudos-perro',
            stock: 34,
            type: 'juguetes',
            tags: ['perros', 'cuerdas', 'juego'],
            images: [
                'cuerda-algodon-dos-nudos-perro-1.jpg',
                'cuerda-algodon-dos-nudos-perro-2.jpg',
            ]
        },
        {
            title: 'Disco volador flexible para perro',
            price: 13,
            description: 'Disco flexible para juegos de lanzar y recoger en espacios abiertos.',
            slug: 'disco-volador-flexible-perro',
            stock: 21,
            type: 'juguetes',
            tags: ['perros', 'aire-libre', 'juego'],
            images: [
                'disco-volador-flexible-perro-1.jpg',
                'disco-volador-flexible-perro-2.jpg',
            ]
        },
        {
            title: 'Juguete de peluche con forma de pato',
            price: 11,
            description: 'Peluche con forma de pato para juego supervisado con perros.',
            slug: 'juguete-peluche-pato-perro',
            stock: 20,
            type: 'juguetes',
            tags: ['perros', 'peluches', 'juego'],
            images: [
                'juguete-peluche-pato-perro-1.jpg',
                'juguete-peluche-pato-perro-2.jpg',
            ]
        },
        {
            title: 'Juguete rellenable para perro pequeño',
            price: 15,
            description: 'Juguete hueco que puede rellenarse con bocaditos para perros pequeños.',
            slug: 'juguete-rellenable-perro-pequeno',
            stock: 28,
            type: 'juguetes',
            tags: ['perros', 'interactivos', 'juego'],
            images: [
                'juguete-rellenable-perro-pequeno-1.jpg',
                'juguete-rellenable-perro-pequeno-2.jpg',
            ]
        },
        {
            title: 'Juguete rellenable para perro grande',
            price: 19,
            description: 'Juguete hueco de tamaño grande que puede rellenarse con premios.',
            slug: 'juguete-rellenable-perro-grande',
            stock: 13,
            type: 'juguetes',
            tags: ['perros', 'interactivos', 'juego'],
            images: [
                'juguete-rellenable-perro-grande-1.jpg',
                'juguete-rellenable-perro-grande-2.jpg',
            ]
        },
        {
            title: 'Collar ajustable azul para perro pequeño',
            price: 10,
            description: 'Collar de nylon ajustable en color azul para perros pequeños.',
            slug: 'collar-ajustable-azul-perro-pequeno',
            stock: 26,
            type: 'accesorios',
            tags: ['perros', 'collares', 'paseo'],
            images: [
                'collar-ajustable-azul-perro-pequeno-1.jpg',
                'collar-ajustable-azul-perro-pequeno-2.jpg',
            ]
        },
        {
            title: 'Collar ajustable rojo para perro mediano',
            price: 12,
            description: 'Collar de nylon ajustable en color rojo para perros medianos.',
            slug: 'collar-ajustable-rojo-perro-mediano',
            stock: 23,
            type: 'accesorios',
            tags: ['perros', 'collares', 'paseo'],
            images: [
                'collar-ajustable-rojo-perro-mediano-1.jpg',
                'collar-ajustable-rojo-perro-mediano-2.jpg',
            ]
        },
        {
            title: 'Arnés acolchado para perro pequeño',
            price: 24,
            description: 'Arnés ajustable con panel acolchado para paseos con perros pequeños.',
            slug: 'arnes-acolchado-perro-pequeno',
            stock: 17,
            type: 'accesorios',
            tags: ['perros', 'arneses', 'paseo'],
            images: [
                'arnes-acolchado-perro-pequeno-1.jpg',
                'arnes-acolchado-perro-pequeno-2.jpg',
            ]
        },
        {
            title: 'Arnés acolchado para perro grande',
            price: 32,
            description: 'Arnés ajustable con panel acolchado para paseos con perros grandes.',
            slug: 'arnes-acolchado-perro-grande',
            stock: 11,
            type: 'accesorios',
            tags: ['perros', 'arneses', 'paseo'],
            images: [
                'arnes-acolchado-perro-grande-1.jpg',
                'arnes-acolchado-perro-grande-2.jpg',
            ]
        },
        {
            title: 'Correa reflectante de 1,5 m para perro',
            price: 16,
            description: 'Correa de nylon con detalles reflectantes y longitud de 1,5 m.',
            slug: 'correa-reflectante-perro-15m',
            stock: 30,
            type: 'accesorios',
            tags: ['perros', 'correas', 'paseo'],
            images: [
                'correa-reflectante-perro-15m-1.jpg',
                'correa-reflectante-perro-15m-2.jpg',
            ]
        },
        {
            title: 'Correa retráctil de 3 m para perro',
            price: 26,
            description: 'Correa retráctil con mango ergonómico y extensión de hasta 3 m.',
            slug: 'correa-retractil-perro-3m',
            stock: 19,
            type: 'accesorios',
            tags: ['perros', 'correas', 'paseo'],
            images: [
                'correa-retractil-perro-3m-1.jpg',
                'correa-retractil-perro-3m-2.jpg',
            ]
        }
    ]
}