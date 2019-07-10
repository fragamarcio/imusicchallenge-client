import { ProductService } from './../product.service';
import { Product } from './../product';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {

  product: Product =  new Product();
  submited = false;

  constructor(private productService : ProductService) { }

  ngOnInit() {
  }

  newProduct(): void {
    this.submited = false;
    this.product = new Product();
  }

  save() {
    this.productService.createProduct(this.product)
    .subscribe(data => console.log(data), error => console.log(error));
    this.product = new Product();
  }

  onSubmit(){
    this.submited = true;
    this.save();
  }

}
