import ControlsDialog from "@lib/components/ControlsDialog";
import IconButton from "@lib/components/IconButton";
import Prose from "@lib/components/Prose";

export default function Interface({
  isOpened,
  hasPing,
  onClick,
  children,
}: {
  isOpened: boolean;
  hasPing: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <aside>
      <div
        className="
          fixed bottom-8 left-8 flex
          animate-[fly-up_0.25s] animate-[fade-in_0.25s]
          items-center gap-4
        "
      >
        <IconButton
          ariaLabel="Show Info."
          ariaLabelToggled="Hide Info."
          toggledText={<>&times;</>}
          isToggled={isOpened}
          hasPing={hasPing}
          onClick={onClick}
        >
          i
        </IconButton>
        {!isOpened && (
          <Prose>
            <h1>Particles</h1>
          </Prose>
        )}
      </div>
      {isOpened && <ControlsDialog isProse>{children}</ControlsDialog>}
    </aside>
  );
}
