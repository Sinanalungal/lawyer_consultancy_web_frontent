import React, { useEffect, useRef, FC } from 'react';
import { createPortal } from 'react-dom';

interface ModalProps {
  modalOpen: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
}

const Modal: FC<ModalProps> = ({ modalOpen, setModalOpen, children }) => {
  const trigger = useRef<HTMLButtonElement>(null);
  const modal = useRef<HTMLDivElement>(null);

  // Close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!modal.current || !trigger.current) return;
      if (
        !modalOpen ||
        modal.current.contains(target as Node) ||
        trigger.current.contains(target as Node)
      )
        return;
      setModalOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  }, [modalOpen, setModalOpen]);

  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!modalOpen || keyCode !== 27) return;
      setModalOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  }, [modalOpen, setModalOpen]);

  useEffect(() => {
    if (modalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [modalOpen]);

  // Return null if the modal is not open
  if (!modalOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 bg-black flex items-center justify-center px-2 bg-opacity-90"
      style={{ zIndex: 9999 }} // Ensure the modal is on top
    >
      <div
        ref={modal}
        className="w-full max-w-xl max-h-screen text-xs rounded overflow-y-scroll shadow-lg border border-gray-100 bg-white px-8 py-12 dark:bg-dark-2 md:px-[70px] md:py-[60px]"
        style={{ scrollbarWidth: 'none' }}
      >
        <p className="float-end -mt-6 cursor-pointer" onClick={() => setModalOpen(false)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="19"
            height="19"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#bbbbbb"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </p>
        {children}
      </div>
    </div>,
    document.getElementById('portal-div') as HTMLElement
  );
};

export default Modal;
