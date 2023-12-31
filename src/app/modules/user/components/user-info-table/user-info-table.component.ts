import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TranslateService } from '@ngx-translate/core';
import { columns } from '../user-page/user-page.component';
import { ReviewService } from 'src/app/modules/review/services/review.service';
import { ProductService } from 'src/app/modules/review/services/product.service';
import { CommentsService } from 'src/app/modules/comment/services/comment.service';

@Component({
  selector: 'app-user-info-table',
  templateUrl: './user-info-table.component.html',
  styleUrls: ['./user-info-table.component.scss'],
})
export class UserInfoTableComponent implements AfterViewInit, OnInit {
  constructor(
    private translateService: TranslateService,
    private reviewService: ReviewService,
    private productService: ProductService,
    private commentsService: CommentsService
  ) {}

  @Input() inputData?: any;
  @Output() getInputData = new EventEmitter<any>();

  columns: any = columns;
  displayedColumns!: string[];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator | any;
  @ViewChild(MatSort) sort: MatSort | any;

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.inputData.rows);
    this.displayedColumns = this.inputData.columns.map((columnName: string) => {
      return this.translateService.instant(`user.user-page.${[columnName]}`);
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.translateService.onLangChange.subscribe(() => {
      this.displayedColumns = this.inputData.columns.map((columnName: any) => {
        return this.translateService.instant(`user.user-page.${[columnName]}`);
      });
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  reload() {
    this.dataSource = new MatTableDataSource(this.inputData.rows);
  }

  onDelete(row: any) {
    switch (this.inputData.columns[1]) {
      case 'title': //Reviews
        this.reviewService.deleteReview(row.id).subscribe(() => {
          this.inputData.rows = this.inputData.rows.filter(
            (review: any) => review.id !== row.id
          );
          this.reload();
        });
        break;
      case 'product-title': //Ratings
        this.productService
          .deleteGivenRating({
            productId: row['product-id'],
            userId: row.userId,
          })
          .subscribe(() => {
            this.inputData.rows = this.inputData.rows.filter(
              (review: any) => review.id !== row.id
            );
            this.reload();
          });
        break;
      case 'comment-text': //Comments
        // this.commentsService.deleteComment().subscribe();
        break;
      case 'review-title': //Likes
        // this.reviewService.deleteLike().sbscribe();
        break;
      default:
        break;
    }
  }
}
