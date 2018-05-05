import { Employee } from '../clases/employee';
import { Service } from '../clases/service';

export class Appointment{

    constructor(
        public id: number,
        public name: string,
        public service: string,
        public employee: string,
        public day: string,
        public hour: string
    ){

    }

}