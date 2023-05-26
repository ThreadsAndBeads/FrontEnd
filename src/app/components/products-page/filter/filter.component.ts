import { Component, Input, Output, EventEmitter,  OnChanges, SimpleChanges } from '@angular/core';
import { ProductService } from 'src/app/services/product/product.service';
import { Category } from '../../../model/category.model';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css'],
})
export class FilterComponent implements OnChanges {
  @Input() filterBy: any;
  @Output() filterByEvent = new EventEmitter();

  categories: Category[] = [];
  minPrice = 0;
  maxPrice = 1000;
  minInputPrice = 0;
  maxInputPrice = 1000;
  selectedStar = 0;

  constructor(protected productService: ProductService) {
    this.getCategories();
    this.getPriceRange();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['filterBy'] && !changes['filterBy'].firstChange) {
      this.resetInputFilters();
    }
  }

  getCategories() {
    this.productService.getAllCategories().subscribe({
      next: (response) => {
        this.categories = response as Category[];
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  getPriceRange() {
    this.productService.priceRange().subscribe({
      next: (response: any) => {
        if(response){
          this.minPrice = response.minPrice;
          this.maxPrice = response.maxPrice;
          this.minInputPrice = this.minPrice;
          this.maxInputPrice = this.maxPrice;
        }
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  updateMaxInputPrice() {
    this.maxInputPrice = Math.max(this.minInputPrice, this.maxInputPrice);
    this.filterBy['price'] = {
      min: this.minInputPrice,
      max: this.maxInputPrice,
    };
    this.calculatProgressBar();
  }

  updateMinInputPrice() {
    this.minInputPrice = Math.min(this.maxInputPrice, this.minInputPrice);
    this.filterBy['price'] = {
      min: this.minInputPrice,
      max: this.maxInputPrice,
    };
    this.calculatProgressBar();
  }

  priceFilter(){
    this.filterByEvent.emit(this.filterBy);
  }

  calculatProgressBar(){
    let range = document.querySelector('.slider .progress') as HTMLElement;
    range.style.width = `${((this.maxInputPrice-this.minInputPrice)/(this.maxPrice-this.minPrice))*100}%`;
    range.style.left = `${(this.minInputPrice)/(this.maxPrice-this.minPrice)*100}%`;
  }

  categoriesFilter() {
    const checkedCheckboxes = document.querySelectorAll(
      'input.filter-checkbox-value:checked'
    );
    this.filterBy.categories = Array.from(checkedCheckboxes).map((checkbox) => {
      const categoryName = checkbox.nextElementSibling?.innerHTML as string;
      return categoryName;
    });
    this.filterByEvent.emit(this.filterBy);
  }


  resetCategory() {
    const checkedCheckboxes = document.querySelectorAll(
      'input.filter-checkbox-value:checked'
    );

    if (this.filterBy.categories) {
      checkedCheckboxes.forEach((checkbox) => {
        let categoryName = checkbox.nextElementSibling?.innerHTML as string;
        if (!this.filterBy.categories.includes(categoryName)) {
          (checkbox as HTMLInputElement).checked = false;
        }
      });
    } else {
      checkedCheckboxes.forEach((checkbox) => {
        (checkbox as HTMLInputElement).checked = false;
      });
    }
  }

  resetPrice() {
    this.minInputPrice = this.minPrice;
    this.maxInputPrice = this.maxPrice;
    this.calculatProgressBar();
  }

  resetInputFilters() {
    this.resetCategory();
    this.resetPrice();
  }
}
