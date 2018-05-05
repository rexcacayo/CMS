import { Service } from './service'

export class Employee{

    constructor(
        public id: number,
        public name: string,
        public services: Service[],
        public isChecked: boolean
    ){

    }

}