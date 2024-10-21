"use client";

import { FC, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface MotionWrapperProps {
    children: ReactNode;
}

const MotionWrapper: FC<MotionWrapperProps> = ({ children }) => {
    const handleExitComplete = () => {
        console.log("Exit animation completed");
    };

    return (
        <AnimatePresence onExitComplete={handleExitComplete}>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 2 }}
            >
                {children}
            </motion.div>
        </AnimatePresence>
    );
};

export default MotionWrapper;
