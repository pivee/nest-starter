import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private readonly productsService: ProductService) {}

  @Post()
  async createProduct(@Body() productDto) {
    return await this.productsService.create(productDto);
  }

  @Get('list')
  async listAllProducts() {
    return await this.productsService.findAll();
  }

  @Get(':id')
  async findOneProductById(@Param() { id }) {
    return await this.productsService.findOneById(id);
  }

  @Patch(':id')
  async updateProduct(@Param() { id }, @Body() productDto) {
    return await this.productsService.update(id, productDto);
  }

  @Delete('clear-dev')
  async dangerouslyDeleteAllProducts() {
    return await this.productsService.__dev__deleteAll();
  }

  @Delete(':id')
  async deleteProduct(@Param() { id }) {
    return await this.productsService.delete(id);
  }
}
