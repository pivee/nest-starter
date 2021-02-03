import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './product.entity';

@Injectable()
export class ProductService {
  private collection: Product[] = [];

  async create(productDto) {
    const product = new Product(this.collection.length + 1, {
      name: productDto.name,
    });

    this.collection.push(product);

    return product;
  }

  async findAll() {
    return await this.collection;
  }

  async findOneById(id) {
    const product = await this.collection.find(
      (product) => product.id === Number(id),
    );

    if (product === undefined) {
      throw new NotFoundException('This product does not exist.');
    } else {
      return product;
    }
  }

  private async findProductIndex(id, collection) {
    return collection.findIndex((product) => product.id === Number(id));
  }

  async update(id, productDto) {
    const existingProduct = await this.findOneById(id);

    const productIndex = await this.findProductIndex(id, this.collection);

    const updatedProduct = {
      ...existingProduct,
      ...productDto,
    };

    this.collection[productIndex] = updatedProduct;

    return updatedProduct;
  }

  async delete(id): Promise<void> {
    await this.findOneById(id);

    const productIndex = await this.findProductIndex(id, this.collection);

    this.collection.splice(productIndex, 1);
  }

  async __dev__deleteAll(): Promise<void> {
    this.collection = [];
  }
}
