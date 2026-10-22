/**
 * Forma de un producto dentro de los datos del seed.
 *
 * Se usa para tipar `initialData.products` y garantizar que cada producto
 * tenga todos los campos requeridos por `CreateProductDto`.
 */
export interface SeedProduct {
    /** Título del producto. */
    title: string;
    /** Precio unitario. */
    price: number;
    /** Descripción del producto. */
    description: string;
    /** Slug único para búsquedas. */
    slug: string;
    /** Unidades disponibles. */
    stock: number;
    /** Categoría del producto (`alimentos`, `snacks`, etc.). */
    type: string;
    /** Etiquetas de búsqueda. */
    tags: string[];
    /** Nombres o URLs de las imágenes del producto. */
    images: string[];
}
