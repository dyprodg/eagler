'use client'
import styles from './style.module.scss'
import { useEffect, useState } from 'react';
import Nav from './nav';
import { AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

export default function Header() {

  const [isActive, setIsActive] = useState(false);
  const pathname = usePathname();

  useEffect( () => {
    if(isActive) setIsActive(false)
  }, [pathname])

  return (
    <>
    <div className='border'>
   
      <div className={styles.header}>
      <Image
                className="m-5 hidden md:flex"
                src='/eagler.svg'
                alt="Logo"
                width={50}
                height={50}
                priority
            />
        <div onClick={() => {setIsActive(!isActive)}} className={`${styles.button}`}>
          <div className={`${styles.burger} ${isActive ? styles.burgerActive : ""}`}></div>
        </div>
      </div>

    </div>
    <AnimatePresence mode="wait">
      {isActive && <Nav />}
    </AnimatePresence>
    </>
  )
}