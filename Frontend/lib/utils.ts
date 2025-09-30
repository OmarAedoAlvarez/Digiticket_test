import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function loginRequest(email: string, password: string) {
  return new Promise<any>((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.open("POST", "/api/auth/login", true)
    xhr.setRequestHeader("Content-Type", "application/json")

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve(JSON.parse(xhr.responseText))
      } else {
        reject(JSON.parse(xhr.responseText))
      }
    }

    xhr.onerror = () => reject({ message: "Error de red" })
    xhr.send(JSON.stringify({ email, password }))
  })
}
