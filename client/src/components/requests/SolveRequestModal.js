import React from 'react';
import Modal from 'react-modal';
import { useSelector, useDispatch } from 'react-redux';
import { uiCloseSolModal } from '../../actions/ui';
import { SolveRequest } from './RequestScreen';

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

export const SolveRequestModal = () => {

	const {isSolOpen, solRequest} = useSelector(state => state.ui)
	const dispatch = useDispatch();

	const closeModal = () => {
		dispatch(uiCloseSolModal());
	}

	return (
		<Modal
			isOpen={isSolOpen}
			onRequestClose={closeModal}
			style={customStyles}
			className="modal"
			overlayClassName="modal-fondo"
			closeTimeoutMS={200}
		>
			<SolveRequest request={solRequest}/>

		</Modal>
		)
}
