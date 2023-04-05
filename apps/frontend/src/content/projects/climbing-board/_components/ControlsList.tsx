export default function ControlsList({
  isVertical = false,
  shiftUp = false,
  shiftRight = false,
  children,
}: {
  isVertical?: boolean;
  shiftUp?: boolean;
  shiftRight?: boolean;
  children: React.ReactNode;
}) {
  return (
    <ul
      className={`
        fixed flex
        animate-[fade-in_0.25s]
        gap-2
        rounded drop-shadow
        ${
          isVertical
            ? "animate-[fly-up_0.25s] flex-col-reverse"
            : "animate-[fly-right_0.25s]"
        }
        ${shiftUp ? "bottom-20" : "bottom-8"}
        ${shiftRight ? "left-20" : "left-8"}
      `}
    >
      {children}
    </ul>
  );
}
