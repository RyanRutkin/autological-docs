import { FC, PropsWithChildren } from "react";
import './Page.component.css';

export const Page: FC<PropsWithChildren<{
    className?: string;
    [key: string]: any;
}>> = ({ children, className, ...props }) => (
    <div className={ `app-page ${className || ''}` } { ...props } >
        { children }
    </div>
);
