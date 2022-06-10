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
    content: {
        background: `transparent`,
        border: `none`,
    },
};

interface IModalProps {
    isOpen: boolean;
    funCloseModal: () => void;
    children: ReactElement;
}

function ModalContainer({ isOpen, funCloseModal, children }: IModalProps) {
    return (
        <Modal style={customStyles} isOpen={isOpen}>
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
