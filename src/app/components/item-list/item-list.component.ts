import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Item } from '../../interfaces/item.interface';

@Component({
  selector: 'app-item-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss']
})
export class ItemListComponent {
  @Input() items: Item[] = [];
}
