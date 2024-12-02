import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { Post } from '../../interfaces/post.interface';

@Component({
  selector: 'app-post-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="post-detail">
      @if (loading) {
        <div class="loading">Cargando...</div>
      } @else if (error) {
        <div class="error-message">{{ error }}</div>
      } @else if (post) {
        <h2>{{ post.title }}</h2>
        <p>{{ post.body }}</p>
        <p>Post ID: {{ post.id }}</p>
      }
      <a routerLink="/posts">Volver a Posts</a>
    </div>
  `,
  styles: [`
    .post-detail {
      padding: 20px;
      max-width: 800px;
      margin: 0 auto;
    }
    .loading, .error-message {
      padding: 10px;
      border-radius: 4px;
      margin-bottom: 15px;
      text-align: center;
    }
    .error-message {
      background-color: #f8d7da;
      color: #721c24;
    }
    .loading {
      background-color: #e2e3e5;
      color: #383d41;
    }
  `]
})
export class PostDetailComponent implements OnInit {
  post: Post | null = null;
  loading = false;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.loadPost(Number(params['id']));
      }
    });
  }

  private loadPost(id: number) {
    this.loading = true;
    this.error = null;

    this.apiService.getPostById(id).subscribe({
      next: (post) => {
        this.post = post;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Error al cargar el post: ' + error.message;
        this.loading = false;
      }
    });
  }
}
