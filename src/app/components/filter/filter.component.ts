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
    // const query = Object.entries(this.filterBy)
    //   .filter(([key, value]) => value !== null)
    //   .map(([key, value]) => {
    //     if (key === 'categories') {
    //       if (Array.isArray(value)) {
    //         return value.map((category) => `category=${encodeURIComponent(category)}`).join('&');
    //       } else {
    //         return '';
    //       }
    //     } else if (key === 'price') {
    //       return `gte=${value.min}&lte=${value.max}` 
    //     } else {
    //       return `${key}=${value}`;
    //     }
    //   })
    //   .join('&');

    // console.log(query);
  }

}
