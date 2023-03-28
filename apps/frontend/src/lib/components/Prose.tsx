export default function Prose({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="
        prose dark:prose-invert
        prose-a:text-accent prose-a:underline-offset-4 hover:prose-a:no-underline
        prose-headings:font-normal
      "
    >
      {children}
    </div>
  );
}
