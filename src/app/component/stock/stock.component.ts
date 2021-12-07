import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss']
})
export class StockComponent implements OnInit {

  public products : any = [];
  public grandTotal !: number;
  public countFashion: number = 0;
  public countEletronics: number = 0;
  public countJewelery: number = 0;
  //constructor(private cartService : CartService) { }

  public productList : any ;
  public filterCategory : any
  searchKey:string ="";
  constructor(private api : ApiService, private cartService : CartService) { }

  getProdutos(){
    this.api.getProduct().subscribe();
  }

  ngOnInit(): void {
    this.cartService.getProducts()
    .subscribe(res=>{
      this.products = res;
      this.grandTotal = this.cartService.getTotalPrice();
    })

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
     this.grandTotal += a.price;
    });
    
      

      
      console.log(this.countFashion)
      console.log(this.countJewelery)
      console.log(this.countEletronics)
      console.log(this.countEletronics)

      console.log(this.grandTotal)
    });
  }
  removeItem(item: any){
    this.cartService.removeCartItem(item);
  }
  emptycart(){
    this.cartService.removeAllCart();
  }
 
}
