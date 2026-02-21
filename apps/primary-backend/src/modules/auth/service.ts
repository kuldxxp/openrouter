
export abstract class AuthService {
    static async signUp(username: string, password: string): Promise<string> {
        return "123";
    }

    static async login(username: string, password: string): Promise<string> {
        return "token-123";
    }
}
