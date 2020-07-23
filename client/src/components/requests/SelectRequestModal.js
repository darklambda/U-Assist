import React from 'react';
import Modal from 'react-modal';
import { useSelector, useDispatch } from 'react-redux';
import { uiCloseModal } from '../../actions/ui';
import { SelectRequest } from './RequestScreen';

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

export const SelectRequestModal = () => {

	const {isOpen} = useSelector(state => state.ui)
	const dispatch = useDispatch();

	const closeModal = () => {
		dispatch(uiCloseModal());
	}

	return (
		<Modal
			isOpen={isOpen}
			onRequestClose={closeModal}
			style={customStyles}
			className="modal"
			overlayClassName="modal-fondo"
			closeTimeoutMS={200}
		>
			<SelectRequest />

		</Modal>
		)
}
