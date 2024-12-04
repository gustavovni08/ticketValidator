import React from "react";
import Header from "../header/Header";
import backgroundImage from "../../../assets/bg.jpg"; 
import Footer from "../footer/Footer";

interface IPageContainerProps {
  children: React.ReactNode
}

export default function PageContainer({ children }: IPageContainerProps) {
  return (
    <div
      className="bg-cover bg-center min-h-screen w-full flex bg-gray-200 flex-col justify-between"
      // style={{ backgroundImage: `url(${backgroundImage})` }} 
     >
      <Header />
      <div className="p-4 pt-10 flex items-center flex-col">{children}</div>
      <Footer/>
    </div>
  )
}