"use client"

import { useState } from "react"
import type { LoginFormData, FormErrors, LoginFormState } from "../types"
import { loginRequest } from "../../lib/utils"
import type { LoginResponse } from "../types"

const useLoginForm = () => {
  const [formState, setFormState] = useState<LoginFormState>({
    data: {
      email: "",
      password: "",
    },
    errors: {},
    isLoading: false,
  })

  const validateEmail = (email: string): string | undefined => {
    if (!email) return "El correo electrónico es obligatorio"
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) return "Formato de correo electrónico inválido"
    return undefined
  }

  const validatePassword = (password: string): string | undefined => {
    if (!password) return "La contraseña es obligatoria"
    if (password.length < 8) return "Debe contener al menos 8 caracteres"
    return undefined
  }

  const updateField = (field: keyof LoginFormData, value: string) => {
    setFormState((prev) => ({
      ...prev,
      data: { ...prev.data, [field]: value },
      errors: { ...prev.errors, [field]: undefined, general: undefined },
    }))
  }

  const validateForm = (): boolean => {
    const emailError = validateEmail(formState.data.email)
    const passwordError = validatePassword(formState.data.password)

    const errors: FormErrors = {}
    if (emailError) errors.email = emailError
    if (passwordError) errors.password = passwordError

    setFormState((prev) => ({ ...prev, errors }))
    return Object.keys(errors).length === 0
  }

  const submitForm = async (): Promise<void> => {
  if (!validateForm()) return
  setFormState((prev) => ({ ...prev, isLoading: true, errors: {} }))

  try {
    const res = (await loginRequest(formState.data.email, formState.data.password)) as LoginResponse
    localStorage.setItem("token", res.token)
    localStorage.setItem("user", JSON.stringify({ id: res.id, role: res.role, name: res.name }))
    console.log("Login OK:", res)
  } catch (error: any) {
    setFormState((prev) => ({
      ...prev,
      errors: { general: error?.message || "Credenciales incorrectas" },
    }))
  } finally {
    setFormState((prev) => ({ ...prev, isLoading: false }))
  }
}

  return {
    formState,
    updateField,
    submitForm,
  }
}

export default useLoginForm
