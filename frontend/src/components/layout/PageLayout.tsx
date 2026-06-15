import { motion } from "framer-motion";
import { ReactNode } from "react";

interface PageLayoutProps {
  title: string;
  description?: string;
  children: ReactNode;
}

export function PageLayout({ title, description, children }: PageLayoutProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className="page-layout"
    >
      <h1>{title}</h1>
      {description && <p className="page-subtitle">{description}</p>}
      <div className="page-content">{children}</div>
    </motion.div>
  );
}
