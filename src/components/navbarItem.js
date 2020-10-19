import React from 'react';
import { Button } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';

const CustomButton = styled(Button)({
    color: 'white',
    marginRight: 10
});

function NavbarItem({ label, onClick, href }) {
    return (
        <CustomButton onClick={onClick} href={href}>
            {label}
        </CustomButton>
    )

}

export default NavbarItem;