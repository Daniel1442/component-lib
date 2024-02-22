import {SyntheticEvent} from 'react';

export interface ModalProps extends Omit<React.AllHTMLAttributes<HTMLDivElement>, 'as'> {
  enableOnClickOutside?: boolean;
  hideModal: (event?: SyntheticEvent | null) => void;
  open: boolean;
}