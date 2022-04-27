import React, { useRef } from 'react'
import { useState } from 'react'
import { createRef } from 'react'
import { Divider, MenuItem } from 'semantic-ui-react'
import './FadeInMenuButton.css'
import { useDrag } from "react-dnd";
import { dragTypes } from '../DragTypes'

const FadeInMenuButton = ({image, text}) => {
  const icon = createRef();
  const menuItem = createRef();
  const [open, setOpen] = useState(false)

  const [{ isDragging }, dragRef] = useDrag(() => ({
    type: dragTypes.RESOURCE,
    item: {
      resource_type : 'pod',
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const handleMouseEnter = () => {
    setOpen(true);
    icon.current.style.maxWidth = '10em';
    icon.current.style.width = '5.4em';
    icon.current.style.opacity = '1';
    // icon.current.style.margin = '1em';
  }
  const handleMouseLeave = () => {
    setOpen(false);
    icon.current.style.width = '0';
    icon.current.style.opacity = '0';
    // icon.current.style.margin = '0em 0em';
  }
  return(
    <MenuItem ref={menuItem} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className='component-button'  >
      <div ref={dragRef}>
      <img ref={icon} className='icon-image' src={image}/>
      </div>
      <p style={{marginTop : '0.4em'}}>Add a new {text}</p>
      {/* {isDragging ? '1' : '0'} */}
    </MenuItem>
  )
}

export default FadeInMenuButton