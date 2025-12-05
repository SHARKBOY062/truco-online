export default function ModeSelector({ modes, selected, onChange }) {
  return (
    // CORREÇÃO: Alterado de grid-cols-3 para grid-cols-2 no mobile por padrão.
    // Isso garante que dois modos cabem lado a lado sem corte.
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
      {modes.map(mode => {
        const active = selected === mode.name;
        return (
          <div key={mode.name}
            onClick={() => onChange(mode.name)}
            className={`
              rounded-xl overflow-hidden cursor-pointer
              border-2 transition
              ${active ? "border-green-500 shadow-lg" : "border-gray-700"}
            `}
          >
            <img src={mode.img} alt={mode.name}
              className="w-full h-24 sm:h-32 object-contain p-3" />
          </div>
        );
      })}
    </div>
  );
}