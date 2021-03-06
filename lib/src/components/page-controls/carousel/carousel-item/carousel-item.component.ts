
import { Component, OnInit, ElementRef, Renderer2 } from '@angular/core';

import { CarouselComponent } from '../carousel.component';
import { BaseWidgetComponent } from '../../../../shared/base.component';

export interface ICarouselSettings {
    items: {
        mobile: number;
        tablet: number;
        desktop: number;
    }
}

@Component({
    selector: 'carousel-item',
    templateUrl: './carousel-item.template.html',
    styleUrls: ['./carousel-item.styles.scss']
})
export class CarouselItemComponent extends BaseWidgetComponent implements OnInit {
    public parent: CarouselComponent;
    public model: { [name: string]: any } = {};

    constructor(private el: ElementRef, private renderer: Renderer2) {
        super();
    }

    public ngOnInit(): void {
        this.timeout('show', () => this.model.show = true);
    }

    public tap() {
        if (this.parent) {
            this.parent.tap(this.model.index);
        }
    }

    public updateWidth() {
        if (!this.el || !this.el.nativeElement) { return; }
        this.renderer.setStyle(this.el.nativeElement, 'width', `${this.model.width * 100}%`);
    }
}