import { IHoaDonDto } from "@/api/service/hoadon/dto";
import { createContext } from "react";

export const SaleInvoiceContext = createContext<{
  isChange?: boolean;
  hoadon: IHoaDonDto;
  setHoaDon: React.Dispatch<React.SetStateAction<IHoaDonDto>>;
}>({
  hoadon: {} as IHoaDonDto,
  setHoaDon: () => console.log("44"),
});
