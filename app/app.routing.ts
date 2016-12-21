import { Router, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { NotFoundComponent } from './non-found.component';
import { UsersComponent } from './users.component';
import { PostsComponent } from './posts.component';
import { AddUserComponent } from './add-user.component';
import { ConfirmDeactivate } from './confirm-deactivate.service';


export const ngProjectRouting = RouterModule.forRoot([
    { path: '', component: HomeComponent },
    { path: 'users', component: UsersComponent },
    { path: 'posts', component: PostsComponent },
    { path: 'adduser', component: AddUserComponent, canDeactivate: [ ConfirmDeactivate ] },
    { path: '**', redirectTo: '' },
]);