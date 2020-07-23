import React from 'react';
import Modal from 'react-modal';
import { useSelector, useDispatch } from 'react-redux';
import { uiCloseViewModal } from '../../actions/ui';
import { ViewRequest } from './RequestScreen';

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

export const ViewRequestModal = () => {

	const {isViewOpen, currentRequest} = useSelector(state => state.ui)
	const dispatch = useDispatch();

	const closeModal = () => {
		dispatch(uiCloseViewModal());
	}

	return (
		<Modal
			isOpen={isViewOpen}
			onRequestClose={closeModal}
			style={customStyles}
			className="modal"
			overlayClassName="modal-fondo"
			closeTimeoutMS={200}
		>
			<ViewRequest request={currentRequest}/>

		</Modal>
		)
}
