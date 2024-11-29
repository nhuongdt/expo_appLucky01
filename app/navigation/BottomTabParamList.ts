export enum ListBottomTab {
  TEMP_INVOICE = "TempInvoice",
  TEMP_INVOICE_DETAIL = "TempInvoiceDetails",
  PRODUCT = "Product",
}

export type BottomTabParamList = {
  TempInvoice: { idHoaDon: string; maHoaDon: string };
  TempInvoiceDetails: { idHoaDon: string; maHoaDon: string };
  Product: { idHoaDon: string; maHoaDon: string; tongThanhToan?: number };
};
