import React from "react";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { removeJob } from "../../slices/jobsSlice";

import styles from "../../styles/DeleteModal.module.scss";

export default function DeleteModal({
  setDeleteModalOpen,
  jobId,
}: {
  setDeleteModalOpen: (editModalOpen: boolean) => void;
  jobId: string;
}) {
  const dispatch = useDispatch();

  return (
    <div className={styles.modalBackground}>
      <div className={styles.modalContainer}>
        <div className={styles.title}>
          <AiOutlineExclamationCircle size="50px" color="#f03c6c" />
        </div>
        <div className={styles.body}>
          <p>Are you sure you want to delete it?</p>
        </div>
        <div className={styles.footer}>
          <button
            onClick={() => {
              setDeleteModalOpen(false);
            }}
            style={{ backgroundColor: "gray", opacity: "25%" }}
          >
            Cancel
          </button>
          <button
            onClick={() => {
              dispatch(removeJob(jobId));
              setDeleteModalOpen(false);
            }}
          >
            Approve
          </button>
        </div>
      </div>
    </div>
  );
}
