import { AppServices } from "../Services/app.services";

export class AppController{
    private service: AppServices;

    constructor(){
        this.service = new AppServices();
    }

    async getHello(){
       return this.service.getHello();
    }
}