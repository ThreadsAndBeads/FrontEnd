import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/model/product.model';
import { ProductService } from 'src/app/services/product.service';
interface Workshop {
  title: string;
}
@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})

export class SearchBarComponent {
  showSearch = false;
  showDropdown = false;
  query = '';
  products: Product[] = [];
  workshops: Workshop[] = [];
  constructor(
    private router: Router,
    private productService: ProductService, 

  ) {

  }

  search() {
    if (!this.query) {
      this.products = [];
      this.workshops = [];
      this.showDropdown = false;
      return;
    }

    this.productService.search(this.query).subscribe(
      (response : any) => {
        this.products = response.products;
        this.workshops = response.workshops;
        this.showDropdown = true;    
        },
      (error) => {
        console.error('Error', error);
      }
    
    );
  }

  navigate(page :any){
    this.showDropdown = false;
    this.router.navigate([page]);
  }

  @HostListener('window:click', ['$event'])
  onClick(event :any) {    
    const dropdown = document.querySelector('.dropdown') ;
    const searchBox = document.querySelector('#search-box');
    if (!dropdown?.contains(event.target) && !searchBox?.contains(event.target)) {
      this.showDropdown = false;
    }
  }

}
