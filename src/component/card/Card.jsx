import styles from "./Card.module.css";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
// import AddListButton from '../button/addListButton/AddListButton';
import { IoMdAdd } from "react-icons/io";
import { TbTemplate } from "react-icons/tb";
import { Tooltip } from "@mui/material";
import { useState } from "react";
import TaskCard from "../taskCard/TaskCard";
import { Draggable, Droppable, DragDropContext } from "react-beautiful-dnd";

export function Card() {
  const [input, setInput] = useState("add Title");
  const [arr, setArr] = useState([
    "do something",
    "Dare 3",
    "Eat 5 Star, Do nothing",
  ]);

  function handleTitle(e) {
    setInput(e.target.value);
  }
  console.log(input);

  function handleDrop() {
    console.log("Hello");
  }

  return (
    <div className={styles.cardContainer}>
      <DragDropContext onDragEnd={handleDrop}>
        <div className={styles.titleContainer}>
          <p className={styles.cardTitle} onChange={handleTitle}>
            {input}
          </p>
          <HiOutlineDotsHorizontal className={styles.dotsIcon} />
        </div>

        <Droppable droppableId="LIST" type="group">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {arr.map((ele, index) => (
                <Draggable draggableId="Draggable" index={index}>
                  {(provided) => (
                    <div
                      {...provided.dragHandleProps}
                      {...provided.draggableProps}
                      ref={provided.innerRef}
                    >
                      <TaskCard key={index} taskTitle={ele} />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>

        <div className={styles.addCardBtn}>
          <div className={styles.cardBtn}>
            <IoMdAdd className={styles.addIcon} />
            <p className={styles.addBtn}>Add a card</p>
          </div>
          <Tooltip title="create from template">
            <div className={styles.templateBtn}>
              <TbTemplate />
            </div>
          </Tooltip>
        </div>
      </DragDropContext>
    </div>
  );
}
