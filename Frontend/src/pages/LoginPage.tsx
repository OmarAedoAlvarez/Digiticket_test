"use client"

import type React from "react"
import { Link } from "react-router-dom";
import TextInput from "../components/TextInput"
import PasswordInput from "../components/PasswordInput"
import Button from "../components/Button"
import RightPanel from "../components/RightPanel"
import useLoginForm from "../hooks/useLoginForm"

const LoginPage: React.FC = () => {
  const { formState, updateField, submitForm } = useLoginForm()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    submitForm()
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-card overflow-hidden">
        <div className="flex flex-col lg:flex-row min-h-[600px]">
          {/* Left Panel - Form */}
          <div className="w-full lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
            <div className="max-w-md mx-auto w-full">
              <h1 className="text-4xl font-bold text-gray-900 mb-8 text-balance">Inicio de Sesión</h1>

              <form onSubmit={handleSubmit} className="space-y-6">
                <TextInput
                  label="Correo electrónico"
                  type="email"
                  placeholder="aaaa@gmail.com"
                  value={formState.data.email}
                  onChange={(value) => updateField("email", value)}
                  error={formState.errors.email}
                  required
                />

                <PasswordInput
                  label="Contraseña"
                  placeholder="Debe contener al menos 8 caracteres"
                  value={formState.data.password}
                  onChange={(value) => updateField("password", value)}
                  error={formState.errors.password}
                  required
                />

                <div className="text-right">
                  <button
                    type="button"
                    className="text-sm text-gray-500 hover:text-gradient-middle transition-colors duration-200"
                  >
                    Olvide mi contraseña
                  </button>
                </div>

                {formState.errors.general && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-600 text-sm" role="alert">
                      {formState.errors.general}
                    </p>
                  </div>
                )}

                <Button type="submit" loading={formState.isLoading} disabled={formState.isLoading} className="mt-8">
                  INGRESAR
                </Button>
              </form>

              <div className="mt-8 text-center">
                <p className="text-gray-600 text-sm">
                  ¿Aún no tienes una cuenta?{" "}
                  <Link to="/register" className="text-gradient-middle hover:underline font-medium">Regístrate</Link>
                </p>
              </div>
            </div>
          </div>

          {/* Right Panel - Gradient */}
          <RightPanel />
        </div>

        {/* Mobile gradient panel */}
        <div className="lg:hidden bg-superticket-gradient p-8 text-white text-center">
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
            <img src="/src/assets/logo_blanco.jpg" alt="SuperTicket Logo" className="w-12 h-12" />
          </div>
          <h2 className="text-2xl font-bold mb-2">SuperTicket</h2>
          <p className="text-sm opacity-80">2025©Bytecraft. Todos los derechos reservados</p>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
