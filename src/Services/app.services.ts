export class AppServices {
    
    async getHello(): Promise<{ message: string }> {
        return {
            message: "Hello Elysia"
        }
    }
}