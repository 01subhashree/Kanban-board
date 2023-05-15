import styles from "./CardList.module.css";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { addCards } from "../../atom/Atom";
import { Draggable, Droppable } from "react-beautiful-dnd";
import TaskCard from "../taskCard/TaskCard";
import { dialogBox } from "../../atom/Atom";

export function CardList() {
  const cards = useRecoilValue(addCards);
  const setIsDialog = useSetRecoilState(dialogBox);

  console.log(cards);

  function clickHandler(card) {
    setIsDialog(true);
    console.log("hello");
  }

  return (
    <div>
      <Droppable droppableId="todo" type="cards">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {cards &&
              cards.map((card, index) => (
                <Draggable draggableId={card.id} key={card.id} index={index}>
                  {(provided) => (
                    <div
                      {...provided.dragHandleProps}
                      {...provided.draggableProps}
                      ref={provided.innerRef}
                    >
                      <TaskCard
                        taskTitle={card.card}
                        onClick={() => clickHandler(card)}
                      />
                      {/* <p className={styles.card} key={card.id}>
                      <p
                        className={styles.card}
                        key={card.id}
                        onClick={() => clickHandler(card)}
                      >
                        {card.card}
                      </p> */}
                    </div>
                  )}
                </Draggable>
              ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}
