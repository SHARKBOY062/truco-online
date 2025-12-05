import { useState } from "react";
import SectionCard from "../../../components/account/SectionCard";
import InputPremium from "../../../components/account/InputPremium";
import SelectPremium from "../../../components/account/SelectPremium";

import { states } from "../data/states";
import { countries } from "../data/countries";
import getCepData from "../helpers/cep";

export default function AccountInfo() {
  const [form, setForm] = useState({
    displayName: "PrósperoSatisfeito",
    email: "gamercaju.ex@gmail.com",
    phone: "+5564992251069",
    password: "********",
    firstName: "peixoto",
    lastName: "peixoto",
    cpf: "701.502.321-01",
    birthYear: "2003",
    birthMonth: "Dez",
    birthDay: "26",
    nationality: "",
    country: "Brasil",
    gender: "",
    state: "Goiás",
    address: "av coronel",
    city: "Caldas Novas",
    zip: "75696016",
  });

  const update = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  // CEP Auto-preenchimento
  const handleCep = async (cep) => {
    update("zip", cep);

    if (cep.length === 8) {
      const result = await getCepData(cep);

      if (result) {
        update("state", result.state);
        update("city", result.city);
        update("address", result.street);
      }
    }
  };

  return (
    <>
      {/* ===================== INFORMAÇÕES DA CONTA ===================== */}
      <SectionCard title="Informações da Conta">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Nome de Exibição */}
          <InputPremium
            label="Nome de Exibição"
            value={form.displayName}
            onChange={(v) => update("displayName", v)}
          />

          {/* Email (bloqueado) */}
          <InputPremium
            label="Endereço de Email"
            value={form.email}
            locked={true}
          />

        </div>

        {/* Senha + Telefone */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <InputPremium
            label="Senha Atual"
            type="password"
            value={form.password}
            locked={true}
          />

          <InputPremium
            label="Telefone"
            value={form.phone}
            locked={true}
          />

        </div>
      </SectionCard>

      {/* ===================== DADOS PESSOAIS ===================== */}
      <SectionCard>

        {/* Nome */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputPremium
            label="Primeiro Nome"
            value={form.firstName}
            onChange={(v) => update("firstName", v)}
          />

          <InputPremium
            label="Último Nome"
            value={form.lastName}
            onChange={(v) => update("lastName", v)}
          />
        </div>

        {/* CPF + Data de nascimento */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <InputPremium
            label="CPF"
            value={form.cpf}
            locked={true}
          />

          <div>
            <p className="text-gray-400 mb-1 text-sm">Data de Nascimento</p>
            <div className="grid grid-cols-3 gap-3">
              <SelectPremium
                value={form.birthYear}
                onChange={(v) => update("birthYear", v)}
                options={Array.from({ length: 80 }, (_, i) => 1940 + i)}
              />

              <SelectPremium
                value={form.birthMonth}
                onChange={(v) => update("birthMonth", v)}
                options={[
                  "Jan","Fev","Mar","Abr","Mai","Jun",
                  "Jul","Ago","Set","Out","Nov","Dez"
                ]}
              />

              <SelectPremium
                value={form.birthDay}
                onChange={(v) => update("birthDay", v)}
                options={Array.from({ length: 31 }, (_, i) => i + 1)}
              />
            </div>
          </div>

        </div>

        {/* Nacionalidade + País */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <SelectPremium
            label="Nacionalidade"
            value={form.nationality}
            onChange={(v) => update("nationality", v)}
            options={countries}
          />

          <SelectPremium
            label="País"
            value={form.country}
            onChange={(v) => update("country", v)}
            options={["Brasil"]}
          />

        </div>

        {/* Gênero + Estado */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <SelectPremium
            label="Gênero"
            value={form.gender}
            onChange={(v) => update("gender", v)}
            options={["Masculino", "Feminino", "Outro"]}
          />

          <SelectPremium
            label="Estado"
            value={form.state}
            onChange={(v) => update("state", v)}
            options={states}
          />

        </div>

        {/* Endereço */}
        <InputPremium
          label="Endereço"
          value={form.address}
          onChange={(v) => update("address", v)}
        />

        {/* Cidade + CEP */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputPremium
            label="Cidade"
            value={form.city}
            onChange={(v) => update("city", v)}
          />

          <InputPremium
            label="CEP"
            value={form.zip}
            onChange={(v) => handleCep(v)}
          />
        </div>

        <div className="pt-4">
          <button className="bg-green-500 text-black px-6 py-2 rounded-full font-bold hover:bg-green-400 transition w-full md:w-auto">
            Salvar
          </button>
        </div>

      </SectionCard>
    </>
  );
}
