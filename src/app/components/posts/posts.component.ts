import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Post } from '../../interfaces/post.interface';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="posts-container">
      <h2>Posts</h2>

      <!-- Mensaje de error global -->
      <div *ngIf="error" class="error-message">
        {{ error }}
      </div>

      <!-- Indicador de carga -->
      <div *ngIf="loading" class="loading">
        Cargando...
      </div>

      <!-- Formulario para crear/editar -->
      <div class="post-form">
        <input [(ngModel)]="newPost.title" placeholder="Título" [disabled]="loading">
        <textarea [(ngModel)]="newPost.body" placeholder="Contenido" [disabled]="loading"></textarea>
        <button
          (click)="selectedPost ? updatePost() : createPost()"
          [disabled]="loading || !newPost.title || !newPost.body">
          {{selectedPost ? 'Actualizar' : 'Crear'}} Post
        </button>
      </div>

      <!-- Lista de posts -->
      <div class="posts-list">
        <div *ngFor="let post of posts" class="post-item">
          <h3>{{post.title}}</h3>
          <p>{{post.body}}</p>
          <div class="post-actions">
            <button (click)="editPost(post)" [disabled]="loading">Editar</button>
            <button (click)="deletePost(post.id)" [disabled]="loading">Eliminar</button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .posts-container {
      padding: 20px;
    }
    .error-message {
      background-color: #f8d7da;
      color: #721c24;
      padding: 10px;
      border-radius: 4px;
      margin-bottom: 15px;
    }
    .loading {
      background-color: #e2e3e5;
      color: #383d41;
      padding: 10px;
      border-radius: 4px;
      margin-bottom: 15px;
      text-align: center;
    }
    .post-form {
      margin-bottom: 20px;
      display: flex;
      flex-direction: column;
      gap: 10px;
      max-width: 500px;
    }
    .post-item {
      border: 1px solid #ddd;
      padding: 15px;
      margin-bottom: 10px;
      border-radius: 4px;
    }
    .post-actions {
      display: flex;
      gap: 10px;
    }
    button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  `]
})
export class PostsComponent implements OnInit {
  posts: Post[] = [];
  selectedPost: Post | null = null;
  newPost: Omit<Post, 'id'> = {
    userId: 1,
    title: '',
    body: ''
  };
  loading = false;
  error: string | null = null;

  constructor(private apiService: ApiService) {
    console.log('PostsComponent loaded');
  }

  ngOnInit() {
    this.loadPosts();
  }

  loadPosts() {
    this.loading = true;
    this.error = null;

    this.apiService.getPosts()
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: (posts) => {
          this.posts = posts;
        },
        error: (error) => {
          this.error = 'Error al cargar los posts: ' + error.message;
        }
      });
  }

  createPost() {
    if (!this.newPost.title || !this.newPost.body) return;

    this.loading = true;
    this.error = null;

    this.apiService.createPost(this.newPost)
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: () => {
          this.loadPosts();
          this.resetForm();
        },
        error: (error) => {
          this.error = 'Error al crear el post: ' + error.message;
        }
      });
  }

  updatePost() {
    if (!this.selectedPost || !this.newPost.title || !this.newPost.body) return;

    this.loading = true;
    this.error = null;

    this.apiService.updatePost(this.selectedPost.id, {
      ...this.selectedPost,
      title: this.newPost.title,
      body: this.newPost.body
    })
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: () => {
          this.loadPosts();
          this.resetForm();
        },
        error: (error) => {
          this.error = 'Error al actualizar el post: ' + error.message;
        }
      });
  }

  deletePost(id: number) {
    this.loading = true;
    this.error = null;

    this.apiService.deletePost(id)
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: () => {
          this.loadPosts();
        },
        error: (error) => {
          this.error = 'Error al eliminar el post: ' + error.message;
        }
      });
  }

  editPost(post: Post) {
    this.selectedPost = post;
    this.newPost = {
      userId: post.userId,
      title: post.title,
      body: post.body
    };
  }

  resetForm() {
    this.selectedPost = null;
    this.newPost = {
      userId: 1,
      title: '',
      body: ''
    };
  }
}
