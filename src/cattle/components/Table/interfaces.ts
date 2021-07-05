import { Cattle } from "cattle/interfaces";

export interface HeadCell {
  id: keyof Cattle;
  disablePadding: boolean;
  label: string;
  numeric: boolean;
}
