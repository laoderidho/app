import { AuthService } from "../../Services/Auth/auth.services";
import { RegisterDto, registerDtoSchema } from "../../dto/auth/Register.dto";


export class AuthController{
    private AuthServices: AuthService;

    constructor(){
        this.AuthServices = new AuthService();
    }

    async register(data: RegisterDto){
        return this.AuthServices.register(data);
    }

}