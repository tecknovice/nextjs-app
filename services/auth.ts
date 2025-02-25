import { Auth } from "@/types/auth"
import { post } from "@/lib/httpClient"

export function signup(credential: Auth) {
  return post("/auth/signup", credential)
}

export function signin(credential: Auth) {
  return post("/auth/signin", credential)
}

export function signout() {
  return post("/auth/signout", {})
}
