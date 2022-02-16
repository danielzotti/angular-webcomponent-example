# Angular Web Component Example

**Aim of this project**

1. Create a library of angular components that can be used as standard web components as well.
2. Use web components in an Angular project.
3. Use web components (created with Angular) in a "normal" web app (e.g. static `index.html`)

## How to

### 1. Create a library of angular components that can be used as standard web components as well.

- Crete the main project that is used as a wrapper Angular application to manage all the library dependencies and to be
  used to create the javascript code to import in a web app: `ng new custom-elements-example`
- Generate a library to develop and collect all the custom components: `ng generate library custom-elements`.
- Create one or more components inside `custom-elements` library and export them in `public-api.ts`
  and `custom-elements.module.ts`.
- install `@angular/elements` package to easily work with custom web components in an Angular
  app: `ng add @angular/elements`.

### 2. Use web components in an Angular project.

In this example we use the PanelComponent we have just created inside the library, as a web component.

```typescript
// app.module.ts
import { CUSTOM_ELEMENTS_SCHEMA, Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';

import { PanelComponent } from '../../projects/custom-elements/src/lib/components/panel/panel.component';
import { createCustomElement } from '@angular/elements';
import { CustomElementsModule } from '../../projects/custom-elements/src/lib/custom-elements.module';

@NgModule({
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    CustomElementsModule, // This is required in the example because the library is exported by this Angular app
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA] // Required to use custom elements in an Angular app
})
export class AppModule {

  constructor(private injector: Injector) {
    // Make Angular aware of this custom elmement
    const el = createCustomElement(PanelComponent, { injector });
    customElements.define('my-panel', el);
  }
}
```

NB: `my-panel` is an arbitrary element name, and it determines how to use the web component in the HTML

```typescript
// app.module.ts
customElements.define('my-panel', el);
```

```html
<!--index.html-->
<my-panel my-title="Custom title">
  <div>Content here</div>
</my-panel>
```

### 3. Use web components (created with Angular) in a "normal" web app

Since our `custom-elements` library is written in Angular, the idea is to wrap it in an empty Angular app that manages
all the needed dependencies.

This Angular app is built as usual, and it's important to remember that, in order to use a custom element developed in
Angular, it's necessary to import all the Angular scripts that contains its dependencies:

- main.js
- polyfill.js
- runtime.js

```typescript
// app.module.ts
import { Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CustomElementsModule } from '../../projects/custom-elements/src/lib/custom-elements.module';

import { PanelComponent } from '../../projects/custom-elements/src/lib/components/panel/panel.component';
import { createCustomElement } from '@angular/elements';

@NgModule({
  imports: [
    BrowserModule,
    CustomElementsModule // This will import all the dependencies needed by the "custom-elements" library
  ],
  entryComponents: [PanelComponent],
})
export class AppModule {

  constructor(private injector: Injector) {
    const el = createCustomElement<PanelComponent>(PanelComponent, { injector });
    customElements.define('my-panel', el);
  }

  public ngDoBootstrap(): void {
    // "ngDoBootstrap" method or "bootstrap" decorator configuration are required
    // We can leave the method empty to prevent Error: NG0403
  }
}

```

```html

<body>
<!-- ... -->

<h1>Web app that uses custom elements written in Angular</h1>
<my-panel my-title="My custom title">
  <div>My custom <strong>content</strong></div>
</my-panel>

<!--
NB: main.js, polyfill.js and runtime.js are required to work with custom components created by Angular!
In this case, ng build provides to add these scripts but if you use it somewhere else, you need to do it manually:
-->
<script src="runtime.js"></script>
<script src="polyfills.js"></script>
<script src="main.js"></script>

</body>

```

NB: We don't have to write any code to bootstrap the Angular app, since we only need the custom element code and its
dependencies.

## ViewEncapsulation

There are 3 different approaches to manage the custom element encapsulation:

1. `Emulated` _(default)_: Emulates a native Shadow DOM encapsulation behavior by adding a specific attribute to the
   component's host element and applying the same attribute to all the CSS selectors provided via styles or styleUrls.

2. `None`: Doesn't provide any sort of CSS style encapsulation, meaning that all the styles provided via styles or
   styleUrls are applicable to any HTML element of the application regardless of their host Component.

3. `ShadowDom`: Uses the browser's native Shadow DOM API to encapsulate CSS styles, meaning that it creates a ShadowRoot
   for the component's host element which is then used to encapsulate all the Component's styling.

The selected approach is set in the component decorator this way:

```typescript
@Component({
  selector: 'lib-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss'],
  // encapsulation: ViewEncapsulation.Emulated // default
  encapsulation: ViewEncapsulation.ShadowDom
  // encapsulation: ViewEncapsulation.None
})
export class PanelComponent implements OnInit {
  // ....
}

```

More info: https://angular.io/api/core/ViewEncapsulation

## Dependencies

- `Angular`: this project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.2.3.
- `http-server` (optional): to run `index.html` as if it's run in a server.

## Demo
Try a simple [Demo](https://danielzotti.github.io/angular-webcomponent-example) created on  GitHub Pages with both approaches (Angular and simple webapp)
