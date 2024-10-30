export type IPropModal<T> = {
  isShow: boolean;
  objUpdate?: T;
  onClose: () => void;
  onSave: (objAfterSave: T) => void;
};
