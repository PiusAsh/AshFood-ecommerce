import { Directive, ElementRef, HostListener } from '@angular/core';
import { formatCurrency } from './currency-format';

@Directive({
  selector: '[appCurrencyFormat]'
})
export class CurrencyFormatDirective {

  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event']) onInputChange(event: Event) {
    const input = event.target as HTMLInputElement;
    let value = input.value.replace(/[^\d.]/g, '');
    value = formatCurrency(parseFloat(value));
    input.value = value;
  }
}
