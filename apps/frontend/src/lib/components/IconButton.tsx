import { useMounted } from "@lib/hooks/useMounted";
import Ping from "./Ping";

export default function IconButton({
  ariaLabel,
  ariaLabelToggled,
  isToggled = false,
  hasPing = false,
  onClick,
  children,
}: {
  ariaLabel: string;
  ariaLabelToggled?: string;
  isToggled?: boolean;
  hasPing?: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  const mounted = useMounted();

  return (
    <>
      <button
        className={`
          text-bg bg-text
          h-10 w-10
          rounded-full font-serif
          text-2xl drop-shadow
          ${!mounted && "cursor-not-allowed"}
        `}
        aria-label={isToggled ? ariaLabelToggled : ariaLabel}
        onClick={onClick}
      >
        {isToggled ? <span className="text-3xl">&times;</span> : children}
      </button>
      {hasPing && (
        <div className="absolute bottom-8 left-8">
          <Ping />
        </div>
      )}
    </>
  );
}
