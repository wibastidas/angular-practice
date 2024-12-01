import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent  // Eager loading
  },
  {
    path: 'about',
    loadComponent: () => import('./pages/about/about.component')
      .then(m => m.AboutComponent),
    data: { preload: true }  // Será precargado
  },
  {
    path: 'contacto',
    loadComponent: () => import('./pages/contact/contact.component')
      .then(m => m.ContactComponent),
    data: { preload: true }  // Será precargado
  },
  {
    path: 'posts',
    loadComponent: () => import('./components/posts/posts.component')
      .then(m => m.PostsComponent),
    data: { preload: false } // Lazy loading puro
  },
  {
    path: '**',
    redirectTo: ''
  }
];
