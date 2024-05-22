import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CredentialsDto } from '../models/credentials.dto';
import { FullUserDto } from '../models/full-user.dto';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  credentials: CredentialsDto = {
    username: '',
    password: ''
  };

  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  async onSubmit(): Promise<void> {
    try {
      const response = await this.authService.login(this.credentials);
      console.log('Login response:', response);
      if (response) {
        console.log("loging successful")
        if (response.admin) {
          console.log("admin")
          this.router.navigate(['/company-select']); // Redirect to company selection page for admins
        } else {
          this.authService.setCurrentCompanyId(response.companies[0].id);
          console.log(this.authService.getCurrentUser());
          this.router.navigate(['/announcements']); // Redirect to user dashboard for non-admins
        }
      } else {
        console.error('Unexpected response structure:', response);
        this.errorMessage = 'Unexpected response structure.';
      }
    } catch (error) {
      console.error('Login failed', error);
      this.errorMessage = 'Login failed. Please check your credentials and try again.';
    }
  }
}