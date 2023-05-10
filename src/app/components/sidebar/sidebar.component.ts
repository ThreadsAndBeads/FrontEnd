import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  ngOnInit(): void {
    document.addEventListener("DOMContentLoaded", (event) => {
      const showNavbar = (toggleId: string, navId: string, bodyId: string, headerId: string) => {
        console.log("hereeeeeee");
        const toggle = document.getElementById(toggleId);
        const nav = document.getElementById(navId);
        const bodypd = document.getElementById(bodyId);
        const headerpd = document.getElementById(headerId);
    
        // Validate that all variables exist
        if (toggle && nav && bodypd && headerpd) {
           toggle.addEventListener('click', () => {
            // show navbar
            nav.classList.toggle('show');
            // change icon
            toggle.classList.toggle('bx-x');
            // add padding to body
            bodypd.classList.toggle('body-pd');
            // add padding to header
            headerpd.classList.toggle('body-pd');
          });
        }
      };
    
      showNavbar('header-toggle', 'nav-bar', 'body-pd', 'header');
    
      /*===== LINK ACTIVE =====*/
      const linkColor = document.querySelectorAll('.nav_link');
    
      function colorLink(this: HTMLElement) {
        if (linkColor) {
          linkColor.forEach(l => l.classList.remove('active'));
          this.classList.add('active');
        }
      }
    
      linkColor.forEach(l => l.addEventListener('click', colorLink));
    
      // Your code to run since DOM is loaded and ready
    });  }

}
