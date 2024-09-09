import axios from "axios"
interface User {
    email: string;
    email_verified_at?: Date;
    id: number;
    name: string;
    updated_at: Date;
    created_at: Date;

}
const user = ref<User | null>(null)
export const useAuth = () => {

    async function getUser(): Promise<User | null> {

        if (user.value) return user.value;
        try {
            const res = await axios.get("/user")
            const user = res.data;
            return {
                ...user,
                created_at: new Date(user.created_at),
                updated_at: new Date(user.updated_at)
            }
        } catch (err) {
            return null;
        }

    }

    async function initUser() {
        user.value = await getUser()

    }

    async function logout() {
        await axios.post("/logout");
         user.value = null;
        useRouter().replace("/login")
    }

    async function login(payload: LoginForm) {
        await axios.post("/login", payload)
        useRouter().push("/me")
    }
    interface RegisterForm {
        name: string,
        email: string,
        password: string,
        password_confirmation: string
    }

    async function register(payload: RegisterForm) {
        await axios.post("/register", payload);
        await login(
            {
                email: payload.email,
                password: payload.password
            })
    }

    interface LoginForm {
        email: string,
        password: string,
    }

   


    return {
        login,
        logout,
        register,
        initUser,
        user
    }

}