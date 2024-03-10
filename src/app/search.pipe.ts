import { Pipe, PipeTransform } from '@angular/core';
import { Product } from './shared/interfaces/product';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(product:Product[],term:string): Product[] {
    return product.filter((product)=>product.title.toLowerCase().includes(term.toLowerCase()));
  }

}
