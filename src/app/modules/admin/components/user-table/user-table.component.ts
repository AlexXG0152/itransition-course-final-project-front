import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AdminService } from '../../services/admin.service';
import { IUser } from '../../interfaces/user.interface';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss'],
})
export class UserTableComponent {
  dataSource!: MatTableDataSource<any>;
  users: IUser[] = [];

  displayedColumns: string[] = [
    'id',
    'email',
    'name',
    'banned',
    'banreason',
    'unbanreason',
    'createdAt',
    'updatedAt',
    'deletedAt',
  ];

  constructor(private adminService: AdminService) {
    this.adminService.getAllUsers().subscribe((response) => {
      this.users = response;

      this.displayedColumns = [...this.displayedColumns, 'actions'];
      this.dataSource = new MatTableDataSource(this.users);

      this.dataSource.paginator = this.paginator!;
      this.dataSource.sort = this.sort!;
    });
  }

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onDelete(id: number) {
    console.log(id);
  }

  onBlock(userActionId: number, reason: string) {
    console.log('onBlock', userActionId, reason);
  }

  onUnblock(userActionId: number, reason: string) {
    console.log('onUnblock', userActionId, reason);
  }

  userActionId!: number;
  userAction!: string;
  actionReason: string = '';

  onModalOpen(id: number, action: string) {
    this.userActionId = id;
    this.userAction = action;
  }

  onSave() {
    if ((this.userAction = 'block')) {
      this.onBlock(this.userActionId, this.actionReason);
    } else {
      this.onUnblock(this.userActionId, this.actionReason);
    }
  }

  onClose() {
    this.userActionId = 0;
    this.userAction = '';
    this.actionReason = '';
  }
}
