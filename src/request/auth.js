import { postBody } from "@/request/http";

export function login(username, password) {
    return postBody('/sys-user/login', {
        username: username,
        password: password
    });
}