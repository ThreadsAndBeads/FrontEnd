import { Component, Input, Output, EventEmitter,  OnChanges, SimpleChanges } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Category } from '../../model/category.model';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css'],
})
export class FilterComponent implements OnChanges {
  @Input() filterBy: any;
  @Output() filterByEvent = new EventEmitter();

  categories: Category[] = [];
  minPrice = 100;
  maxPrice = 500;
  minInputPrice = 100;
  maxInputPrice = 500;
  selectedStar = 0;

  constructor(protected productService: ProductService) {
    this.getCategories();
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('Filter changed in parent');
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

  updateMaxInputPrice() {
    this.maxInputPrice = Math.max(this.minInputPrice, this.maxInputPrice);
    this.filterBy['price'] = {
      min: this.minInputPrice,
      max: this.maxInputPrice,
    };
    this.filterByEvent.emit(this.filterBy);
  }

  updateMinInputPrice() {
    this.minInputPrice = Math.min(this.maxInputPrice, this.minInputPrice);
    this.filterBy['price'] = {
      min: this.minInputPrice,
      max: this.maxInputPrice,
    };
    this.filterByEvent.emit(this.filterBy);
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

  ratingFilter(min: number) {
    let allStars = document.querySelectorAll('.ratingStar');
    allStars.forEach((star, i) => {
      if (i < min) {
        star.classList.add('bi-star-fill');
        star.classList.remove('bi-star');
      } else {
        star.classList.add('bi-star');
        star.classList.remove('bi-star-fill');
      }
    });
    this.filterBy['rating'] = min;
    this.filterByEvent.emit(this.filterBy);
  }

  resetCategory() {
    const checkedCheckboxes = document.querySelectorAll(
      'input.filter-checkbox-value:checked'
    );
    
    if(this.filterBy.categories) {
      checkedCheckboxes.forEach((checkbox) => {
        let categoryName = checkbox.nextElementSibling?.innerHTML as string;
        if ( !this.filterBy.categories.includes( categoryName )) {
          (checkbox as HTMLInputElement).checked = false;
        }
      });
    }else{
      checkedCheckboxes.forEach((checkbox) => {
        (checkbox as HTMLInputElement).checked = false;
      })
    }
  }
  
  resetInputFilters(){
    this.resetCategory();
    this.ratingFilter(0);
    this.minInputPrice = this.minPrice;
    this.maxInputPrice = this.maxPrice;
  }
}
