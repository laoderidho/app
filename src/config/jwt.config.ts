import {jwt} from "@elysiajs/jwt"

export const jwtAccessToken = jwt({
    name: "jwtAccessToken",
    secret: process.env.JWT_SECRET_ACCESS_TOKEN,
    exp: process.env.JWT_ACCESS_TOKEN_EXPIRES_IN,
    alg: "HS256"
})

export const jwtRefreshToken = jwt({
    name: "jwtRefreshToken",
    secret: process.env.JWT_SECRET_REFRESH_TOKEN,
    exp: process.env.JWT_REFRESH_TOKEN_EXPIRES_IN,
    alg: "HS256"
})

