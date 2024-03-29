import { LOGIN } from "../utils/AuthConfig";
import { apiPost, clearUserData, setUserData} from "../utils/utils";

export function login(data) {
    return new Promise((resolve, reject) => {
        return apiPost(LOGIN, data).then((res) => {
            // if (res.data.emailVerified) {
            setUserData(res);
            return
            // }
            // resolve(res)
        }).catch((error) => {
            reject(error)
        })
    })
}

export function signIn(data) {
    return apiPost(LOGIN, data)
}

export function logout() {

    clearUserData()
}