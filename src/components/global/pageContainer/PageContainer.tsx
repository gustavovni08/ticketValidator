import React from "react";
import Header from "../header/Header";
import backgroundImage from "../../../assets/img2.jpg"
import Footer from "../footer/Footer";
import {motion} from "framer-motion"
import { useEffect } from "react";

interface IPageContainerProps {
  children: React.ReactNode
}

export default function PageContainer({ children }: IPageContainerProps) {


  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' 
    })
  }

  useEffect(() => {
    scrollToTop()
  }, [])

  return (
<motion.div
  className="relative bg-cover bg-center min-h-screen w-full flex flex-col justify-between"
  style={{ backgroundImage: `url(${backgroundImage})` }}
>
  {/* Overlay para escurecer */}
  <div className="absolute inset-0 bg-black opacity-50"></div>

  {/* Conteúdo */}
  <Header />
  <motion.div 
    initial={{ opacity: 0, y: 100 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, x: 100 }}
    transition={{ duration: 0.5 }}
    className="relative p-4 pt-10 flex items-center flex-col"
  >
    {children}
  </motion.div>
  <Footer />
</motion.div>
  )
}