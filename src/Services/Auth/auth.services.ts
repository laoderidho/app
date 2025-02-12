import { PrismaClient } from "@prisma/client";
import { RegisterDto, registerDtoSchema } from "../../dto/auth/Register.dto";
import { patientRole } from "../../config/general.config";

export class AuthService{
    private prisma: PrismaClient;

    constructor(){
        this.prisma = new PrismaClient();
    }

    async register(data: RegisterDto){
        const validateData = registerDtoSchema.safeParse(data);

        try {
            if(!validateData.success){
                throw new Error(validateData.error.message);
            }

            const getEmail = await this.prisma.user.findUnique({
                where: {
                    email: data.email
                }
            });

            if(getEmail){
                throw new Error('Email Sudah Terdaftar');
            }

            const securePass = await Bun.password.hash(data.password);

            await this.prisma.user.create({
                data: {
                    email: data.email,
                    password: securePass ,
                    roleId: patientRole
                }
            });

            return {
                message: 'Berhasil Register'
            }
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
    

}