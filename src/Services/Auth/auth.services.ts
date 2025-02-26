import { PrismaClient } from "@prisma/client";
import { RegisterDto, registerDtoSchema } from "../../dto/auth/Register.dto";
import { patientRole } from "../../config/general.config";
import { LoginDto, loginDtoSchema } from "../../dto/auth/Login.dto";

export class AuthService{
    private prisma: PrismaClient;

    constructor(){
        // prisma instance
        this.prisma = new PrismaClient();
    }

    // registerDto is data transfer in folder dto
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

            // save data to database 
            await this.prisma.user.create({
                data: {
                    email: data.email,
                    username: data.username,
                    password: securePass ,
                    roleId: patientRole,
                    inputUn: data.username,
                }
            });

            return {
                message: 'Berhasil Register'
            }
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
    
    async login(jwtAccessToken: any, jwtRefreshToken: any, data: LoginDto){
        const validateData = loginDtoSchema.safeParse(data);

        try {
            if(!validateData.success){
                throw new Error(validateData.error.message);
            }

            const getUser = await this.prisma.user.findUnique({
                where: {
                    email: data.email
                }
            });

            if(!getUser){
                throw new Error('Email Atau Kata Sandi Salah');
            }

            const comparePass = await Bun.password.verify(data.password, getUser.password);

            if(!comparePass){
                throw new Error('Email Atau Kata Sandi Salah');
            }

            const accessToken = await jwtAccessToken.sign({
                id: getUser.id,
                email: getUser.email,
            });

            const refreshToken = await jwtRefreshToken.sign({
                id: getUser.id,
                email: getUser.email,
            });
            
            return {
               accessToken: accessToken,
               refreshToken: refreshToken
            }
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
}