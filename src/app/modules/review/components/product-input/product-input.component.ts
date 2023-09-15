import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { ProductService } from '../../services/product.service';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, of, switchMap } from 'rxjs';

@Component({
  selector: 'app-product-input',
  templateUrl: './product-input.component.html',
  styleUrls: ['./product-input.component.scss'],
})
export class ProductInputComponent {
  constructor(private productService: ProductService) {}

  @ViewChild('productInput', { static: true }) productInput?: ElementRef;
  @Output() productChanged = new EventEmitter<string>();

  @Input() editProductTitle: any;

  productSearchInput = new FormControl();
  productSearchResults: any[] = [];

  selectedProduct: any;
  isEnterPressed = false;

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = false;

  editableProd: any = [];

  ngOnInit() {
    try {
      this.editProductTitle
        ? this.editableProd.push(this.editProductTitle)
        : '';
      this.productSearchInput.valueChanges
        .pipe(
          debounceTime(500),
          distinctUntilChanged(),
          switchMap((query) => {
            if (query === null || query === '') {
              return of([]);
            } else {
              return this.productService.searchProductByName(query);
            }
          })
        )
        .subscribe((result) => {
          this.productSearchResults = result;
        });
    } catch (error) {
      console.log(error);
    }
  }

  onSelect(event: any): void {
    if (this.editableProd.length === 0) {
      if (event.option?.value) {
        this.isEnterPressed = false;
        this.selectedProduct = event.option.value;
        this.editableProd.push(this.selectedProduct.productTitle);
      } else {
        this.isEnterPressed = true;
        this.selectedProduct = event.target.value;
        this.editableProd.push(this.selectedProduct);
      }

      this.productChanged.emit(this.selectedProduct);
      this.productInput!.nativeElement.value = '';
      this.productSearchInput.setValue(null);
    }
  }

  getOptionText(option?: any) {
    return option?.productTitle;
  }

  remove(product: string): void {
    const index = this.editableProd.indexOf(product);

    if (index >= 0) {
      this.editableProd.splice(index, 1);
    }
  }
}
