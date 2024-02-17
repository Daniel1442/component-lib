import React, {useRef} from 'react';
import {DynamicTranslations} from '../../../lib/i18n/dynamicTranslations';
import {Namespace} from '../../../lib/i18n/types';
import {useOutsideAlerter} from '../../../utils/hooks/useOutsideAlerter';
import {ReactSVG} from 'react-svg';

interface ComponentProps {
    hideModal: () => void
    headerText?: any
    size?: string
    fullscreen?: boolean
    headerClassName?: string
    headerStyle?: any
    modalStyle?: any
    modalClassName?: any
    scrollable?: boolean
    hAuto?:boolean
}

const ModalWrapper: React.FC<ComponentProps> = ({
                                                    hideModal,
                                                    headerText,
                                                    size = '',
                                                    headerStyle,
                                                    modalStyle,
                                                    headerClassName,
                                                    fullscreen = false,
                                                    children,
                                                    modalClassName = '',
                                                    scrollable = true,
                                                    hAuto=false
                                                }) => {

    const ref = useRef(null);
    const {outsideAlerter} = useOutsideAlerter();
    outsideAlerter(ref, hideModal);


    return <DynamicTranslations namespaces={[Namespace.common]}>
        <div className={`modal fade show ${size}`} aria-modal="true" role="dialog"
             style={{display: 'block', backgroundColor: 'rgba(0,0,0,.6)'}}>
            <div
                className={`modal-dialog modal-dialog-centered p-9 ${scrollable ? 'modal-dialog-scrollable' : ''} ${fullscreen ? 'modal-fullscreen ' : ''}`}
                ref={ref}>
                <div className={`modal-content modal-rounded ${hAuto && 'h-auto'} position-relative ${modalClassName}`} style={modalStyle}>
                    <div className={`modal-header py-7 d-flex justify-content-between${headerClassName} `}
                         style={headerStyle}>
                        <h2>{headerText}</h2>
                        <div className="btn btn-sm btn-icon btn-active-color-primary" onClick={hideModal}>
                            <div className="svg-icon svg-icon-2">
                                <ReactSVG src={'/assets/media/icons/duotune/arrows/arr088.svg'} height={24}
                                          width={24}/>
                            </div>
                        </div>
                    </div>

                    {children}
                </div>
            </div>
        </div>
    </DynamicTranslations>;
};

export default ModalWrapper;
