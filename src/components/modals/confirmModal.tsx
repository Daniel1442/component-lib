import React, {useRef} from 'react';

import {ReactSVG} from 'react-svg';
import {useOutsideAlerter} from "../../hooks/useOutsideAlerter.ts";
import {ModalProps} from "../../models/modal.tsx";


interface ComponentProps extends ModalProps {
    text: string
    confirmFunction: () => void
    secondaryFunction?: () => void
    secondaryButtonText?: string,
    description?: string | null
    hideModalHook?: boolean | undefined

}


const ConfirmModal: React.FC<ComponentProps> = ({...rest}) => {


    // TODO HACK, pls better solution
    const ref = useRef(null);
    const {outsideAlerter} = useOutsideAlerter();
    outsideAlerter(ref, rest.hideModal);


    return <div className="modal fade show modal-md" aria-modal="true" role="dialog"
                style={{display: 'block', backgroundColor: 'rgba(0,0,0,.6)'}}>
        <div className="modal-dialog modal-dialog-centered p-9" ref={ref}>
            <div className="modal-content modal-rounded">
                <div className="modal-header py-7 d-flex justify-content-between text-start">
                    <h2>{rest.text}</h2>
                    <div className="btn btn-sm btn-icon btn-active-color-primary" onClick={rest.hideModal}>
                        <div className="svg-icon svg-icon-2">
                            <ReactSVG src={'/assets/media/icons/duotune/arrows/arr088.svg'} height={24}
                                      width={24}/>
                        </div>
                    </div>
                </div>
                {rest.description && <div className="modal-body">
                    {rest.description}
                </div>}
                <div className="modal-footer">
                    <button type="button" className="btn  btn-secondary btn-sm font-weight-bold"
                            onClick={rest.hideModal}>Ne
                    </button>
                    <button type="button" className="btn btn-success btn-sm font-weight-bold"
                            onClick={() => {
                                rest.confirmFunction()
                                if (rest.hideModal == undefined || rest.hideModalHook) {
                                    rest.hideModal()
                                }
                            }}>
                        Ano
                    </button>
                    {rest.secondaryFunction && rest.secondaryButtonText &&
                        <button type="button" className="btn  btn-secondary btn-sm font-weight-bold"
                                onClick={() => {
                                    if (rest.secondaryFunction) {
                                        rest.secondaryFunction()
                                    }
                                    rest.hideModal()
                                }}>{rest.secondaryButtonText}
                        </button>}
                </div>
            </div>
        </div>
    </div>;
};

export default ConfirmModal;
