import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductDetailService } from 'src/app/services/product-detail.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  dataProduct!: any;
  id!: number;
  dataDetail !: any;

  constructor(private route: ActivatedRoute, private product: ProductService, private detail: ProductDetailService) { }



  ngOnInit() {
    if (this.route.snapshot.params[`id`]) {
      this.id = this.route.snapshot.params[`id`];
    }

    const params = this.getParams(this.id);
    this.product.findProduct(params).subscribe(
      (data) => {
        console.log(data);
        this.dataProduct = data;
      }
    );

    this.detail.findId(this.id).subscribe(
      (data) => {
        console.log(data);
        this.dataDetail = data;
      }
    );


  }

  getParams(productId) {
    const params = {};

    if (productId) {
      params[`productId`] = productId;
    }
    return params;
  }

}
