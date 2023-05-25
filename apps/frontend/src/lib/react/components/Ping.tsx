export default function Ping() {
  return (
    <span className="relative flex h-3 w-3">
      <span
        className="
          bg-accent absolute inline-flex h-full w-full
          animate-ping rounded-full opacity-75"
      />

      <span className="bg-accent relative inline-flex h-3 w-3 rounded-full" />
    </span>
  );
}
