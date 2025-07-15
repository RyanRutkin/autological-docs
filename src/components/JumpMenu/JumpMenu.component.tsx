import { FC } from "react";
import './JumpMenu.component.css';
import { AppHashLink } from "../AppHashLink/AppHaskLink.component";

export const JumpMenu: FC<{
    items: {
        title: string;
        id: string;
    }[],
    jumpTo: (id: string) => void;
}> = ({ items, jumpTo }) => (
    <div className="jump-menu" >
        <div className="jump-menu-body" >
            {
                items.map(item => (
                    <div 
                        className="jump-menu-item" 
                        onClick={() => jumpTo(item.id)}
                        key={ `jump_item_${item.id}` }
                    >
                        <AppHashLink to={`/#${item.id}`} >{ item.title }</AppHashLink>
                    </div>
                ))
            }
        </div>
    </div>
);
