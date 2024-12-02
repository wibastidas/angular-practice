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
    path: 'posts/:id',  // Nueva ruta con parámetro
    loadComponent: () => import('./components/post-detail/post-detail.component')
      .then(m => m.PostDetailComponent),
    data: { preload: false }
  },
  {
    path: 'posts-with-comments',
    loadComponent: () => import('./components/post-with-comments/post-with-comments.component')
      .then(m => m.PostWithCommentsComponent),
    data: { preload: false }
  },
  {
    path: 'rxjs-demo',
    loadComponent: () => import('./components/rxjs-demo/rxjs-demo.component')
      .then(m => m.RxjsDemoComponent)
  },
  {
    path: 'shared-state',
    loadComponent: () => import('./components/shared-state-demo/shared-state-demo.component')
      .then(m => m.SharedStateDemoComponent)
  },
  {
    path: 'layout',
    loadComponent: () => import('./components/layout-demo/layout-demo.component')
      .then(m => m.LayoutDemoComponent)
  },
  {
    path: '**',
    redirectTo: ''
  }
];
