import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'lib-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss'],
  // See: https://angular.io/api/core/ViewEncapsulation
  // encapsulation: ViewEncapsulation.Emulated // default
  encapsulation: ViewEncapsulation.ShadowDom
  // encapsulation: ViewEncapsulation.None
})
export class PanelComponent implements OnInit {

  @Input() myTitle = 'Default title';

  isCollapsed = false;

  constructor() {
  }

  ngOnInit(): void {
  }

  toggleContent() {
    this.isCollapsed = !this.isCollapsed;
  }
}
