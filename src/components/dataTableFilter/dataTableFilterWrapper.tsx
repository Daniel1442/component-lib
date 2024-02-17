import React, {useEffect, useState} from 'react';
import useWindowDimensions from "../../../../utils/hooks/useWindowDimensions";
import {Image} from "react-bootstrap";

interface ComponentProps {

}

const DataTableFilterWrapper: React.FC<ComponentProps> = ({
                                                              children
                                                          }) => {
    const [show, setShow] = useState(true)
    const {isMobile} = useWindowDimensions()

    useEffect(() => {
        setShow(!isMobile)
    }, [isMobile]);


    return <>
        <div className="d-flex d-md-none justify-content-between mb-3">
            <div className="card-title">
                Filtry
            </div>
            <div className={'my-auto'}>
                <div className={'btn'} style={{transition: '0.5s'}} onClick={() => setShow(!show)}>
                    <Image src={'/icons/Vector 1.svg'}
                           alt={'vector'}
                           style={{transform: show ? 'rotate(180deg)' : '',transition: '0.5s'}}/>
                </div>
            </div>
        </div>

        {show && children}

    </>


}

export default DataTableFilterWrapper;