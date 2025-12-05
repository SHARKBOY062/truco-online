export default function Input({ label, className='', ...rest }) {
  return (
    <div className='flex flex-col gap-1'>
      {label && <label className='text-sm text-gray-300'>{label}</label>}
      <input
        className={`px-3 py-2 border border-gray-600 rounded bg-gray-800 text-white ${className}`}
        {...rest}
      />
    </div>
  );
}
