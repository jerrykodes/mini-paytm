export function InputBox({ label, placeholder, onChange }) {
  return (
    <div>
      <div className="py-2 text-left text-sm font-medium">{label}</div>
      <input
        onChange={onChange}
        placeholder={placeholder}
        className="w-full rounded border border-slate-200 px-2 py-1"
      />
    </div>
  )
}
