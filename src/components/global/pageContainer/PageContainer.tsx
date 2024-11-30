import React from "react";
import Header from "../header/Header";
import backgroundImage from "../../../assets/image.jpg"; 
import Footer from "../footer/Footer";

interface IPageContainerProps {
  children: React.ReactNode
}

export default function PageContainer({ children }: IPageContainerProps) {
  return (
    <div
      className="bg-cover bg-center min-h-screen w-full flex flex-col justify-between"
      style={{ backgroundImage: `url(${backgroundImage})` }} 
    >
      <Header />
      <div className="p-4">{children}</div>
      <Footer/>
    </div>
  )
}