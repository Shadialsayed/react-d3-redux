import React from 'react';
import {Button} from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';
import './inputModal.css';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
    const outsideRef = React.useRef(null);

    const handleCloseOnOverlay = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
        if (e.target === outsideRef.current) {
            onClose();
        }
    };

    return isOpen ? (
        <div className={'modal'}>
            <div ref={outsideRef} className={'modal__overlay'} onClick={handleCloseOnOverlay}/>
            <div className={'modal__box'}>
                <Button className={'modal__close'} onClick={onClose}>
                    <CloseIcon/>
                </Button>
                <div className={'modal__content'}>{ children }</div>
            </div>
        </div>
) : null;
};

export default Modal;