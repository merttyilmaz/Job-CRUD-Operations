import React from "react";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { addJob } from "../../slices/jobsSlice";
import { v4 as uuidv4 } from "uuid";

import styles from "../../styles/CreateJob.module.scss";

export default function CreateJob() {
  const [priorities, SetPriorities] = useState<String[]>([]);
  const nameRef = useRef<HTMLInputElement>(null);
  const priorityRef = useRef<HTMLSelectElement>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    SetPriorities(
      localStorage.getItem("priorityList")
        ? JSON.parse(localStorage.getItem("priorityList")!)
        : []
    );
  }, []);

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (nameRef.current?.value && priorityRef.current?.value) {
      dispatch(
        addJob({
          id: uuidv4(),
          name: nameRef.current.value,
          priority: priorityRef.current.value,
        })
      );
      nameRef.current.value = "";
      priorityRef.current.value = "";
    } else {
      window.alert("Please enter a job name and priority");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.context}>
        <h3>Create Job</h3>
        <div className={styles.body}>
          <div className={styles.nameCol}>
            <label>Job Name</label>
            <input ref={nameRef} maxLength={255} placeholder="Enter job name" />
          </div>
          <div className={styles.priorityCol}>
            <label>Job Priority</label>
            {
              <select ref={priorityRef}>
                <option label="Chose" hidden />
                {priorities?.map((priority, i) => (
                  <option key={i}>{priority}</option>
                ))}
              </select>
            }
          </div>
          <button onClick={(e) => handleSubmit(e)}>+ Create</button>
        </div>
      </div>
    </div>
  );
}
