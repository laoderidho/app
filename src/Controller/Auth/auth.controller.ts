import Elysia from "elysia";
import { AuthService } from "../../Services/Auth/auth.services";
import { registerDtoSchema } from "../../dto/auth/Register.dto";
import { jwtAccessToken, jwtRefreshToken } from "../../config/jwt.config";
import { loginDtoSchema } from "../../dto/auth/Login.dto";

export const authController = new Elysia({prefix: "/auth"})

// service instance
const authServices = new AuthService()

// token configuration
authController.use(jwtAccessToken).use(jwtRefreshToken)

authController.post("/register", async ({ body, set }) =>{
    const parseBody = registerDtoSchema.safeParse(body)

    if(!parseBody.success){
        set.status = 400
        return {
            message: parseBody.error.format()
        }
    }

    try {
        // call services Method
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

authController.post("/login", async ({ cookie: { token } ,jwtAccessToken, jwtRefreshToken, body, set }) =>{
    const parseBody = loginDtoSchema.safeParse(body)

    if(!parseBody.success){
        set.status = 400
        return {
            message: parseBody.error.format()
        }
    }

    try {
        const getToken = await authServices.login(jwtAccessToken, jwtRefreshToken, parseBody.data)

        const {refreshToken, accessToken} = getToken

        token.value = refreshToken
        token.httpOnly = true
        set.status = 200
        return {
            message: 'Berhasil Login',
            token: accessToken
        }
    } catch (error: any) {
        set.status = 401
        return {
            message: error.message
        }
    }

})

