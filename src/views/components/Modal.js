import React from 'react';

const Modal = ({id,titulo,body,close}) =>{
    return (
        <div className="modal fade show" id={id}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                    <h4 className="modal-title">{titulo}</h4>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close" id={close}>
                        <span aria-hidden="true">×</span>
                    </button>
                    </div>
                    <div className="modal-body">
                        {body}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal;