import { useEffect, useRef } from "react";

import Prose from "@lib/components/Prose";

import type { MouseEventHandler, ReactNode } from "react";

export default function Dialog({
  isModal = false,
  isProse = false,
  hasPadding = false,
  buttonText,
  onButtonClick,
  children,
}: {
  isModal?: boolean;
  isProse?: boolean;
  hasPadding?: boolean;
  buttonText?: string;
  onButtonClick?: MouseEventHandler<HTMLButtonElement>;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;

    if (isModal) {
      dialog?.showModal();
    } else {
      dialog?.show();
    }

    return () => dialog?.close();
  }, [isModal]);

  return (
    <dialog
      ref={ref}
      className={`
        bg-surface/95 border-text relative z-50
        animate-[fly-up_0.25s] animate-[fade-in_0.25s]
        overflow-y-auto rounded border drop-shadow
        ${hasPadding ? "p-5" : "p-0"}
      `}
    >
      {isProse ? <Prose>{children}</Prose> : children}
      {buttonText && (
        <form method="dialog">
          <button
            className="
              bg-heading text-bg
              hover:bg-bg hover:text-heading hover:border-heading
              h-[41px]
              rounded px-3 text-center text-sm
              hover:border
            "
            onClick={onButtonClick}
          >
            {buttonText}
          </button>
        </form>
      )}
    </dialog>
  );
}
