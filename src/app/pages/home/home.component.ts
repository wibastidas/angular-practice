import { Component } from '@angular/core';
import { ItemListComponent } from '../../components/item-list/item-list.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ItemListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  items = ['Angular', 'React', 'Vue'];

}
