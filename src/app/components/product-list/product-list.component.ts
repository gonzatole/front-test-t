import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  imports: [CommonModule],
  standalone: true,
})
export class ProductListComponent implements OnInit {
  @Input() products!: Product[];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe((products: Product[]) => {
      this.products = products.map(product => ({ ...product, showUpdateForm: false }));
    });
  }

  deleteProduct(id: number): void {
    this.productService.deleteProduct(id).subscribe(() => {
      this.products = this.products.filter(p => p.id !== id);
    });
  }

  updateProduct(id: number, product: Product): void {
    this.productService.updateProduct(id, product).subscribe(() => {
      this.products = this.products.map(p => p.id === id ? product : p);
    });
  }

  showUpdateForm(product: Product): void {
    product.showUpdateForm = !product.showUpdateForm;
  }
}