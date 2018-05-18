import { Component, OnInit, ViewContainerRef, ViewChild, ElementRef } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { UserService } from '../service/user.service';
import {User} from '../model/index';
import { PagerService } from '../service/pager.service';

declare var $: any;

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  pager: any = {};
  allUsers: User[] = [];
  users: User[] = [];
  editUser: User = new User();
  countOfELementsOnPage = 2;

  constructor(private userService: UserService,
    private pagerService: PagerService,
    private toastr: ToastsManager,
    private _vcr: ViewContainerRef) { 
      this.toastr.setRootViewContainerRef(_vcr);
    }

  ngOnInit() {
      this.updateUsers();
  }

  setEditUser(user: User) {
    this.editUser = Object.assign({}, user);
  }

  saveUser() {
    if(this.editUser.password == null || this.editUser.password === '') {
      this.toastr.error('You need to enter the password', 'ERROR');
      return;
    }
    if(this.editUser.password !== this.editUser.passwordAgain) {
      this.toastr.error('Passwords are not the same.', 'ERROR');
      return;
    }
    this.userService.saveOrUpdateUser(this.editUser)
      .subscribe(result => {
        this.toastr.success('User was updated', 'SUCCESS');
        this.updateUsers();
        $('#editUserModal').modal('hide');
        console.log(result);
      }, error => {
        this.toastr.error('Error while saving user', 'ERROR');
      });
  }

  deleteSelectedUsers() {
    this.users.forEach((value) => {
      if(value.isSelected) {
        this.deleteUser(value);
      }
    }); 
  }

  deleteUser(user: User) {
    this.userService.deleteUser(user)
      .subscribe(response => {
        if(response === 'OK') {
          this.toastr.success('User was deleted', 'SUCCESS');
          $('#deleteUserModal').modal('hide');
          this.users.splice(this.users.indexOf(user), 1);
        }
      }, error => {
        this.toastr.error('Error while deleting user', 'ERROR');
      });
  }

  selectUser(user: User) {
    user.isSelected = true;
  }

  private updateUsers() {
    this.userService.getUsers()
      .subscribe(result => {
        this.allUsers = result;
        this.setPage(1);
      });
  }

  private setPage(page: number) {
    this.pager = this.pagerService.getPager(this.allUsers.length, page, this.countOfELementsOnPage);
    if(this.allUsers.length === 0) {
      this.users = [];
      return;
    }

    this.users = this.allUsers.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }

}
