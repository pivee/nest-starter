import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductService } from './product.service';

@ApiTags('product')
@Controller('product')
export class ProductController {
  constructor(private readonly productsService: ProductService) {}

  @Post()
  async createProduct(@Body() productDto: CreateProductDto) {
    return await this.productsService.create(productDto);
  }

  @Get('list')
  @ApiOkResponse({ description: 'Product List was successfully returned' })
  async listAllProducts(
    // eslint-disable-next-line @typescript-eslint/no-inferrable-types
    @Query('limit') limit: number = 100,
    // eslint-disable-next-line @typescript-eslint/no-inferrable-types
    @Query('offset') offset: number = 0,
  ) {
    return await this.productsService.findAll({ limit, offset });
  }

  @Get(':id')
  async findOneProductById(@Param('id') id: number) {
    return await this.productsService.findOneById(id);
  }

  @Patch(':id')
  async updateProduct(
    @Param('id') id: number,
    @Body() productDto: UpdateProductDto,
  ) {
    return await this.productsService.update(id, productDto);
  }

  @Delete('clear-dev')
  async dangerouslyDeleteAllProducts() {
    return await this.productsService.__dev__deleteAll();
  }

  @Delete(':id')
  async deleteProduct(@Param('id') id: number) {
    return await this.productsService.delete(id);
  }
}
