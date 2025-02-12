import Elysia from "elysia";
import { AuthService } from "../Services/Auth/auth.services";
import { registerDtoSchema } from "../dto/auth/Register.dto";

export const authRouter = new Elysia({prefix: "/auth"})

const authServices = new AuthService()

authRouter.post("/register", async ({ body, set }) =>{
    const parseBody = registerDtoSchema.safeParse(body)

    if(!parseBody.success){
        set.status = 400
        return {
            message: parseBody.error.format()
        }
    }
    try {
        const result = await authServices.register(parseBody.data)
        set.status = 201
        return {
            message: result
        }
    } catch (error: any) {
        set.status = 400
        return {
            message: error.message
        }
    }
})

