import { Dispatch, SetStateAction, useState } from 'react';
import ReactModal from 'react-modal'; 

interface ReactRequest {
    isOpenModal: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    children: React.ReactNode;
}
export default function Modal({isOpenModal, setIsOpen, children}: ReactRequest) {
    function closeModal() {
        setIsOpen(false);
    }

    function openModal() {
        setIsOpen(true);
    }

    return (
        <ReactModal 
            isOpen={isOpenModal}
            onRequestClose={closeModal}
            closeTimeoutMS={200}
            contentLabel="Anime Modal"
            >
            {children}
        </ReactModal>
    )
}

