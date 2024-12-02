import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { Post } from '../../interfaces/post.interface';
import { PostComment } from '../../interfaces/comment.interface';
import { LoadingState } from '../../enums/loading-state.enum';

interface PostWithComments extends Post {
  comments?: PostComment[];
  loadingState?: LoadingState;
}

@Component({
  selector: 'app-post-with-comments',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="posts-container">
      <h2>Posts con Comentarios</h2>

      @if (error) {
        <div class="error-message">{{ error }}</div>
      }

      @if (loadingState === LoadingState.Loading) {
        <div class="loading">Cargando posts...</div>
      }

      @for (post of posts; track post.id) {
        <div class="post-card">
          <h3>{{ post.title }}</h3>
          <p>{{ post.body }}</p>

          @if (post.loadingState === LoadingState.Loading) {
            <p>Cargando comentarios...</p>
          }

          @if (post.comments?.length) {
            <div class="comments-section">
              <h4>Comentarios ({{ post.comments?.length }})</h4>
              @for (comment of post.comments; track comment.id) {
                <div class="comment">
                  <strong>{{ comment.email }}</strong>
                  <p>{{ comment.body }}</p>
                </div>
              }
            </div>
          }
        </div>
      }
    </div>
  `,
  styles: [`
    .posts-container {
      padding: 20px;
      max-width: 800px;
      margin: 0 auto;
    }
    .post-card {
      border: 1px solid #ddd;
      padding: 15px;
      margin-bottom: 15px;
      border-radius: 4px;
    }
    .comments-section {
      margin-top: 15px;
      padding-top: 15px;
      border-top: 1px solid #eee;
    }
    .comment {
      padding: 10px;
      margin: 5px 0;
      background-color: #f9f9f9;
      border-radius: 4px;
    }
    .error-message {
      color: #721c24;
      background-color: #f8d7da;
      padding: 10px;
      border-radius: 4px;
      margin-bottom: 15px;
    }
    .loading {
      text-align: center;
      padding: 20px;
      color: #666;
    }
  `]
})
export class PostWithCommentsComponent implements OnInit {
  posts: PostWithComments[] = [];
  loadingState = LoadingState.Idle;
  error: string | null = null;
  protected LoadingState = LoadingState;

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.loadPostsWithComments();
  }

  async loadPostsWithComments() {
    try {
      this.loadingState = LoadingState.Loading;
      this.error = null;

      const posts = await this.apiService.getPostsPromise();
      this.posts = posts.slice(0, 5);

      await Promise.all(
        this.posts.map(async (post) => {
          post.loadingState = LoadingState.Loading;
          try {
            post.comments = await this.apiService.getCommentsForPostPromise(post.id);
            post.loadingState = LoadingState.Loaded;
          } catch (error) {
            console.error(`Error loading comments for post ${post.id}:`, error);
            post.loadingState = LoadingState.Error;
          }
        })
      );

      this.loadingState = LoadingState.Loaded;
    } catch (error: any) {
      this.error = 'Error al cargar los posts: ' + error.message;
      this.loadingState = LoadingState.Error;
    }
  }
}
