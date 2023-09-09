import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NavigationService } from 'src/app/modules/home/services/navigation.service';
import { ReviewService } from '../../services/review.service';
import { UploadService } from '../../services/upload.service';
import { map, switchMap } from 'rxjs/operators';

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
    private uploadService: UploadService,
    private reviewService: ReviewService
  ) {
    this.reviewForm = this.formBuilder.group({
      title: ['', Validators.required],
      category: ['', Validators.required],
      tags: '',
      content: ['', Validators.required],
      imageslinks: '',
      reviewRating: ['', Validators.required],
      productTitle: '',
      productId: 0,
      categoryId: ['', Validators.required],
      subcategoryId: ['', Validators.required],
    });
  }

  async submitReview() {
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

    if (this.files.length > 0) {
      const images = this.createImageFormData();

      this.uploadService
        .upload(images)
        .pipe(
          map((links) => {
            data.imageslinks = JSON.stringify(links);
            return data;
          }),
          switchMap((data: any) => this.reviewService.createReview(data))
        )
        .subscribe();
    }

    this.reviewService.createReview(data);
  }

  createImageFormData() {
    const formData = new FormData();
    this.files.forEach((file) => {
      formData.append('file', file);
    });
    return formData;
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

  @ViewChild('fileDropRef', { static: false }) fileDropEl:
    | ElementRef
    | undefined;
  files: any[] = [];

  onFileDropped($event: any[]) {
    this.prepareFilesList($event);
  }

  fileBrowseHandler(files: any[]) {
    this.prepareFilesList(files);
  }

  deleteFile(index: number) {
    if (this.files[index].progress < 100) {
      console.log('Upload in progress.');
      return;
    }
    this.files.splice(index, 1);
  }

  uploadFilesSimulator(index: number) {
    setTimeout(() => {
      if (index === this.files.length) {
        return;
      } else {
        const progressInterval = setInterval(() => {
          if (this.files[index].progress === 100) {
            clearInterval(progressInterval);
            this.uploadFilesSimulator(index + 1);
          } else {
            this.files[index].progress += 5;
          }
        }, 100);
      }
    }, 500);
  }

  prepareFilesList(files: Array<any>) {
    for (const item of files) {
      item.progress = 0;
      this.files.push(item);
    }
    this.reviewForm.get('imageslinks')!.setValue(files);
    this.fileDropEl!.nativeElement.value = '';
    this.uploadFilesSimulator(0);
  }

  formatBytes(bytes: number, decimals = 2) {
    if (bytes === 0) {
      return '0 Bytes';
    }
    const k = 1024;
    const dm = decimals <= 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }
}
