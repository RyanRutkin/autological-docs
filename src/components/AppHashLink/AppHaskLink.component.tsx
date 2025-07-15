import { FC, PropsWithChildren } from "react";
import { HashLink } from "react-router-hash-link";
import './AppHashLink.component.css';

export const AppHashLink: FC<PropsWithChildren & {
    to: string;
}> = ({ to, children }) => (
    <HashLink className="app-hash-link" to={ to } >{ children }</HashLink>
);
