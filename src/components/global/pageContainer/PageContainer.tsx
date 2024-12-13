import React, { useEffect } from "react";
import Header from "../header/Header";
import backgroundImage from "../../../assets/img2.jpg";
import Footer from "../footer/Footer";
import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";

interface IPageContainerProps {
  children: React.ReactNode;
}

const PageContainer: React.FC<IPageContainerProps> = React.memo(({ children }) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div
      className="relative bg-cover bg-center min-h-screen w-full flex flex-col justify-between"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <Header />
      <div className="relative flex-1 flex flex-col">
        <AnimatePresence mode="wait">
          <motion.div
            key="page-content"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ duration: 0.5 }}
            className="p-4 pt-10 flex items-center flex-col"
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </div>
      <Footer />
    </div>
  );
  
});

export default PageContainer;
