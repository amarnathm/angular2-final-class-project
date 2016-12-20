import { Router, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { NotFoundComponent } from './non-found.component';
import { UsersComponent } from './users.component';
import { PostsComponent } from './posts.component';
import { AddUserComponent } from './add-user.component';


export const ngProjectRouting = RouterModule.forRoot([
    { path: '', component: HomeComponent },
    { path: 'users', component: UsersComponent },
    { path: 'posts', component: PostsComponent },
    { path: 'adduser', component: AddUserComponent },
    { path: '**', redirectTo: '' },
]);