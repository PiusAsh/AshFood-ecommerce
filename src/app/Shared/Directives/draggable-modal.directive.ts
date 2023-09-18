import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appDraggableModal]'
})
export class DraggableModalDirective {
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngAfterViewInit() {
    const modalHeader = this.el.nativeElement.querySelector('.modal-header');
    this.renderer.setStyle(modalHeader, 'cursor', 'move');
    this.renderer.setStyle(this.el.nativeElement, 'position', 'absolute');
    this.renderer.setStyle(this.el.nativeElement, 'z-index', '1000');

    let offsetX: number;
    let offsetY: number;
    let isMouseDown = false;

    modalHeader.addEventListener('mousedown', (e) => {
      isMouseDown = true;
      offsetX = e.clientX - this.el.nativeElement.getBoundingClientRect().left;
      offsetY = e.clientY - this.el.nativeElement.getBoundingClientRect().top;
    });

    window.addEventListener('mousemove', (e) => {
      if (!isMouseDown) return;

      const left = e.clientX - offsetX;
      const top = e.clientY - offsetY;

      this.renderer.setStyle(this.el.nativeElement, 'left', left + 'px');
      this.renderer.setStyle(this.el.nativeElement, 'top', top + 'px');
    });

    window.addEventListener('mouseup', () => {
      isMouseDown = false;
    });
  }
}
