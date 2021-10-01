import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Packery, PackeryOptions } from 'packery';

declare var require: any;
let DraggabillyCttr: any;
let PackeryCttr: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'ng-packery';

  @ViewChild('grid') public grid!: ElementRef<HTMLDivElement>;
  @ViewChild('sizer') public sizer!: ElementRef<HTMLDivElement>;

  private pckry!: Packery;

  constructor() {}

  ngOnInit() {
    PackeryCttr = require('packery');
    DraggabillyCttr = require('draggabilly');
  }

  ngAfterViewInit(): void {
    const options: PackeryOptions = {
      itemSelector: '.grid-item',
      columnWidth: '.grid-sizer' as any,
      gutter: 0,

      percentPosition: true,
    };
    this.pckry = new PackeryCttr(this.grid.nativeElement, options);

    console.log(this.pckry.getItemElements());

    this.pckry
      .getItemElements()
      .filter((x) => x.classList.contains('grid-item'))
      .forEach((gridItem, index) => {
        const draggie = new DraggabillyCttr(gridItem);
        this.pckry.bindDraggabillyEvents(draggie);
      });
  }
}
