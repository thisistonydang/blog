import Prose from "@lib/components/Prose";

export default function ControlsDialog({
  isProse = false,
  hasPadding = false,
  children,
}: {
  isProse?: boolean;
  hasPadding?: boolean;
  children: React.ReactNode;
}) {
  return (
    <dialog
      open
      className={`
        bg-surface/90 fixed
        bottom-24 z-50 mx-8 max-h-[calc(100vh-96px-96px-96px)] max-w-2xl
        animate-[fly-up_0.25s] animate-[fade-in_0.25s]
        overflow-y-auto rounded drop-shadow
        ${hasPadding ? "p-5" : "p-0"}
      `}
    >
      {isProse ? <Prose>{children}</Prose> : children}
    </dialog>
  );
}
