import { NgModule } from '@angular/core';
import { PanelComponent } from './components/panel/panel.component';
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [
    PanelComponent
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    PanelComponent
  ]
})
export class CustomElementsModule {
}
