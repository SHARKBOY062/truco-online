// src/pages/account/tabs/AccountInfo.jsx
import { useState, useEffect } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import SectionCard from "../../../components/account/SectionCard.jsx";
import InputPremium from "../../../components/account/InputPremium.jsx";
import { api } from "../../../services/api";

export default function AccountInfo() {
  const { user, login } = useAuth();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    birthdate: "",
  });

  const [warning, setWarning] = useState("");
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  /* ------------------------------------------
      MÁSCARA DE TELEFONE
  ------------------------------------------ */
  const maskPhone = (value) => {
    let v = value.replace(/\D/g, "");
    if (v.length <= 10) {
      return v.replace(/(\d{2})(\d{4})(\d+)/, "($1) $2-$3");
    }
    return v.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
  };

  /* ------------------------------------------
      VALIDAÇÃO DE MAIOR DE 18 ANOS
  ------------------------------------------ */
  const is18 = (date) => {
    if (!date) return false;

    const birth = new Date(date);
    const today = new Date();

    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();

    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
      age--;
    }

    return age >= 18;
  };

  /* ------------------------------------------
      CARREGA DADOS DO USUÁRIO
  ------------------------------------------ */
  useEffect(() => {
    if (user) {
      const incomplete = !user.phone || !user.birthdate;

      setForm({
        name: user.name,
        email: user.email,
        phone: user.phone || "",
        birthdate: user.birthdate || "",
      });

      if (incomplete) {
        setWarning("⚠ Complete seu cadastro inserindo telefone e data de nascimento.");
        setEditing(true); // libera edição automática
      }
    }
  }, [user]);

  /* ------------------------------------------
      SALVAR NO BACKEND
  ------------------------------------------ */
  const handleSave = async () => {
    setSaving(true);
    setWarning("");

    if (!is18(form.birthdate)) {
      setWarning("⚠ Apenas maiores de 18 anos podem usar a plataforma.");
      setSaving(false);
      return;
    }

    try {
      const res = await api.post("/profile/basic", {
        phone: form.phone,
        birthdate: form.birthdate,
      });

      if (res.data.success) {
        login(res.data.user); // Atualiza contexto com dados novos
        setEditing(false);
      }
    } catch (err) {
      setWarning("⚠ Não foi possível salvar. Tente novamente.");
    }

    setSaving(false);
  };

  return (
    <div className="min-w-0">
      <SectionCard title="Informações da Conta">

        {/* AVISO */}
        {warning && (
          <div className="bg-[#231000] border border-[#b93] text-[#ffcc66] px-4 py-3 rounded-xl text-xs mb-6 flex items-center gap-2">
            <i className="ri-alert-line text-lg" />
            {warning}
          </div>
        )}

        {/* CAMPOS */}
        <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">

          <InputPremium
            label="Nome completo"
            value={form.name}
            locked
            icon="ri-user-line"
          />

          <InputPremium
            label="E-mail"
            value={form.email}
            locked
            type="email"
            icon="ri-mail-line"
          />

          <InputPremium
            label="Telefone"
            value={maskPhone(form.phone)}
            locked={!editing}
            icon="ri-phone-line"
            placeholder="(00) 00000-0000"
            onChange={(v) =>
              setForm({ ...form, phone: v.replace(/\D/g, "") })
            }
          />

          <InputPremium
            label="Data de Nascimento"
            value={form.birthdate}
            locked={!editing}
            type="date"
            icon="ri-calendar-event-line"
            onChange={(v) => setForm({ ...form, birthdate: v })}
          />
        </div>

        {/* BOTÃO SALVAR */}
        {editing && (
          <div className="flex justify-end mt-6">
            <button
              onClick={handleSave}
              disabled={saving}
              className="
                px-6 py-2.5 rounded-full bg-[#B90007]
                text-white text-sm font-semibold
                hover:bg-[#e01515]
                disabled:opacity-50 inline-flex items-center gap-2
              "
            >
              {saving ? (
                <>
                  <i className="ri-loader-4-line animate-spin text-sm" />
                  Salvando...
                </>
              ) : (
                <>
                  <i className="ri-check-line text-sm" />
                  Salvar dados
                </>
              )}
            </button>
          </div>
        )}

      </SectionCard>
    </div>
  );
}
