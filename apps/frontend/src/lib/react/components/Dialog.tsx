import { useEffect, useRef } from "react";

import Prose from "./Prose";

import type { MouseEventHandler, ReactNode } from "react";

export default function Dialog({
  isModal = false,
  isProse = false,
  hasPadding = false,
  buttonWidth,
  confirmText,
  onConfirm,
  onClose,
  children,
}: {
  isModal?: boolean;
  isProse?: boolean;
  hasPadding?: boolean;
  buttonWidth?: number;
  confirmText?: string;
  onConfirm?: MouseEventHandler<HTMLButtonElement>;
  onClose?: MouseEventHandler<HTMLDialogElement>;
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
        animate-[fade-in_0.25s] animate-[fly-up_0.25s]
        rounded border drop-shadow
        backdrop:backdrop-blur-sm
        ${hasPadding ? "p-5" : "p-0"}
      `}
      onClose={onClose}
    >
      {isProse ? <Prose>{children}</Prose> : children}

      <form
        method="dialog"
        className="m-auto flex flex-col gap-3"
        style={{ width: buttonWidth }}
      >
        {confirmText && (
          <button
            className="
              bg-heading text-bg
              hover:bg-bg hover:text-heading hover:border-heading
              h-[41px]
              rounded px-3 text-center text-sm
              hover:border
            "
            onClick={onConfirm}
          >
            {confirmText}
          </button>
        )}
      </form>
    </dialog>
  );
}
