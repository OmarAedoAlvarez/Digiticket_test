import { useMemo, useState } from "react";
import logo from "../assets/logo_blanco.png";

type FormState = {
  firstName: string;
  lastName: string;
  docType: string;
  docNumber: string;
  birthDate: string;
  phone: string;
  email: string;
  password: string;
  confirm: string;
};

const initialState: FormState = {
  firstName: "",
  lastName: "",
  docType: "",
  docNumber: "",
  birthDate: "",
  phone: "",
  email: "",
  password: "",
  confirm: "",
};

const docTypes = [
  { value: "", label: "Seleccionar" },
  { value: "DNI", label: "DNI" },
  { value: "CE", label: "Carné de extranjería" },
  { value: "PASSPORT", label: "Pasaporte" },
];

function FieldError({ msg }: { msg?: string }) {
  if (!msg) return null;
  return <p className="text-red-500 text-sm mt-1">{msg}</p>;
}

export default function RegisterPage() {
  const [form, setForm] = useState<FormState>(initialState);
  const [submitting, setSubmitting] = useState(false);
  const [touched, setTouched] = useState<Record<keyof FormState, boolean>>({} as any);

  const errors = useMemo(() => {
    const e: Partial<Record<keyof FormState, string>> = {};
    if (!form.firstName.trim()) e.firstName = "Ingresa tus nombres";
    if (!form.lastName.trim()) e.lastName = "Ingresa tus apellidos";
    if (!form.docType) e.docType = "Selecciona un tipo";
    if (!form.docNumber.trim()) e.docNumber = "Ingresa tu número";
    if (!form.birthDate) e.birthDate = "Selecciona tu fecha";
    if (!form.phone.trim()) e.phone = "Ingresa tu teléfono";
    if (!form.email.trim()) e.email = "Ingresa tu correo";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Correo no válido";
    if (!form.password) e.password = "Ingresa una contraseña";
    else if (form.password.length < 8) e.password = "Debe contener al menos 8 caracteres";
    if (!form.confirm) e.confirm = "Confirma tu contraseña";
    else if (form.confirm !== form.password) e.confirm = "Las contraseñas no coinciden";
    return e;
  }, [form]);

  const hasErrors = Object.keys(errors).length > 0;

  const handleChange =
    (key: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setForm((s) => ({ ...s, [key]: e.target.value }));
    };

  const handleBlur = (key: keyof FormState) => () =>
    setTouched((t) => ({ ...t, [key]: true }));

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setTouched({
    firstName: true,
    lastName: true,
    docType: true,
    docNumber: true,
    birthDate: true,
    phone: true,
    email: true,
    password: true,
    confirm: true,
  });
  if (hasErrors) return;

  setSubmitting(true);
  try {
    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        password: form.password,
        documentType: form.docType, 
        documentNumber: form.docNumber,
        birthDate: form.birthDate, 
        phoneNumber: form.phone,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || "Error al registrar");
    }

    const data = await response.json();
    alert(`Cuenta creada 🎉 Bienvenido ${data.name}`);

    setForm(initialState);
    setTouched({} as any);
  } catch (err: any) {
    alert("Error: " + err.message);
  } finally {
    setSubmitting(false);
  }
};


  return (
    <div className="min-h-screen grid lg:grid-cols-2 font-poppins">
      {/* Panel izquierdo con gradiente y logo */}
      <aside className="hidden lg:flex items-center justify-center bg-superticket-gradient relative">
        <div className="w-10/12 max-w-[540px] text-white">
          <div className="flex flex-col items-center gap-6">
            {/* Logo circular */}
            <div className="w-28 h-28 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
              {/* Marca simple (puedes reemplazar por una img) */}
              <img src={logo} alt="SuperTicket Logo" className="w-20 h-20" />
            </div>
            <h1 className="text-5xl font-extrabold tracking-tight drop-shadow-sm">
              SuperTicket
            </h1>
          </div>
        </div>

        <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/90 text-xs">
          2025© Bytecraft. Todos los derechos reservados
        </p>
      </aside>

      {/* Panel derecho con formulario */}
      <main className="flex items-center justify-center px-6 py-10">
        <div className="w-full max-w-2xl">
          <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-10">
            Crear una cuenta
          </h2>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Nombres */}
            <div>
              <label className="block text-sm font-semibold mb-2">Nombres</label>
              <input
                type="text"
                placeholder="example"
                value={form.firstName}
                onChange={handleChange("firstName")}
                onBlur={handleBlur("firstName")}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gradient-middle focus:border-transparent transition-all duration-200"
              />
              {touched.firstName && <FieldError msg={errors.firstName} />}
            </div>

            {/* Apellidos */}
            <div>
              <label className="block text-sm font-semibold mb-2">Apellidos</label>
              <input
                type="text"
                placeholder="example"
                value={form.lastName}
                onChange={handleChange("lastName")}
                onBlur={handleBlur("lastName")}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gradient-middle focus:border-transparent transition-all duration-200"
              />
              {touched.lastName && <FieldError msg={errors.lastName} />}
            </div>

            {/* Tipo de documento */}
            <div>
              <label className="block text-sm font-semibold mb-2">Tipo de documento</label>
              <select
                value={form.docType}
                onChange={handleChange("docType")}
                onBlur={handleBlur("docType")}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-gradient-middle focus:border-transparent transition-all duration-200"
              >
                {docTypes.map((d) => (
                  <option key={d.value} value={d.value}>
                    {d.label}
                  </option>
                ))}
              </select>
              {touched.docType && <FieldError msg={errors.docType} />}
            </div>

            {/* Número de documento */}
            <div>
              <label className="block text-sm font-semibold mb-2">Número de documento</label>
              <input
                type="text"
                inputMode="numeric"
                placeholder="10394778"
                value={form.docNumber}
                onChange={handleChange("docNumber")}
                onBlur={handleBlur("docNumber")}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gradient-middle focus:border-transparent transition-all duration-200"
              />
              {touched.docNumber && <FieldError msg={errors.docNumber} />}
            </div>

            {/* Fecha de nacimiento */}
            <div>
              <label className="block text-sm font-semibold mb-2">Fecha de nacimiento</label>
              <input
                type="date"
                value={form.birthDate}
                onChange={handleChange("birthDate")}
                onBlur={handleBlur("birthDate")}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gradient-middle focus:border-transparent transition-all duration-200"
              />
              {touched.birthDate && <FieldError msg={errors.birthDate} />}
            </div>

            {/* Teléfono */}
            <div>
              <label className="block text-sm font-semibold mb-2">Teléfono</label>
              <input
                type="tel"
                inputMode="tel"
                placeholder="999500444"
                value={form.phone}
                onChange={handleChange("phone")}
                onBlur={handleBlur("phone")}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gradient-middle focus:border-transparent transition-all duration-200"
              />
              {touched.phone && <FieldError msg={errors.phone} />}
            </div>

            {/* Correo electrónico */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold mb-2">Correo electrónico</label>
              <input
                type="email"
                placeholder="aaaa@gmail.com"
                value={form.email}
                onChange={handleChange("email")}
                onBlur={handleBlur("email")}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gradient-middle focus:border-transparent transition-all duration-200"
              />
              {touched.email && <FieldError msg={errors.email} />}
            </div>

            {/* Contraseña */}
            <div>
              <label className="block text-sm font-semibold mb-2">Contraseña</label>
              <input
                type="password"
                placeholder="Debe contener al menos 8 caracteres"
                value={form.password}
                onChange={handleChange("password")}
                onBlur={handleBlur("password")}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gradient-middle focus:border-transparent transition-all duration-200"
              />
              {touched.password && <FieldError msg={errors.password} />}
            </div>

            {/* Confirmar contraseña */}
            <div>
              <label className="block text-sm font-semibold mb-2">Confirmar contraseña</label>
              <input
                type="password"
                placeholder="Debe contener al menos 8 caracteres"
                value={form.confirm}
                onChange={handleChange("confirm")}
                onBlur={handleBlur("confirm")}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gradient-middle focus:border-transparent transition-all duration-200"
              />
              {touched.confirm && <FieldError msg={errors.confirm} />}
            </div>

            {/* Botón */}
            <div className="md:col-span-2 mt-3">
              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-superticket-gradient text-white font-semibold py-3 px-6 rounded-xl hover:opacity-90 transition-opacity duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? "CREANDO..." : "CREAR"}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
