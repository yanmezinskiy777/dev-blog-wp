import React from "react";
import { useReadingProgress } from "../../hooks/useReadingProcess";
import styles from "./ReadProccess.module.css";

const ReadProcess = () => {
  const completion = useReadingProgress();
  return (
    <div className={styles.readProccess}>
      <span
        style={{
          transform: `translateX(${completion - 100}%)`,
        }}
        className={styles.lineProcess}
      ></span>
    </div>
  );
};

export default ReadProcess;
