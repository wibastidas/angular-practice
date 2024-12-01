import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { HighlightDirective } from '../../directives/highlight.directive';

@Component({
  selector: 'app-item-list',
  standalone: true,
  imports: [CommonModule, HighlightDirective],
  templateUrl: './item-list.component.html',
  styleUrl: './item-list.component.scss'
})
export class ItemListComponent {
  @Input() items: string[] = [];

}
