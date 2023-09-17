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
import { ReviewService } from 'src/app/modules/review/services/review.service';
import { columns } from '../user-page/user-page.component';

@Component({
  selector: 'app-user-info-table',
  templateUrl: './user-info-table.component.html',
  styleUrls: ['./user-info-table.component.scss'],
})
export class UserInfoTableComponent implements AfterViewInit, OnInit {
  constructor(
    private reviewService: ReviewService,
    private translateService: TranslateService
  ) {}

  @Input() inputData?: any;
  @Output() getInputData = new EventEmitter<any>();

  columns:any = columns
  displayedColumns!: string[];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator | any;
  @ViewChild(MatSort) sort: MatSort | any;

  ngOnInit(): void {
    console.log(this.inputData.rows);

    this.dataSource = new MatTableDataSource(this.inputData.rows);
    this.displayedColumns = this.inputData.columns.map((columnName: any) => {
      return this.translateService.instant(`user.user-page.${[columnName]}`);
    });
    // this.displayedColumns = [...this.inputData.columns, 'actions'];
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

  onDelete(id: any) {
  //   this.reviewService
  //     .deleteReview(id)
  //     .subscribe(() => this.getInputData.emit());
  }
}
