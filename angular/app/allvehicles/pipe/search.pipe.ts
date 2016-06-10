import {Pipe} from '@angular/core';

@Pipe({
  name: 'SearchPipe'
})

export class SearchPipe {

   
 transform (value, [queryString]) {
    if (value==null) {
      return null;
    }
	if (value=="") {
      return null;
    }
	
	if(queryString !== undefined){
		return value.filter(item=>item.name.toLowerCase().indexOf(queryString.toLowerCase()) !== -1);
	}else{
		return value;
	}
  }
}