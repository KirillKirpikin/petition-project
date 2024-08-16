import { motion } from "framer-motion";
import React, { ReactNode } from "react";

interface ITransitionPageProps{
    children: ReactNode;
}

const animation = {
    initial: {opacity: 0, x: 1000, overflow: 'hidden'},
    animate: { opacity: 1, x: 0, overflow: 'null' },
    exit:{ opacity: 0, x: -1000, overflow: 'hidden' },

}

const TransitionPage: React.FC<ITransitionPageProps> = ({ children }) => {
    return (      
        <motion.div
            variants={animation}
            initial='initial'
            animate='animate'
            exit='exit'
            transition={{duration: 0.7}}
        >
            {children}
        </motion.div>      
    );
};

export default TransitionPage;