import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Workshop } from 'src/app/model/workshop.model';

@Component({
  selector: 'app-workshop-card',
  templateUrl: './workshop-card.component.html',
  styleUrls: ['./workshop-card.component.css']
})
export class WorkshopCardComponent  {
   @Input() workshopp: any

  @Input() workshop: Workshop | null = null;
  @Output() click: EventEmitter<Workshop> = new EventEmitter<Workshop>();

  onClick(): void {
    if (this.workshop) {
      this.click.emit(this.workshop);
    }
  }
}



