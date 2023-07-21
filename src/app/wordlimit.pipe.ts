import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'wordlimit'
})
export class WordlimitPipe implements PipeTransform {

  transform(value: string, limit: number): string {
    if (!value) return '';

    const words = value.split(' ');
    if (words.length <= limit) return value;

    return words.slice(0, limit).join(' ') + '...';
  }

}
