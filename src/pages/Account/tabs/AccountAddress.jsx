// src/pages/account/tabs/AccountAddress.jsx
import { useState, useEffect } from "react";
import SectionCard from "../../../components/account/SectionCard.jsx";
import InputPremium from "../../../components/account/InputPremium.jsx";
import { api } from "../../../services/api";

export default function AccountAddress({ setAddressDone, addressDone }) {
  const [locked, setLocked] = useState(addressDone === true);

  const [form, setForm] = useState({
    street: "",
    number: "",
    complement: "",
    district: "",
    city: "",
    state: "",
    zip: "",
    country: "Brasil",
  });

  const [errorMsg, setErrorMsg] = useState("");
  const [saving, setSaving] = useState(false);

  // =====================================================
  // 1. CARREGAR ENDEREÇO DO BACKEND AO ENTRAR
  // =====================================================
  useEffect(() => {
    async function loadAddress() {
      try {
        const res = await api.get("/address");

        if (res.data.address) {
          const a = res.data.address;

          setForm({
            street: a.street || "",
            number: a.number || "",
            complement: a.complement || "",
            district: a.district || "",
            city: a.city || "",
            state: a.state || "",
            zip: a.zip || "",
            country: a.country || "Brasil",
          });

          if (a.is_locked) {
            setLocked(true);
            setAddressDone(true);
          }
        }
      } catch (err) {
        console.log("Erro ao carregar endereço", err);
      }
    }

    loadAddress();
  }, []);

  // =====================================================
  // 2. Atualizar campos
  // =====================================================
  const handleChange = (key, value) => {
    if (!locked) setForm((prev) => ({ ...prev, [key]: value }));
  };

  // =====================================================
  // 3. ViaCEP — consulta automática
  // =====================================================
  async function fetchCep(cep) {
    const clean = cep.replace(/\D/g, "");
    if (clean.length !== 8) return;

    try {
      const res = await fetch(`https://viacep.com.br/ws/${clean}/json/`);
      const data = await res.json();

      if (!data.erro) {
        setForm((prev) => ({
          ...prev,
          street: data.logradouro || prev.street,
          district: data.bairro || prev.district,
          city: data.localidade || prev.city,
          state: data.uf || prev.state,
        }));
      }
    } catch (err) {
      console.log("Erro ao consultar CEP:", err);
    }
  }

  // =====================================================
  // 4. Salvar apenas uma vez
  // =====================================================
  async function handleSave() {
    setErrorMsg("");

    if (!form.street || !form.number || !form.city || !form.state || !form.zip) {
      setErrorMsg("Preencha todos os campos obrigatórios.");
      return;
    }

    setSaving(true);

    try {
      const res = await api.post("/address", form);

      if (res.data.success) {
        setLocked(true);
        setAddressDone(true);
      }
    } catch (err) {
      setErrorMsg("Erro ao salvar endereço.");
    }

    setSaving(false);
  }

  return (
    <div className="min-w-0">
      <SectionCard title="Comprovante de Endereço">

        {/* Endereço salvo */}
        {locked && (
          <div className="bg-[#0e0e0e] border border-[#2a2a2a] rounded-xl px-4 py-3 mb-6 flex items-center gap-3 text-gray-300">
            <i className="ri-checkbox-circle-line text-green-500 text-xl" />
            <span className="text-[12px]">
              Seu endereço foi registrado e não pode ser alterado.
            </span>
          </div>
        )}

        {/* Erro */}
        {errorMsg && (
          <div className="mb-4 px-4 py-3 rounded-xl bg-[#250000] border border-[#4a0000] text-red-400 text-[12px] flex items-center gap-2">
            <i className="ri-error-warning-line text-lg"></i>
            {errorMsg}
          </div>
        )}

        {/* CAMPOS */}
        <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">

          <InputPremium
            label="CEP"
            value={form.zip}
            onChange={(v) => handleChange("zip", v)}
            onBlur={() => fetchCep(form.zip)}
            icon="ri-map-pin-line"
            locked={locked}
          />

          <InputPremium
            label="Logradouro"
            value={form.street}
            onChange={(v) => handleChange("street", v)}
            icon="ri-road-map-line"
            locked={locked}
          />

          <InputPremium
            label="Número"
            value={form.number}
            onChange={(v) => handleChange("number", v)}
            icon="ri-hashtag"
            locked={locked}
          />

          <InputPremium
            label="Complemento"
            value={form.complement}
            onChange={(v) => handleChange("complement", v)}
            locked={locked}
          />

          <InputPremium
            label="Bairro"
            value={form.district}
            onChange={(v) => handleChange("district", v)}
            locked={locked}
          />

          <InputPremium
            label="Cidade"
            value={form.city}
            onChange={(v) => handleChange("city", v)}
            icon="ri-building-4-line"
            locked={locked}
          />

          <InputPremium
            label="Estado"
            value={form.state}
            onChange={(v) => handleChange("state", v)}
            locked={locked}
          />

          <InputPremium
            label="País"
            value={form.country}
            icon="ri-flag-line"
            locked
          />
        </div>

        {/* BOTÃO SALVAR */}
        {!locked && (
          <div className="flex justify-end mt-6">
            <button
              onClick={handleSave}
              disabled={saving}
              className="
                px-6 py-2.5 rounded-full
                bg-[#B90007] text-white text-xs font-semibold
                hover:bg-[#e01515]
                disabled:opacity-50
                inline-flex items-center gap-2
              "
            >
              {saving ? (
                <>
                  <i className="ri-loader-2-line animate-spin text-sm"></i>
                  Salvando...
                </>
              ) : (
                <>
                  <i className="ri-check-double-line text-sm"></i>
                  Salvar Endereço
                </>
              )}
            </button>
          </div>
        )}

      </SectionCard>
    </div>
  );
}
