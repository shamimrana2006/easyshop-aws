import { motion } from "framer-motion";

function PageTransition({ children }) {
  return (
    <motion.div initial={{ rotateY: 90, opacity: 0 }} animate={{ rotateY: 0, opacity: 1 }} exit={{ rotateY: -90, opacity: 0 }} transition={{ duration: 0.1, ease: "easeInOut" }}>
      {children}
    </motion.div>
  );
}
function PageTransitionFade({ children }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.1 }}>
      {children}
    </motion.div>
  );
}
export { PageTransitionFade };

export default PageTransition;
