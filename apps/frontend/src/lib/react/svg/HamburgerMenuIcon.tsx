import SvgIcon from "./SvgIcon";

export default function HamburgerMenuIcon(props: {
  width?: number;
  height?: number;
}) {
  return (
    <SvgIcon {...props}>
      <path d="m128 168c0-8.8359 7.1641-16 16-16h224c8.8359 0 16 7.1641 16 16s-7.1641 16-16 16h-224c-8.8359 0-16-7.1641-16-16z" />
      <path d="m128 256c0-8.8359 7.1641-16 16-16h224c8.8359 0 16 7.1641 16 16s-7.1641 16-16 16h-224c-8.8359 0-16-7.1641-16-16z" />
      <path d="m144 328c-8.8359 0-16 7.1641-16 16s7.1641 16 16 16h224c8.8359 0 16-7.1641 16-16s-7.1641-16-16-16z" />
    </SvgIcon>
  );
}
