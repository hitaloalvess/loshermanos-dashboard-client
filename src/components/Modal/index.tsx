import { X } from 'phosphor-react';
import { ReactElement } from 'react';
import Modal, { Styles } from 'react-modal';

import { ModalButtonClose, ModalContent } from './styles';

const customStyles: Styles = {
    overlay: {
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        backdropFilter: 'blur(8px)',
        zIndex: 9999,
    },
};

interface IModalProps {
    isOpen: boolean;
    funCloseModal: () => void;
    children: ReactElement;
    alignItemContainer?: 'flex-start' | 'flex-end' | 'center';
}

function ModalContainer({
    isOpen,
    funCloseModal,
    alignItemContainer,
    children,
}: IModalProps) {
    return (
        <Modal
            style={{
                ...customStyles,
                content: {
                    display: 'flex',
                    alignItems: `${alignItemContainer || 'flex-start'}`,
                    background: 'transparent',
                    border: 'none',
                },
            }}
            isOpen={isOpen}
        >
            <ModalContent>
                <ModalButtonClose onClick={funCloseModal}>
                    <X />
                </ModalButtonClose>
                {children}
            </ModalContent>
        </Modal>
    );
}

export { ModalContainer };
