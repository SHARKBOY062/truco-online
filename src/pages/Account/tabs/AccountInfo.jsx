// src/pages/account/tabs/AccountInfo.jsx
import { useState } from "react";
import SectionCard from "../../../components/SectionCard";
import InputPremium from "../../../components/inputs/InputPremium";
import EditButton from "../../../components/inputs/EditButton";

export default function AccountInfo() {
  const [editing, setEditing] = useState(false);

  const [form, setForm] = useState({
    name: "Jogador Pro",
    email: "jogador@example.com",
    phone: "+55 (11) 99999-9999",
    birthdate: "1995-01-01",
  });

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    // aqui o backend pluga a chamada de atualização do perfil
    console.log("SALVAR DADOS DA CONTA:", form);
    setEditing(false);
    alert("Informações da conta salvas com sucesso!");
  };

  return (
    <div className="min-w-0">
      <SectionCard title="Informações da Conta">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <p className="text-[11px] sm:text-xs text-gray-400 max-w-md">
            Mantenha seus dados pessoais sempre atualizados para garantir a
            segurança da sua conta e facilitar saques e depósitos.
          </p>

          {!editing ? (
            <EditButton onClick={() => setEditing(true)} />
          ) : (
            <button
              onClick={handleSave}
              className="
                inline-flex items-center gap-2
                px-3.5 py-1.5
                rounded-full
                bg-[#B90007]
                text-white text-xs sm:text-sm font-semibold
                shadow-[0_0_18px_rgba(185,0,7,0.85)]
                hover:bg-[#e01515]
                hover:shadow-[0_0_26px_rgba(185,0,7,1)]
                transition-all duration-200
                active:scale-95
              "
            >
              <i className="ri-save-3-line text-sm" />
              Salvar alterações
            </button>
          )}
        </div>

        <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
          <InputPremium
            label="Nome completo"
            value={form.name}
            onChange={(v) => handleChange("name", v)}
            locked={!editing}
            icon="ri-user-line"
          />

          <InputPremium
            label="E-mail"
            value={form.email}
            onChange={(v) => handleChange("email", v)}
            locked={!editing}
            icon="ri-mail-line"
            type="email"
          />

          <InputPremium
            label="Telefone"
            value={form.phone}
            onChange={(v) => handleChange("phone", v)}
            locked={!editing}
            icon="ri-phone-line"
          />

          <InputPremium
            label="Data de Nascimento"
            value={form.birthdate}
            onChange={(v) => handleChange("birthdate", v)}
            locked={!editing}
            type="date"
            icon="ri-calendar-event-line"
          />
        </div>
      </SectionCard>
    </div>
  );
}
