import { IId } from 'src/interfaces/common.types';
import { IProduct } from 'src/interfaces/product.interface';

export class Product implements IProduct {
  id: IId;
  name: string;

  constructor(id: IId, { name }: { name?: string } = {}) {
    this.id = id;
    this.name = name;
  }
}
