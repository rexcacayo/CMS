import { Employee } from './employee'

export class Service{

    constructor(
        public id: number,
        public name: string,
        public employees: Employee[],
        public isChecked: boolean
    ){

    }

}