import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
export const Todo = ({ task, deleteTodo, editTodo, toggleComplete }) => {
  //component only renders if isDeleted is false
  //if isFadeOut is true then the fadeout class is added to our element and when that animation ends we
  //set setIsDeleted to true and run the deleteTodo function we passed down via props.
  //I am the first to admit this is pretty horrific to look at, will refactor later... maybe.

  const [isFadeOut, setIsFadeOut] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);

  const handleDelete = () => {
    setIsFadeOut(true);
  };

  const handleAnimationEnd = () => {
    if (isFadeOut) {
      setIsDeleted(true);
      deleteTodo();
    }
  };
  return (
    <>
      {!isDeleted && (
        <div
          className={`todo ${isFadeOut ? "fade-out" : ""}`}
          onAnimationEnd={handleAnimationEnd}
        >
          <p
            className={task.completed ? "completed" : ""}
            onClick={() => toggleComplete(task.id)}
          >
            {task.task}
          </p>
          <div>
            <FontAwesomeIcon
              icon={faPenToSquare}
              onClick={() => editTodo(task.id)}
            />
            <FontAwesomeIcon icon={faTrash} onClick={handleDelete} />
          </div>
        </div>
      )}
    </>
  );
};
