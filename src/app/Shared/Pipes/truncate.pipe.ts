import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate'
})
export class TruncatePipe implements PipeTransform {
  transform(value: string): string {
    const words = value.split(' ');
    return words.slice(0, 20).join(' ') + (words.length > 20 ? '...' : '');
  }
}
@Pipe({
  name: 'truncateDescription'
})
export class ProductDescriptionPipe implements PipeTransform {
  transform(value: string): string {
    const words = value.split(' ');
    return words.slice(0, 16).join(' ') + (words.length > 16 ? '...' : '');
  }
}
@Pipe({
  name: 'AdminTruncate'
})
export class AdminTruncatePipe implements PipeTransform {
  transform(value: string): string {
    const words = value.split(' ');
    return words.slice(0, 10).join(' ') + (words.length > 20 ? '...' : '');
  }
}
