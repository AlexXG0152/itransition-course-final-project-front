import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NavigationService } from 'src/app/modules/home/services/navigation.service';
import { ReviewService } from '../../services/review.service';

@Component({
  selector: 'app-create-review-page',
  templateUrl: './create-review-page.component.html',
  styleUrls: ['./create-review-page.component.scss'],
})
export class CreateReviewPageComponent {
  reviewForm: FormGroup;
  products: any[] = [
    { title: 'Product 1' },
    { title: 'Product 2' },
    { title: 'Product 3' },
  ];
  droppedImages: string[] = [];
  showProductId = false;

  categories: any[] = this.navigationService.categories;
  subCategories!: any[];

  constructor(
    private formBuilder: FormBuilder,
    private navigationService: NavigationService,
    private reviewService: ReviewService
  ) {
    this.reviewForm = this.formBuilder.group({
      title: ['', Validators.required],
      category: ['', Validators.required],
      tags: '',
      content: ['', Validators.required],
      imageslinks: [],
      reviewRating: ['', Validators.required],
      productTitle: '',
      productId: 0,
      categoryId: ['', Validators.required],
      subcategoryId: ['', Validators.required],
    });
  }

  submitReview() {
    const data = {
      ...this.reviewForm.value,
      categoryId: this.reviewForm.value['category'],
    };
    delete data['category'];

    data.tags = data.tags
      .split(',')
      .map((element: string) => {
        return element.trim();
      })
      .filter((elem: string) => elem !== '');

    data.tags = JSON.stringify(data.tags);

    console.log(data);
    this.reviewService.createReview(data).subscribe();
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    const files = event.dataTransfer!.files;

    for (let i = 0; i < files.length; i++) {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        this.droppedImages.push(e.target.result);
      };

      reader.readAsDataURL(files[i]);
    }
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
  }

  onProductTitleChange() {
    const productTitle = this.reviewForm.get('productTitle')!.value;

    if (productTitle) {
      const product = this.products.find((p) => p.title === productTitle);
      this.reviewForm.patchValue({ productId: product.productId });
      this.showProductId = true;
    } else {
      this.reviewForm.patchValue({ productId: 0 });
      this.showProductId = false;
    }
  }

  onCategorySelect() {
    this.subCategories =
      this.navigationService.categories[
        this.reviewForm.get('category')!.value - 1
      ].subcategories;
  }
}
