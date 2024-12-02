import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from '../../types/user.type';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="user-card">
      <h3>{{ user.name }}</h3>
      <p>Email: {{ user.email }}</p>
      <p>Role: {{ user.role }}</p>
    </div>
  `,
  styles: [`
    .user-card {
      border: 1px solid #ddd;
      padding: 15px;
      margin-bottom: 15px;
      border-radius: 4px;
    }
  `]
})
export class UserComponent implements OnInit {
  user: User = {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'admin'
  };

  constructor() {}

  ngOnInit() {}
}
