export default function ControlsDisplay({
  width,
  children,
}: {
  width: number;
  children: React.ReactNode;
}) {
  return (
    <div
      className="
        text-text bg-surface/75 border-text flex h-10
        items-center justify-center rounded-2xl border-2
        font-mono text-lg font-bold
      "
      style={{ width }}
    >
      {children}
    </div>
  );
}
