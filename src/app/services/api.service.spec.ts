import { TestBed } from '@angular/core/testing';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ApiService } from './api.service';
import { Post } from '../interfaces/post.interface';

describe('ApiService', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;
  let baseUrl: string;

  // Mock data
  const mockPost: Post = {
    id: 1,
    userId: 1,
    title: 'Test Post',
    body: 'Test Content'
  };

  const mockPosts: Post[] = [
    mockPost,
    {
      id: 2,
      userId: 1,
      title: 'Second Post',
      body: 'More Content'
    }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ApiService,
        provideHttpClient(withFetch()),
        provideHttpClientTesting()
      ]
    });

    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
    baseUrl = 'https://jsonplaceholder.typicode.com/posts';
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getPosts', () => {
    it('should return all posts', () => {
      // Act
      service.getPosts().subscribe(posts => {
        // Assert
        expect(posts).toEqual(mockPosts);
        expect(posts.length).toBe(2);
      });

      // Assert - Verificar la petición HTTP
      const req = httpMock.expectOne(baseUrl);
      expect(req.request.method).toBe('GET');
      req.flush(mockPosts);
    });
  });

  describe('getPostById', () => {
    it('should return a single post', () => {
      // Arrange
      const postId = 1;

      // Act
      service.getPostById(postId).subscribe(post => {
        // Assert
        expect(post).toEqual(mockPost);
      });

      // Assert - Verificar la petición HTTP
      const req = httpMock.expectOne(`${baseUrl}/${postId}`);
      expect(req.request.method).toBe('GET');
      req.flush(mockPost);
    });
  });

  describe('createPost', () => {
    it('should create a new post', () => {
      // Arrange
      const newPost: Omit<Post, 'id'> = {
        userId: 1,
        title: 'New Post',
        body: 'New Content'
      };

      // Act
      service.createPost(newPost).subscribe(post => {
        // Assert
        expect(post.id).toBeDefined();
        expect(post.title).toBe(newPost.title);
      });

      // Assert - Verificar la petición HTTP
      const req = httpMock.expectOne(baseUrl);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(newPost);
      req.flush({ ...newPost, id: 1 });
    });
  });

  describe('updatePost', () => {
    it('should update an existing post', () => {
      // Arrange
      const postId = 1;
      const updatedPost: Post = {
        ...mockPost,
        title: 'Updated Title'
      };

      // Act
      service.updatePost(postId, updatedPost).subscribe(post => {
        // Assert
        expect(post).toEqual(updatedPost);
      });

      // Assert - Verificar la petición HTTP
      const req = httpMock.expectOne(`${baseUrl}/${postId}`);
      expect(req.request.method).toBe('PUT');
      expect(req.request.body).toEqual(updatedPost);
      req.flush(updatedPost);
    });
  });

  describe('deletePost', () => {
    it('should delete a post', () => {
      // Arrange
      const postId = 1;

      // Act
      service.deletePost(postId).subscribe(response => {
        // Assert
        expect(response).toBeNull();
      });

      // Assert - Verificar la petición HTTP
      const req = httpMock.expectOne(`${baseUrl}/${postId}`);
      expect(req.request.method).toBe('DELETE');
      req.flush(null);
    });
  });
});
