import { ProductService } from './../product.service';
import { Product } from './../product';
import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {

  product: Product =  new Product();
  submited = false;
  isNew = true;
  id = null;

  constructor(private productService : ProductService, private route: ActivatedRoute) {
   

  }

  ngOnInit() {
    
    if(this.route.snapshot.url[0].path == 'edit'){
      this.id = this.route.snapshot.params.id;
      this.isNew = false;
      this.load(this.id);
    } else {
      this.id = null;
      this.isNew == false;
    }
  }
    
  newProduct(): void {
    this.submited = false;
    this.product = new Product();
  }

  load(id : String) {
    this.productService.getProduct(id).subscribe(
      data =>{
        this.product = data.data;
      },
      error => console.log(error));
  }

  save() {
    if(this.isNew){
      this.productService.createProduct(this.product)
      .subscribe(data => console.log(data), error => console.log(error));
      this.product = new Product();
    } else {
      this.productService.updateProduct(this.id, this.product)
      .subscribe(data => console.log(data), error => console.log(error));
    }
  }

  onSubmit(){
    this.submited = true;
    this.save();
  }

}
