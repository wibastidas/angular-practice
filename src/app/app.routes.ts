import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { PostsComponent } from './components/posts/posts.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'acerca', component: AboutComponent },
  { path: 'contacto', component: ContactComponent },
  { path: 'posts', component: PostsComponent }
];
