import React, { useState } from "react";
import DynamicModals from "../../ui/dynamicModals";

interface ComponentProps {
  onConfirm: () => void;
  className?: string;
  confirmText?: string;
  disabled?: boolean;
  buttonText?: string;
  secondaryFunction?: () => void;
  secondaryButtonText?: string;
}

const ConfirmButtonWithModal: React.FC<ComponentProps> = ({
  onConfirm,
  className = "btn btn-sm w-100 btn-light",
  confirmText = "Opravdu ?",
  disabled = false,
  buttonText = "Ok",
  secondaryFunction,
  secondaryButtonText,
  children,
}) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {!children && (
        <button
          disabled={disabled}
          className={className}
          onClick={() => setShowModal(true)}
        >
          {buttonText}
          {children}
        </button>
      )}
      {children && (
        <div className={className} onClick={() => setShowModal(true)}>
          {children}
        </div>
      )}
      {showModal && (
        <DynamicModals.ConfirmModal
          open={showModal}
          confirmFunction={onConfirm}
          secondaryFunction={secondaryFunction}
          secondaryButtonText={secondaryButtonText}
          text={confirmText}
          hideModal={() => {
            setShowModal(false);
          }}
        />
      )}
    </>
  );
};

export default ConfirmButtonWithModal;
