import Prose from "@lib/components/Prose";

export default function ControlsDialog({
  isProse = false,
  children,
}: {
  isProse?: boolean;
  children: React.ReactNode;
}) {
  return (
    <dialog
      open
      className="
        bg-surface/80
        fixed bottom-14 m-8 max-h-[50%] max-w-2xl
        animate-[fly-up_0.25s] animate-[fade-in_0.25s]
        overflow-y-auto rounded p-5 drop-shadow
      "
    >
      {isProse ? <Prose>{children}</Prose> : children}
    </dialog>
  );
}
