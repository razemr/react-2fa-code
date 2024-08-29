export interface InputProps {
  value: string;
  selected: boolean;
  canFocus: boolean;
  onBackspace: () => void;
  onChange: (value: string) => void;
  onPaste: (value: string) => void;
  onFocus: () => void;
};