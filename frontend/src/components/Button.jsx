export function Button({ label, onClick }) {
  return (
    <button
      onClick={onClick}
      type="button"
      class="mb-2 me-2 w-full rounded-lg bg-gray-800 px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300"
    >
      {label}
    </button>
  )
}
