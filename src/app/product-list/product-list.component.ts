import { Observable } from "rxjs";
import { ProductService } from "./../product.service";
import { Product } from "./../product";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Observable<Product[]>;

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.reloadData();
  }

  reloadData() {
     this.productService.getProductsList().subscribe(
      data =>{
        this.products = data.data;
        console.log(this.products);
      },
      error => console.log(error)
    );  
  }

  deleteProduct(id: String) {
    this.productService.deleteProduct(id).subscribe(
        data =>{
          console.log(data);
          this.reloadData();
        },
        error => console.log(error)
    );
  }

}
