import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  public productList : any ;
  public filterCategory : any
  searchKey:string ="";
  public countFashion: number = 0;
  public countEletronics: number = 0;
  public countJewelery: number = 0;
  constructor(private api : ApiService, private cartService : CartService) { }

  ngOnInit(): void {
    this.api.getProduct()
    .subscribe(res=>{
      this.productList = res;
      this.filterCategory = res;
      this.productList.forEach((a:any) => {
        if(a.category ==="women's clothing" || a.category ==="men's clothing"){
          a.category ="fashion"
        }
        //Count products
      if(a.category == "fashion"){
        this.countFashion +=1;
      }
      if(a.category == "jewelery"){
        this.countJewelery +=1;
      }
      if(a.category == "electronics"){
        this.countEletronics +=1;
      }
        Object.assign(a,{quantity:1,total:a.price});
      });

      

      
      console.log(this.countFashion)
      console.log(this.countJewelery)
      console.log(this.countEletronics)

      console.log(this.productList)
    });

    this.cartService.search.subscribe((val:any)=>{
      this.searchKey = val;
    })
  }
  addtocart(item: any){
    this.cartService.addtoCart(item);
  }
  filter(category:string){
    this.filterCategory = this.productList
    .filter((a:any)=>{
      if(a.category == category || category==''){
        return a;
      }
    })
  }

}
