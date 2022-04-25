import { useEffect, useState, useRef } from "react";
import { RootState } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { retrieveJob, updateJob } from "../../slices/jobsSlice";

import styles from "../../styles/EditModal.module.scss";

export default function EditModal({
  setEditModalOpen,
  jobId,
}: {
  setEditModalOpen: (editModalOpen: boolean) => void;
  jobId: string;
}) {
  const dispatch = useDispatch();
  const returnedJob = useSelector((state: RootState) => state.jobs.job);
  const [priorities, SetPriorities] = useState<String[]>([]);
  const priorityRef = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    SetPriorities(
      localStorage.getItem("priorityList")
        ? JSON.parse(localStorage.getItem("priorityList")!)
        : []
    );
  }, []);

  useEffect(() => {
    dispatch(retrieveJob(jobId));
  }, [dispatch, returnedJob, jobId]);

  const editJob = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(
      updateJob({
        id: jobId,
        priority: priorityRef.current!.value,
      })
    );
  };

  return (
    <div className={styles.modalBackground}>
      <div className={styles.modalContainer}>
        <div className={styles.title}>Job Edit</div>
        <div className={styles.body}>
          <div>
            <label>Job Name</label>
            <input placeholder={returnedJob.name} disabled />
          </div>
          <div>
            <label>Job Priority</label>
            {
              <select ref={priorityRef}>
                <option label={returnedJob.priority} hidden />
                {priorities?.map((priority, i) => (
                  <option key={i}>{priority}</option>
                ))}
              </select>
            }
          </div>
        </div>
        <div className={styles.footer}>
          <button
            onClick={() => {
              setEditModalOpen(false);
            }}
            style={{ backgroundColor: "gray", opacity: "25%" }}
          >
            Cancel
          </button>
          <button
            onClick={(e) => {
              editJob(e);
              setEditModalOpen(false);
            }}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
