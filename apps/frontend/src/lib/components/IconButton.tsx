import { useMounted } from "@lib/hooks/useMounted";
import Ping from "./Ping";
import Prose from "./Prose";

export default function IconButton({
  ariaLabel,
  ariaLabelToggled,
  toggledText,
  isToggled = false,
  hasPing = false,
  isPill = false,
  fixedWidth,
  onClick,
  children,
}: {
  ariaLabel: string;
  ariaLabelToggled?: string;
  toggledText?: React.ReactNode;
  isToggled?: boolean;
  hasPing?: boolean;
  isPill?: boolean;
  fixedWidth?: number;
  onClick: () => void;
  children: React.ReactNode;
}) {
  const mounted = useMounted();

  return (
    <>
      <button
        className={`
          bg-text h-10 rounded-full drop-shadow
          ${!fixedWidth && "min-w-[40px]"}
          ${!mounted && "cursor-not-allowed"}
        `}
        style={{ width: fixedWidth }}
        aria-label={isToggled ? ariaLabelToggled : ariaLabel}
        onClick={onClick}
      >
        <Prose>
          <span
            className={`text-bg ${isPill ? "px-3" : "font-serif text-2xl"}`}
          >
            {isToggled ? toggledText : children}
          </span>
        </Prose>
      </button>
      {hasPing && (
        <div className="absolute bottom-8 left-8">
          <Ping />
        </div>
      )}
    </>
  );
}
