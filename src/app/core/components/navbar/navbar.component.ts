import { Component, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { AuthService } from '../../../auth/auth.service';
import { Router } from '@angular/router';
import { AvatarModule } from 'primeng/avatar';
import { MenuModule } from 'primeng/menu';
import {MenuItem} from 'primeng/api';
import {RippleModule} from "primeng/ripple";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [ButtonModule, TranslateModule, AvatarModule, MenuModule, RippleModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
  protected user: any;
  items: MenuItem[] | undefined;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.$user.subscribe((res) => (this.user = res));
    console.log(this.user);
    this.items = [
      {
        label: 'Options',
        items: [
          {
            label: 'Cookbooks',
            icon: 'pi pi-book',
            command: () => {
            this.router.navigate(['/cookbooks']);
            }
          },
          {
            label: 'Logout',
            icon: 'pi pi-sign-out',
            command: () => {
              this.logoutHandler();
            },
          },
        ],
      },
    ];
  }

  logoutHandler() {
    this.authService.logout();
  }

  signInHandler() {
    this.router.navigate(['/auth']);
  }
}
