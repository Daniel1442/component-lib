import React from 'react';
import {useRouting} from "../../../routing/utils/useRouting";
import {Route} from "../../../routing/types";
import RouteLink from "../../app/components/RouteLink";

interface ComponentPros {
    items: Array<{ title: string, link: Route, params?: any }>
}

const ModuleNavigation: React.FC<ComponentPros> = ({...rest}) => {

    const {router} = useRouting();

    return <div className={'app-toolbar'}>
        <div id="kt_app_toolbar_container" className="app-container  container-fluid d-flex align-items-stretch ">
            <ul className="nav nav-stretch nav-line-tabs nav-line-tabs-2x border-transparent fs-5 fw-bold">
                {rest.items.map(value => {
                    return <li className="nav-item mt-2">
                        <RouteLink to={value.link.url(value.params)}
                                   className={'nav-link text-active-primary ms-0 me-5 me-lg-8 pt-2 pb-3 pt-lg-4 pb-lg-5 cursor-pointer ' + (value.link.page == router.route ? ' active' : undefined)}>
                            {value.title}
                        </RouteLink>
                    </li>
                })}
            </ul>
        </div>
    </div>
}

export default ModuleNavigation;
