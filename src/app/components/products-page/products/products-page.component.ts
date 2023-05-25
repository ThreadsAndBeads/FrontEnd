import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product/product.service';
import { of } from 'rxjs';

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.css'],
})
export class ProductsPageComponent implements OnInit {
  filterBy: {
    categories: string[] | null;
    price: { min: number; max: number } | null;
  } = {
    categories: null,
    price: null,
  };

  page = 1;
  limit = 8;
  NumberOfPages!: number;
  sortBySelectedValue = 'default';

  constructor(
    protected productService: ProductService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.getProducts();
    window.onresize = () => {
      let filter = document.querySelector('.filterBy') as HTMLElement;
      if(window.innerWidth >= 769){
        filter.style.transform = "translate(0)";
      }else{
        filter.style.transform = 'translate(-100%)';
      }
    };
  }

  onFilterChange(filter: any) {
    this.filterBy = filter;
    let query = this.setFilterQuery();
    this.getProducts(query);
  }

  onSelectionChange(): void {
    let query = this.setFilterQuery()
    this.getProducts(query);
  }

  getProducts(query?: string) {

    console.log('getProducts() called with query: ', query);
    this.productService.products = [];
    this.productService.getAllProducts(this.page, this.limit, query).subscribe(
      (response: any) => {
        this.cdr.detectChanges();
        const { products } = response.data;
        this.NumberOfPages = Math.ceil(response.data.totalRecords / this.limit);
        this.productService.products.push(...products);
      },
      ({ status, message }: HttpErrorResponse) => {
        console.log(`Error ${status}: ${message}`);
      }
    );
  }

  get pages(): number[] {
    return Array.from({ length: this.NumberOfPages }, (_, i) => i + 1);
  }

  removeCategory(value: string) {
    if (this.filterBy.categories) {
      if (this.filterBy.categories?.length == 1) {
        this.filterBy.categories = null;
      } else {
        const index = this.filterBy.categories.indexOf(value);
        if (index >= 0) {
          this.filterBy.categories.splice(index, 1);
        }
      }
    }
  }

  removeFromFilter(filterName: keyof typeof this.filterBy, value?: string) {
    if (filterName == 'categories' && value) {
      this.removeCategory(value);
    } else if (this.filterBy.hasOwnProperty(filterName)) {
      this.filterBy[filterName] = null;
    }
    let query = this.setFilterQuery();
    console.log(query);
    this.filterBy = { ...this.filterBy };
    // this.getProducts(query);
  }

  clearFilter() {
    this.filterBy = {
      categories: null,
      price: null,

    };
    this.filterBy = { ...this.filterBy };
    // this.getProducts();
  }

  setFilterQuery() {
    let query = '';
    if (this.filterBy.categories) {
      if (this.filterBy.categories.length > 0) {
        query += `category=${this.filterBy.categories.join('&category=')}&`;
      }
    }
    if (this.filterBy.price) {
      query += `price[gte]=${this.filterBy.price.min}&price[lte]=${this.filterBy.price.max}&`;
    }
    if (this.sortBySelectedValue != "default") {
      query += `sort=${this.sortBySelectedValue}&`;
    }
    query = query.slice(0, -1);
    return query;
  }

  previous() {
    if (this.page > 1) {
      this.page--;
      this.getProducts();
    }
  }

  next() {
    if (this.page < this.NumberOfPages) {
      this.page++;
      this.getProducts();
    }
  }

  navToPage(page: number) {
    this.page = page;
    this.getProducts();
  }

  viewFilter() {
    let filter = document.querySelector('.filterBy') as HTMLElement;
    if(filter.classList.contains('shown')){
      filter.style.transform = "translateX(-100%)";
      filter.classList.remove('shown')
    }else{
      filter.style.transform = "translateX(0%)";
      filter.classList.add('shown')
    }
  }
}
