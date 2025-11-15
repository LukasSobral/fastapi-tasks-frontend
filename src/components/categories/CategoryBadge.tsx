export default function CategoryBadge({ name }: { name: string }) {
  return (
    <span className="px-3 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-600 border border-blue-300">
      {name}
    </span>
  );
}
