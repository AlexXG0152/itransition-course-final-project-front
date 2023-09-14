import { Component, ElementRef, ViewChild } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { ReviewService } from '../../services/review.service';
import { UploadService } from '../../services/upload.service';
import { IReview } from '../../interfaces/review.interface';
import { NavigationService } from '../../../home/services/navigation.service';

@Component({
  selector: 'app-create-review-page',
  templateUrl: './create-review-page.component.html',
  styleUrls: ['./create-review-page.component.scss'],
})
export class CreateReviewPageComponent {
  reviewForm!: FormGroup;
  products: any[] = [
    { title: 'Product 1' },
    { title: 'Product 2' },
    { title: 'Product 3' },
  ];
  showProductId = false;

  categories: any[] = this.navigationService.categories;
  subCategories?: any[];

  edit = false;
  id?: number;
  dataForEdit?: IReview;
  originalData: any;
  editFiles: number = 0;

  tags: string[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private navigationService: NavigationService,
    private uploadService: UploadService,
    private reviewService: ReviewService,

    private router: Router,
    private route: ActivatedRoute,
    private location: Location
  ) {
    this.route.data.subscribe(
      (isEdit: { preload?: boolean; edit?: boolean }) => {
        this.edit = isEdit.edit ?? false;
      }
    );

    if (this.edit) {
      this.dataForEdit =
        this.router.getCurrentNavigation()?.extras.state?.['data'];

      this.originalData = { ...this.dataForEdit };

      this.id = +this.route.snapshot.paramMap.get('id')!;

      this.tags = this.dataForEdit?.tags!.map((obj: any) => obj.name)!;

      if (!this.dataForEdit) {
        this.reviewService
          .getReviewByID(this.id)
          .pipe(
            tap((response) => {
              if (response === null) {
                this.router.navigateByUrl('/404');
                return;
              }
              this.dataForEdit = response;
              this.fillReviewForm(this.dataForEdit);
              this.onCategorySelect();
              return;
            }),
            catchError((error) => {
              throw error;
            })
          )
          .subscribe();
      }
      this.fillReviewForm(this.dataForEdit);
      this.onCategorySelect();
    } else {
      this.fillReviewForm();
    }
  }

  get contentControl() {
    return this.reviewForm.controls['content'] as FormControl;
  }

  fillReviewForm(dataForEdit?: IReview) {
    this.editFiles = dataForEdit?.imageslinks.length ?? 0;

    this.reviewForm = this.formBuilder.group({
      title: [dataForEdit?.title || '', Validators.required],
      tags: [
        dataForEdit?.tags?.map((tag: any) => tag.name).join(', ') || '',
        Validators.required,
      ],
      content: [dataForEdit?.content || '', Validators.required],
      imageslinks: '',
      reviewRating: [dataForEdit?.reviewRating || '', Validators.required],
      productTitle: [dataForEdit?.productTitle || '', Validators.required],
      productId: dataForEdit?.productId || 0,
      categoryId: [dataForEdit?.categoryId || '', Validators.required],
      subcategoryId: [dataForEdit?.subcategoryId || '', Validators.required],
    });
  }

  handleTagsChange(tags: string[]) {
    this.tags = tags;
    this.reviewForm.value.tags = tags;
  }

  async onSubmitReview() {
    this.handleTagsChange(this.tags!);

    this.dataForEdit!.tags = this.tags;

    const service = (id: number | undefined, data: IReview) =>
      this.edit
        ? this.reviewService.editReview(id!, data)
        : this.reviewService.createReview(data);

    if (this.files.length > 0) {
      const images = this.createImageFormData();

      this.uploadService
        .upload(images)
        .pipe(
          map((links) => {
            if (this.dataForEdit?.imageslinks) {
              this.reviewForm.value.imageslinks = JSON.stringify([
                ...this.dataForEdit?.imageslinks,
                ...links,
              ]);
            } else {
              this.reviewForm.value.imageslinks = JSON.stringify(links);
            }

            return this.reviewForm.value;
          }),
          switchMap((data: any) =>
            service(this.id, data).pipe(
              tap((result) => {
                this.reviewForm.reset();
                this.router.navigateByUrl(`review/${result.id || this.id}`);
              }),
              catchError((error) => {
                throw error;
              })
            )
          )
        )
        .subscribe();
    } else {
      this.reviewForm.value.imageslinks =
        JSON.stringify(this.dataForEdit?.imageslinks) || JSON.stringify([]);

      service(this.id, this.reviewForm.value)
        .pipe(
          tap((result) => {
            this.reviewForm.reset();
            this.router.navigateByUrl(`review/${result.id || this.id}`);
          }),
          catchError((error) => {
            throw error;
          })
        )
        .subscribe();
    }
  }

  createImageFormData() {
    const formData = new FormData();
    this.files.forEach((file) => {
      formData.append('file', file);
    });
    return formData;
  }

  onImageRemoveWhenEdit(image: any) {
    this.dataForEdit!.imageslinks =
      this.dataForEdit!.imageslinks?.filter(
        (item: { originalname: any }) =>
          item.originalname !== image.originalname
      ) || [];
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
        this.reviewForm.get('categoryId')?.value - 1
      ]?.subcategories;
  }

  onCancel() {
    this.location.back();
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
