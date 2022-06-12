import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product, ProductDocument } from './schemas/product.schema';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModule: Model<ProductDocument>,
  ) {}

  async getAll(): Promise<Product[]> {
    return await this.productModule.find().exec();
  }

  async getById(id: string): Promise<Product> {
    return this.productModule.findById(id);
  }

  async create(productDto: CreateProductDto): Promise<Product> {
    const newProduct = new this.productModule(productDto);
    return newProduct.save();
  }

  async remove(id: string): Promise<Product> {
    return this.productModule.findByIdAndRemove(id);
  }

  async update(id: string, productDto: UpdateProductDto): Promise<Product> {
    return this.productModule.findByIdAndUpdate(id, productDto, { new: true });
  }
}
