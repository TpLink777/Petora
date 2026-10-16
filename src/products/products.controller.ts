
import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, Query } from '@nestjs/common';
import { ProductsService } from './products.service.js';
import { CreateProductDto } from './dto/create-product.dto.js';
import { UpdateProductDto } from './dto/update-product.dto.js';
import { PaginationDto } from '../common/dtos/pagination.dto.js';
import { GetUSer } from '../auth/decorators/get-user.decorator.js';
import { User } from '../auth/entities/user.entity.js';
import { Auth } from '../auth/decorators/auth-decorator.js';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.productsService.findAll(paginationDto);
  }

  @Get(':term')
  findOne(@Param('term') term: string) {
    return this.productsService.findDataPlain(term);
  }

  @Post()
  @Auth()
  create(
    @Body() createProductDto: CreateProductDto,
    @GetUSer() user: User
  ) {
    return this.productsService.create(createProductDto, user);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateProductDto: UpdateProductDto,
    @GetUSer() user: User
  ) {
    return this.productsService.update(id, updateProductDto, user);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.productsService.remove(id);
  }
}
