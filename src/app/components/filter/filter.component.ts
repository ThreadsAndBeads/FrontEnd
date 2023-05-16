import { Component } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Category } from '../../model/category.model';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css'],
})
export class FilterComponent {
  categories: Category[] = [];
  minPrice = 100;
  maxPrice = 500;
  minInputPrice = 100;
  maxInputPrice = 500;
  selectedStar = 0;

  filterBy: {
    categories: string[] | null;
    price: { min: number; max: number } | null;
    rating: number | null;
  } = {
    categories: null,
    price: null,
    rating: null,
  };

  constructor(protected productService: ProductService) {
    this.getCategories();
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
    this.getFilteredProducts();
  }

  updateMinInputPrice() {
    this.minInputPrice = Math.min(this.maxInputPrice, this.minInputPrice);
    this.filterBy['price'] = {
      min: this.minInputPrice,
      max: this.maxInputPrice,
    };
    this.getFilteredProducts();
  }

  categoriesFilter() {
    const checkedCheckboxes = document.querySelectorAll(
      'input.filter-checkbox-value:checked'
    );
    this.filterBy.categories = Array.from(checkedCheckboxes).map((checkbox) => {
      const categoryName = checkbox.nextElementSibling?.innerHTML as string;
      return categoryName;
    });
    this.getFilteredProducts();
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
    this.getFilteredProducts();
  }

  getFilteredProducts() {
    let query = '';
    if (this.filterBy.categories) {
      query += `category=${this.filterBy.categories.join('&category=')}&`;
    }
    if (this.filterBy.price) {
      query += `price[gte]=${this.filterBy.price.min}&price[lte]=${this.filterBy.price.max}&`;
    }
    if (this.filterBy.rating) {
      query += `rating=${this.filterBy.rating}&`;
    }
    query = query.slice(0, -1);
    
  }

}
