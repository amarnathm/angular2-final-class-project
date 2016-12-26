import { Router, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { NotFoundComponent } from './not-found.component';
import { UsersComponent } from './users/users.component';
import { PostsComponent } from './posts/posts.component';
import { AddUserComponent } from './users/add-user.component';
import { ConfirmDeactivate } from './shared/confirm-deactivate.service';


export const ngProjectRouting = RouterModule.forRoot([
    { path: '', component: HomeComponent },
    { path: 'users', component: UsersComponent },
    { path: 'posts', component: PostsComponent },
    { path: 'adduser', component: AddUserComponent, canDeactivate: [ConfirmDeactivate] },
    { path: 'edituser/:id', component: AddUserComponent, canDeactivate: [ ConfirmDeactivate ] },
    { path: 'notfound', component: NotFoundComponent },
    { path: '**', redirectTo: 'notfound' },
]);