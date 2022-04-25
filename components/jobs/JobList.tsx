import React from "react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { HiOutlinePencilAlt, HiOutlineTrash } from "react-icons/hi";
import EditModal from "../modals/EditModal";
import DeleteModal from "../modals/DeleteModal";

import styles from "../../styles/JobList.module.scss";
import jobsSlice from "../../slices/jobsSlice";

export default function JobList() {
  const [priorities, SetPriorities] = useState<String[]>([]);
  const [jobName, setJobName] = useState("");
  const [priority, setPriority] = useState("");
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [jobId, setJobId] = useState("");
  const jobList = useSelector((state: RootState) => state.jobs.jobs);

  useEffect(() => {
    SetPriorities(
      localStorage.getItem("priorityList")
        ? JSON.parse(localStorage.getItem("priorityList")!)
        : []
    );
  }, []);

  const defaultListOrder = () => {
    const sortBy = ["Urgent", "Regular", "Trivial"];
    let newList = [...jobList].sort(
      (a, b) => sortBy.indexOf(a.priority) - sortBy.indexOf(b.priority)
    );

    if (priority !== "") {
      newList = newList.filter((job) => job.priority === priority);
    } else if (jobName !== "") {
      newList = newList.filter((job) =>
        job.name?.toLowerCase().includes(jobName.toLowerCase())
      );
    }

    return newList.map((job) => (
      <tr key={job.id}>
        <td>{job.name}</td>
        <td>
          <button
            className={styles.priorityButton}
            style={
              job.priority === "Urgent"
                ? { backgroundColor: "#f03c6c" }
                : job.priority === "Regular"
                ? { backgroundColor: "#f8ac24" }
                : { backgroundColor: "#045edc" }
            }
          >
            {job.priority}
          </button>
        </td>
        <td className={styles.icons}>
          <span>
            <HiOutlinePencilAlt
              size={25}
              onClick={() => {
                setEditModalOpen(true);
                setJobId(job.id);
              }}
            />
          </span>
          <span>
            <HiOutlineTrash
              size={25}
              onClick={() => {
                setDeleteModalOpen(true);
                setJobId(job.id);
              }}
            />
          </span>
        </td>
      </tr>
    ));
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.context}>
          <h3>Job List</h3>
          <div className={styles.filterBody}>
            <div className={styles.nameCol}>
              <input
                onChange={(e) => {
                  setJobName(e.target.value);
                }}
                maxLength={255}
                placeholder="Enter job name"
              />
            </div>
            <div className={styles.priorityCol}>
              {
                <select onChange={(e) => setPriority(e.target.value)}>
                  <option label="Priority(all)" hidden />
                  {priorities?.map((priority, i) => (
                    <option key={i}>{priority}</option>
                  ))}
                </select>
              }
            </div>
          </div>
          <div className={styles.outerTable}>
            <table className={styles.jobList}>
              <thead>
                <tr>
                  <td>Name</td>
                  <td>Priority</td>
                  <td>Action</td>
                </tr>
              </thead>
              <tbody>{defaultListOrder()}</tbody>
            </table>
          </div>
        </div>
      </div>
      {editModalOpen && (
        <EditModal setEditModalOpen={setEditModalOpen} jobId={jobId} />
      )}
      {deleteModalOpen && (
        <DeleteModal setDeleteModalOpen={setDeleteModalOpen} jobId={jobId} />
      )}
    </>
  );
}
