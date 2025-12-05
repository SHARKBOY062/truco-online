export default async function getCepData(cep) {
  try {
    const cleanCep = cep.replace(/\D/g, "");
    const response = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);

    const data = await response.json();

    if (data.erro) return null;

    return {
      state: data.uf,
      city: data.localidade,
      street: data.logradouro
    };

  } catch (err) {
    console.error("Erro ao consultar CEP:", err);
    return null;
  }
}
