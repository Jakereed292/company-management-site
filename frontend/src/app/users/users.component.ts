import { Component, OnInit } from '@angular/core';
import { FullUserDto } from '../models/full-user.dto';
import { CompanyService } from '../services/company.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {
  users: FullUserDto[] = [];
  selectedCompanyId: number | null = null;
  currentUser: FullUserDto | null = null;

  constructor(
    private companyService: CompanyService,
    private router: Router,
    private authService: AuthService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.authService.getCurrentUser();
    if(!this.currentUser){
      this.router.navigate(['/login']);
    }
    this.selectedCompanyId = this.authService.getCurrentCompanyId();
    this.currentUser = this.authService.getCurrentUser();
    this.fetchUsers(this.selectedCompanyId);
  }

  async fetchUsers(companyId: number | null) {
    if(companyId) {
    try {
      this.users = await this.companyService.getUsersByCompanyId(companyId);
    } catch (error) {
      console.error('Failed to load users', error);
    }
  }
}

  navigateToAddUser() {
    this.router.navigate(['/add-user']);
  }
}
