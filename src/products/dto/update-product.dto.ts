
import { PartialType } from '@nestjs/swagger';
import { CreateProductDto } from './create-product.dto.js';

/**
 * DTO para actualizar un producto.
 *
 * Hereda de `CreateProductDto` con todas las propiedades opcionales, por lo
 * que se puede enviar solo el subconjunto de campos que se desea modificar.
 */
export class UpdateProductDto extends PartialType(CreateProductDto) {}