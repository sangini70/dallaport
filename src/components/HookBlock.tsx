export default function HookBlock({ hook }: { hook?: string }) {
  if (!hook) return null;

  return (
    <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-6 rounded-r-lg shadow-sm">
      <p className="text-blue-800 font-medium text-lg leading-relaxed">{hook}</p>
    </div>
  );
}
