
import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, Query } from '@nestjs/common';

import { ProductsService } from './products.service.js';
import { CreateProductDto } from './dto/create-product.dto.js';
import { UpdateProductDto } from './dto/update-product.dto.js';
import { PaginationDto } from '../common/dtos/pagination.dto.js';
import { GetUSer } from '../auth/decorators/get-user.decorator.js';
import { User } from '../auth/entities/user.entity.js';
import { Auth } from '../auth/decorators/auth-decorator.js';

/**
 * Controlador del catálogo de productos.
 *
 * Expone el CRUD de productos bajo el prefijo global `api/petora/products`.
 * Las rutas de escritura requieren un usuario autenticado; la creación usa
 * `@Auth()` para adjuntar el usuario que registra el producto.
 */
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  /**
   * Lista productos con paginación.
   *
   * @param paginationDto `limit` (10 por defecto) y `offset` (0 por defecto).
   * @returns Arreglo de productos con sus imágenes como URLs.
   */
  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.productsService.findAll(paginationDto);
  }

  /**
   * Busca un producto por UUID, título o slug.
   *
   * @param term Identificador o término de búsqueda.
   * @returns Producto encontrado con sus imágenes como URLs.
   */
  @Get(':term')
  findOne(@Param('term') term: string) {
    return this.productsService.findDataPlain(term);
  }

  /**
   * Crea un producto asociado al usuario autenticado.
   * Requiere un token JWT válido (`@Auth()` sin roles específicos).
   */
  @Post()
  @Auth()
  create(
    @Body() createProductDto: CreateProductDto,
    @GetUSer() user: User
  ) {
    return this.productsService.create(createProductDto, user);
  }

  /**
   * Actualiza un producto existente.
   *
   * @param id UUID del producto; se valida con `ParseUUIDPipe`.
   * @param updateProductDto Campos a modificar.
   * @param user Usuario autenticado que realiza el cambio.
   */
  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateProductDto: UpdateProductDto,
    @GetUSer() user: User
  ) {
    return this.productsService.update(id, updateProductDto, user);
  }

  /**
   * Elimina un producto por su UUID.
   * Las imágenes asociadas se eliminan en cascada.
   */
  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.productsService.remove(id);
  }
}
