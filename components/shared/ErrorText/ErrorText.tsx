export function ErrorText({ error }: { error: string }) {
  return <div className="text-sm text-red-500">{error}</div>;
}
