import React from 'react';
import { Menu, MenuItem, MenuMenu } from 'semantic-ui-react';

const MenuBar = () => {
    return (

        <Menu id="main-menu" fixed='top' >
            <MenuMenu position="right" >
            <MenuItem>Builder</MenuItem>
            </MenuMenu>
        </Menu>
    )
}

export default MenuBar;