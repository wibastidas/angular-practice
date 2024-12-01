import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemListComponent } from '../../components/item-list/item-list.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ItemListComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  items = [
    { id: 1, name: 'Item 1' },
    { id: 2, name: 'Item 2' },
    { id: 3, name: 'Item 3' }
  ];

  constructor() {
    console.log('HomeComponent loaded immediately');
  }
}
