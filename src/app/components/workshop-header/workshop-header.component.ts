import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-workshop-header',
  templateUrl: './workshop-header.component.html',
  styleUrls: ['./workshop-header.component.css']
})
export class WorkshopHeaderComponent implements OnInit {
  ngOnInit(): void {
    const colors = ['#456268','#F9D949','#D0E8F2'];
    var blobs = document.querySelectorAll("#background path")  as NodeListOf<SVGPathElement>;;
    
    blobs.forEach(blob => {
        blob.style.fill = colors[Math.floor(Math.random() * colors.length)];
    });
    }
}
