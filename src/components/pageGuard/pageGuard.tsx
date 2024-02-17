import React, {useEffect, useMemo} from 'react';
import {useRouting} from '../../../routing/utils/useRouting';
import {useUser} from '../../../utils/hooks/useUser';
import ReactCookies from 'react-cookies';
import {Cookie} from '../../../types';

export interface PageGuardProps {
    redirectUrl?: string;
    placeholder?: React.ReactNode;
    shouldRedirect?: (user: Nullable<string>) => boolean;
}

const PageGuard: React.FC<PageGuardProps> = ({children, placeholder, redirectUrl, shouldRedirect}) => {
    const {router, routes} = useRouting();
    const {userId} = useUser();

    const redirect = useMemo(() => shouldRedirect?.(userId) ?? !userId, [userId]);

    useEffect(() => {
        if (redirect) {
            ReactCookies.remove(Cookie.SPORTGROUND);
            const url = redirectUrl ?? routes.login.url({redirectUrl: router.asPath});
            router.push(url);
        }
    }, [redirect]);

    if (redirect) {
        // TODO LOADER
        return <>{placeholder ?? <></>}</>;
        // return <Loader/>
    }

    return <>{children}</>;
};

export default PageGuard;
