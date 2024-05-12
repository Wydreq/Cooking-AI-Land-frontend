import {
  Directive,
  OnDestroy,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { IUser } from '../interfaces/user.interface';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[appIfUserLoggedIn]',
})
export class IfUserLoggedInDirective implements OnDestroy {
  private user: IUser | null = null;
  private userSubscription: Subscription;

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private authService: AuthService
  ) {
    this.userSubscription = this.authService.user.subscribe((user) => {
      this.user = user;
      this.updateView();
    });
  }

  private updateView(): void {
    if (this.user !== null) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }
}
