import { ApplicationRef, CUSTOM_ELEMENTS_SCHEMA, Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';

import { PanelComponent } from '../../projects/custom-elements/src/lib/components/panel/panel.component';
import { createCustomElement } from '@angular/elements';
import { CustomElementsModule } from '../../projects/custom-elements/src/lib/custom-elements.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CustomElementsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [PanelComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA] // Required to use custom components in an Angular app
})
export class AppModule {

  constructor(private injector: Injector) {
    const el = createCustomElement<PanelComponent>(PanelComponent, { injector });
    customElements.define('my-panel', el);
  }

  /*public ngDoBootstrap(appRef: ApplicationRef): void {
    if(document.querySelector('dz-root')) {
      appRef.bootstrap(AppComponent);
    }
  }*/
}
