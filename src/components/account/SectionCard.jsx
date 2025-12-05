export default function SectionCard({ title, children }) {
  return (
    <div className="bg-[#0F131A] border border-gray-800 rounded-xl p-6 md:p-8 mb-8 shadow-[0_0_25px_rgba(0,0,0,0.25)] transition hover:shadow-[0_0_35px_rgba(0,0,0,0.35)]">
      {title && (
        <h2 className="text-xl font-semibold mb-6 text-white tracking-wide">
          {title}
        </h2>
      )}
      {children}
    </div>
  );
}
