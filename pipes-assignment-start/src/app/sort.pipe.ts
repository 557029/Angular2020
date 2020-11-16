import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {
  transform(value: [{ name: '', instanceType: '', started: null}]): unknown {
    return value.sort((a, b) => {
      return a.name.localeCompare(b.name);
    });
  }

}
