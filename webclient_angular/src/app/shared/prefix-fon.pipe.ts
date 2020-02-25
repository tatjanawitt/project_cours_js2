import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'prefixFon'
})
export class PrefixFonPipe implements PipeTransform {

  transform(value: string): string {
    if (!value) { return null; }
    return `+49 (${value.substr(0, 1)})${value.substr(1)}`;
  }

}
