import { FC } from "react";
import { HashLink } from 'react-router-hash-link';
import './JumpMenu.component.css';

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
                        <HashLink to={`/#${item.id}`} >{ item.title }</HashLink>
                    </div>
                ))
            }
        </div>
    </div>
);
