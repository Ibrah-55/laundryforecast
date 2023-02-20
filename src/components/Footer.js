import React from 'react'
import {  useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
 
function Footer() {
    const [open, setOpen] = useState(false);
 
   const handleOpen = () => setOpen(!open);
  return (
    <div class="container w-screen bg-green-100">
      
<footer className="relative bottom-0 left-0 z-20 w-screen                                                                                                                                                                                        p-4 bg-white border-t border-gray-200 shadow md:flex md:items-center md:justify-between md:p-6 dark:bg-gray-800 dark:border-gray-600">
    <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 <a href="https://github.com/Ibrah-55/" className="hover:underline">Jarvis™</a>. All Rights Reserved.
    </span>
    <ul className="flex flex-wrap items-center mt-3 text-sm text-gray-500 dark:text-gray-400 sm:mt-0">
        <li>
        <Button onClick={handleOpen} className="mr-4 hover:underline md:mr-6" >
        About
      </Button>
      <Dialog
        open={open}
        handler={handleOpen}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
      >
        <DialogHeader>About.</DialogHeader>
        <DialogBody divider>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Accusamus ad
          reprehenderit omnis perspiciatis aut odit! Unde architecto
          perspiciatis, dolorum dolorem iure quia saepe autem accusamus eum
          praesentium magni corrupti explicabo!
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          
        </DialogFooter>
      </Dialog>        </li>
        
        <li>
            <a href="/" className="mr-4 hover:underline md:mr-6">LINKEDIN</a>
        </li>
        <li>
            <a href="https://github.com/Ibrah-55" className="mr-4 hover:underline md:mr-6">GITHUB</a>
        </li>
        <li>
            <a href="https://twitter.com/user_Jarvis" className="hover:underline">TWITTER</a>
        </li>
    </ul>
</footer>

    </div>
  )
}

export default Footer
