import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'range'
})
export class RangePipe implements PipeTransform {

  // transform(items: any[], min: number, max: number): any[] {
  //   if (!items) return [];
  //   return items.filter(item => item >= min && item <= max);
  // }
  transform(items: any[], min: number, max: number): any[] {
    if (!items) return [];
    return items.filter(item => {
      const price = parseInt(item.price.replace(/[^\d]/g, '')); // Remove non-digit characters from the price
      return price >= min && price <= max;
    });
  }

}
