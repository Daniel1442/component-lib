import {useEffect} from 'react';

export const useOutsideAlerter = () => {
    const outsideAlerter: any = (ref: any, callback: any) => {
        useEffect(() => {
            function handleClickOutside(event: any) {
                if (ref.current && !ref.current.contains(event.target)) {
                    callback(false);
                }
            }

            document.addEventListener('mousedown', handleClickOutside);
            return () => {
                document.removeEventListener('mousedown', handleClickOutside);
            };
        }, [ref]);
    };

    return {outsideAlerter};
};
