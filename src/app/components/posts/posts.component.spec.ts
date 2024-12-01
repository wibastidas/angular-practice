import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { PostsComponent } from './posts.component';
import { ApiService } from '../../services/api.service';
import { Post } from '../../interfaces/post.interface';
import { of, throwError } from 'rxjs';
import { FormsModule } from '@angular/forms';

describe('PostsComponent', () => {
  let component: PostsComponent;
  let fixture: ComponentFixture<PostsComponent>;
  let apiService: jasmine.SpyObj<ApiService>;

  const mockPosts: Post[] = [
    {
      id: 1,
      userId: 1,
      title: 'Test Post',
      body: 'Test Content'
    },
    {
      id: 2,
      userId: 1,
      title: 'Second Post',
      body: 'More Content'
    }
  ];

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('ApiService', ['getPosts', 'createPost', 'updatePost', 'deletePost']);
    spy.getPosts.and.returnValue(of(mockPosts));
    spy.createPost.and.returnValue(of({ ...mockPosts[0], id: 3 }));
    spy.updatePost.and.returnValue(of(mockPosts[0]));
    spy.deletePost.and.returnValue(of(null));

    await TestBed.configureTestingModule({
      imports: [PostsComponent, FormsModule],
      providers: [
        { provide: ApiService, useValue: spy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PostsComponent);
    component = fixture.componentInstance;
    apiService = TestBed.inject(ApiService) as jasmine.SpyObj<ApiService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load posts on init', () => {
    expect(apiService.getPosts).toHaveBeenCalled();
    expect(component.posts).toEqual(mockPosts);
    expect(component.error).toBeNull();
  });

  it('should handle error when loading posts fails', fakeAsync(() => {
    // Arrange
    apiService.getPosts.and.returnValue(throwError(() => new Error('Network error')));

    // Act
    component.posts = []; // Resetear el estado inicial
    component.loadPosts();
    tick(); // Importante: esperar a que se complete la operación asíncrona

    // Assert
    expect(component.error).toContain('Error al cargar los posts');
    expect(component.posts).toEqual([]);
  }));

  it('should create a new post', fakeAsync(() => {
    // Arrange
    const newPostData = {
      userId: 1,
      title: 'New Post',
      body: 'New Content'
    };
    component.newPost = { ...newPostData };

    // Act
    component.createPost();
    tick();

    // Assert
    expect(apiService.createPost).toHaveBeenCalledWith(newPostData);
    expect(apiService.getPosts).toHaveBeenCalled();
    // Verificar que el formulario se resetea después de crear
    expect(component.newPost).toEqual({
      userId: 1,
      title: '',
      body: ''
    });
  }));

  it('should not create post if title or body is empty', () => {
    component.newPost = {
      userId: 1,
      title: '',
      body: ''
    };
    component.createPost();
    expect(apiService.createPost).not.toHaveBeenCalled();
  });

  it('should update an existing post', fakeAsync(() => {
    // Arrange
    const updatedPost = { ...mockPosts[0], title: 'Updated Title' };
    component.selectedPost = mockPosts[0];
    component.newPost = {
      userId: 1,
      title: 'Updated Title',
      body: 'Updated Content'
    };

    // Act
    component.updatePost();
    tick();

    // Assert
    expect(apiService.updatePost).toHaveBeenCalledWith(mockPosts[0].id, {
      ...mockPosts[0],
      title: 'Updated Title',
      body: 'Updated Content'
    });
    expect(component.selectedPost).toBeNull();
  }));

  it('should delete a post', fakeAsync(() => {
    // Act
    component.deletePost(1);
    tick();

    // Assert
    expect(apiService.deletePost).toHaveBeenCalledWith(1);
    expect(apiService.getPosts).toHaveBeenCalled();
  }));

  it('should set up post for editing', () => {
    // Act
    component.editPost(mockPosts[0]);

    // Assert
    expect(component.selectedPost).toEqual(mockPosts[0]);
    expect(component.newPost.title).toBe(mockPosts[0].title);
    expect(component.newPost.body).toBe(mockPosts[0].body);
  });

  it('should reset form', () => {
    // Arrange
    component.selectedPost = mockPosts[0];
    component.newPost = {
      userId: 1,
      title: 'Test',
      body: 'Test'
    };

    // Act
    component.resetForm();

    // Assert
    expect(component.selectedPost).toBeNull();
    expect(component.newPost).toEqual({
      userId: 1,
      title: '',
      body: ''
    });
  });

  it('should handle error when creating post fails', fakeAsync(() => {
    // Arrange
    component.newPost = {
      userId: 1,
      title: 'New Post',
      body: 'New Content'
    };
    apiService.createPost.and.returnValue(throwError(() => new Error('Network error')));

    // Act
    component.createPost();
    tick();

    // Assert
    expect(component.error).toContain('Error al crear el post');
  }));

  it('should handle error when updating post fails', fakeAsync(() => {
    // Arrange
    component.selectedPost = mockPosts[0];
    component.newPost = {
      userId: 1,
      title: 'Updated Title',
      body: 'Updated Content'
    };
    apiService.updatePost.and.returnValue(throwError(() => new Error('Network error')));

    // Act
    component.updatePost();
    tick();

    // Assert
    expect(component.error).toContain('Error al actualizar el post');
  }));

  it('should handle error when deleting post fails', fakeAsync(() => {
    // Arrange
    apiService.deletePost.and.returnValue(throwError(() => new Error('Network error')));

    // Act
    component.deletePost(1);
    tick();

    // Assert
    expect(component.error).toContain('Error al eliminar el post');
  }));
});
