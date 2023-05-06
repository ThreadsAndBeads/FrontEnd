import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './about-us/about-us.component';
import { HorizontallScrollComponent } from './components/horizontall-scroll/horizontall-scroll.component';

const routes: Routes = [

  { path: 'about', component: AboutUsComponent },
  {path:'/',component:HorizontallScrollComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
