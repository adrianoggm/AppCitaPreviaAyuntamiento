import { RouterModule,Routes } from '@angular/router';
import { LoginComponent } from './shared/components/login/login.component';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: AppComponent },
  { path: '**', redirectTo: 'login' }
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule {}