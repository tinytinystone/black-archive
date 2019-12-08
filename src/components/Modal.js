import React from 'react'
import Octicon, {X} from '@primer/octicons-react'

import './Modal.css'

export default function Modal({ showsModal, onCloseModal, children }) {
    const showHideClassName = showsModal ? "modal display-block" : "modal display-none"
    return (
        <div className={showHideClassName}>
            <div className="modal-main">
                <div onClick={onCloseModal} className="close"><Octicon icon={X} /></div>
                {children}
            </div>
        </div>
    )
}
