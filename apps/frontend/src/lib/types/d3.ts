export interface DataPoint {
  [key: string]: null | boolean | number | string;
}

export interface Dimensions {
  width: number;
  height: number;
  top: number;
  right: number;
  bottom: number;
  left: number;
  bounded_height: number;
  bounded_width: number;
}
