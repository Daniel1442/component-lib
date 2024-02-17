import React, {useEffect, useState} from 'react';
import {useRouting} from '../../../routing/utils/useRouting';
import {useDispatch, useSelector} from 'react-redux';
import Loader from '../../../modules/ui/components/loader';

export interface PageGuardProps {
    redirect: any;
    dispatchFunction: any;
    resetFunction: any
    selector: any
}

const DetailWrapper: React.FC<PageGuardProps> = ({children, redirect, dispatchFunction, resetFunction, selector}) => {
    const {router} = useRouting();
    const dispatch = useDispatch();
    const selected = useSelector(selector)
    const [refresh, setRefresh] = useState<number>(0)

    useEffect(() => {
        return () => {
            dispatch(resetFunction())
        }
    }, [])

    useEffect(() => {
        dispatch(dispatchFunction).then(() => setRefresh(Math.random()));
    }, [])

    useEffect(() => {
        if (!refresh) {
            return
        }
        if (selected == null) {
            router.push(redirect);
        }
    }, [refresh])

    if (selected === undefined) {
        return <Loader/>
    }

    if(selected == null){
        return <></>
    }

    return <>{children}</>;
};

export default DetailWrapper;
