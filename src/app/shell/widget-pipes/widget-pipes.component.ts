

import { Component, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'widget-pipes',
    templateUrl: './widget-pipes.template.html',
    styleUrls: ['./widget-pipes.styles.scss']
})
export class WidgetPipesComponent {

    private location: string;

    constructor(private el: ElementRef, private route: ActivatedRoute) { }

    public ngOnInit(): void {
        this.route.paramMap.subscribe((params) => {
            if (params.has('location')) {
                this.location = params.get('location');
                setTimeout(() => this.scroll(), 1000);
            }
        });

    }

    public scroll() {
        if (!this.el || !this.el.nativeElement) { return setTimeout(() => this.scroll(), 500); }
        const el: HTMLElement = this.el.nativeElement.querySelector(`${this.location}-showcase`);
        if (!el) { return setTimeout(() => this.scroll(), 200); }
        el.scrollIntoView({ behavior: 'smooth', inline: 'start' });
    }
}
