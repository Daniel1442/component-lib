import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import ComponentLoader from "../../../modules/ui/components/componentLoader";

export interface PageGuardProps {
    dispatchFunction: any;
    resetFunction: any
    selector: any
}

const ModalDetailWrapper: React.FC<PageGuardProps> = ({children, dispatchFunction, resetFunction, selector}) => {
    const dispatch = useDispatch();
    const selected = useSelector(selector)

    useEffect(() => {
        return () => {
            dispatch(resetFunction())
        }
    }, [])

    useEffect(() => {
        dispatch(dispatchFunction);
    }, [])


    if (selected === undefined) {
        return <ComponentLoader/>
    }

    if(selected == null){
        return <></>
    }

    return <>{children}</>;
};

export default ModalDetailWrapper;
