import { FC } from "react";
import './JumpMenu.component.css';
import { AppHashLink } from "../AppHashLink/AppHashLink.component";

export const JumpMenu: FC<{
    items: {
        title: string;
        id: string;
    }[]
}> = ({ items }) => (
    <div className="jump-menu" >
        <div className="jump-menu-body" >
            {
                items.map(item => (
                    <div 
                        className="jump-menu-item"
                        key={ `jump_item_${item.id}` }
                    >
                        <AppHashLink to={`/#${item.id}`} >{ item.title }</AppHashLink>
                    </div>
                ))
            }
        </div>
    </div>
);
