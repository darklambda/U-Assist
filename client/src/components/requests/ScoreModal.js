import React, { useState } from 'react';
import Modal from 'react-modal';
import { useSelector, useDispatch } from 'react-redux';
import { uiCloseScoreModal } from '../../actions/ui';
import { ScoreBoard } from './RequestScreen';

const customStyles = {
	content : {
	top:  '50%',
	left: '50%',
	right: 'auto',
	bottom: 'auto',
	marginRight: '-50%',
	transform: 'translate(-50%, -50%)'
	}
};

Modal.setAppElement('#root')

export const ScoreModal = () => {

	const {currentRequest} = useSelector(state => state.ui)

	const [isOpen, setIsOpen] = useState(false);
	const dispatch = useDispatch();

	const openModal = () => {
        setIsOpen( true );
    }
    const closeModal = () => {
		setIsOpen( false );
		dispatch(uiCloseScoreModal());
    }

	return (
		<>
			<button onClick={openModal}>Evaluar Ejecutivo</button>
			<Modal
				isOpen={ isOpen }
				onRequestClose={closeModal}
				style={customStyles}
				className="modal"
				overlayClassName="modal-fondo"
				closeTimeoutMS={200}
			>
			<ScoreBoard request={ currentRequest } />

			<button onClick={closeModal}>Terminar Evaluación</button>

			</Modal>
		</>
		)
}
