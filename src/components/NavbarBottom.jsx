import React from 'react'
import { ButtonGroup, Button, Tab, Tabs } from "@material-tailwind/react";
import { Link } from 'react-router-dom';

export default function NavbarBottom() {
  return (
        <ButtonGroup className="flex w-full items-center justify-center align-middle border-y p-2">
          <Link to="/">
              <Button size="lg" color='white' variant="text" className='border-r border-l px-3 rounded-none'>HOME</Button>
          </Link>
          <Link to="/starshipList">
            <Button size="lg" color='white' variant="text" className='border-r-2 px-3 rounded-none'>STARSHIPS</Button>
          </Link>
        </ButtonGroup>
  )
}
