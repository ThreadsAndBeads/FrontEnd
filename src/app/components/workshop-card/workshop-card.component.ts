import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-workshop-card',
  templateUrl: './workshop-card.component.html',
  styleUrls: ['./workshop-card.component.css']
})
export class WorkshopCardComponent  {
  @Input() workshop: any
  
}
