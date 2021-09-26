import React from 'react';
import { Box, useScrollTrigger, Zoom } from '@material-ui/core';

function ScrollTop(props) {
    const { children, window } = props;

    const trigger = useScrollTrigger({
        target: window ? window() : undefined,
        disableHysteresis: true,
        threshold: 100,
    });
  
    const handleClick = (event) => {
        const anchor = (event.target.ownerDocument || document).querySelector(
            '#back-to-top-anchor',
        );
    
        if (anchor) {
                anchor.scrollIntoView({
                behavior: 'smooth',
                block: 'center',
            });
        }
    };
  
    return (
        <Zoom in={trigger}>
            <Box
                onClick={handleClick}
                role="presentation"
                style={{ position: 'fixed', bottom: 30, right: 30 }}
            >
                {children}
            </Box>
        </Zoom>
    );
}

export default ScrollTop
