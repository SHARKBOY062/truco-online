import bannerpix from "../assets/bannerpix.png";

export default function Footer() {
  return (
    <footer className="w-full bg-[#0F131A] border-t border-gray-800 text-gray-400 px-6 md:px-20 py-8">

      {/* LOGOS */}
      <div className="flex justify-center mb-6">
        <img
          src={bannerpix}
          alt="Certificações"
          className="opacity-80 max-w-[180px] sm:max-w-[260px]"
        />
      </div>

      {/* TEXTOS — MOBILE SIMPLIFICADO */}
      <div className="max-w-4xl mx-auto text-xs sm:text-sm leading-relaxed space-y-4">

        <p className="hidden sm:block">
          Truco Online é titular da marca e plataforma, operada no Brasil pela
          Foggo Entertainment Ltda., CNPJ: <b>56.431.248/0001-61</b>.
        </p>

        <p className="hidden sm:block">
          Autorização SPA/MF nº 471 — Licença oficial do Governo Brasileiro.
        </p>

        <p className="hidden sm:block">
          Para proteção ao consumidor, consulte o <b>Código de Defesa do Consumidor</b>.
        </p>

        {/* MOBILE — texto curto */}
        <p className="sm:hidden text-center text-[11px] leading-snug opacity-70">
          Truco Online — Autorização SPA/MF nº 471
          <br />
          Proibido para menores de 18 anos.
        </p>

        <p className="hidden sm:block">
          Jogue com responsabilidade. Práticas excessivas podem causar problemas relacionados ao vício.
        </p>

        <p className="hidden sm:block">
          É proibido utilizar benefícios sociais federais para apostar.
        </p>
      </div>

      {/* SUPORTE */}
      <div className="max-w-4xl mx-auto text-xs sm:text-sm leading-relaxed mt-6 text-center sm:text-left">

        <p className="mb-3 opacity-70">
          © 2025 Truco Online — Todos os direitos reservados.
        </p>

        <p>
          <b>Suporte:</b> suporte@truconline.com.br
          <br />
          <b>Ouvidoria:</b> ouvidoria@truconline.com.br
        </p>
      </div>
    </footer>
  );
}
