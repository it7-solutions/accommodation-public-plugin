import {Injectable} from "@angular/core";

@Injectable()
export class It7ErrorService {

    fire(message:string){
        alert(message);
    }
}