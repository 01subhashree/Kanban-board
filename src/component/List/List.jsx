/* eslint-disable react/prop-types */
import styles from "./List.module.css";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { IoMdAdd } from "react-icons/io";
import { TbTemplate } from "react-icons/tb";
import { Tooltip } from "@mui/material";
import { useState } from "react";
import { CardInput } from "../cards/cardInput/CardInput";
import { CardItem } from "../cards/cardItem/CardItem";
import { useRecoilState } from "recoil";
import { dashBoardData } from "../../atom/Atom";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import { dialogBox, TaskList } from "../../atom/Atom";
import { useSetRecoilState } from "recoil";

export function List({ title, handleDelete, index, listData }) {
  const { listId } = listData;
  const [show, setShow] = useState(true);
  const [isEdit, setIsEdit] = useState(false);

  const [data, setData] = useRecoilState(dashBoardData);
  const [listName, setListName] = useState("");

  const [isDialog, setIsDialog] = useRecoilState(dialogBox);
  const setCardDetail = useSetRecoilState(TaskList);

  function clickHandler(data) {
    setIsDialog(true);
    setCardDetail(data);
    console.log(data);
    console.log(isDialog);
  }

  const [anchorEl, setAnchorEl] = useState(null);
  // console.log(data);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  function handleAdd() {
    setShow(!show);
  }

  function handleDrag(result) {
    const { source, destination } = result;

    if (!destination) {
      return;
    }

    const sourceList = data[index].cards;

    const newSourceCards = Array.from(sourceList);
    const [reorderedCard] = newSourceCards.splice(source.index, 1);
    newSourceCards.splice(destination.index, 0, reorderedCard);

    const updated = { ...data[index], cards: newSourceCards };
    const final = [...data];
    final[index] = updated;

    setData(final);
  }

  function handleTitleEdit() {
    if (!listName) {
      return;
    }
    const temp = { ...data[index] };
    const update = [...data];
    temp.listTitle = listName;
    update[index] = temp;
    setData(update);
    setIsEdit(false);
  }

  // functions for card CRUD
  function handleCardDelete(cardId) {
    const tempList = { ...data[index] };
    const x = tempList.cards;
    const filteredCardData = x.filter((ele, idx) => ele.cardId != cardId);
    tempList.cards = filteredCardData;
    const finalData = [...data];
    finalData[index] = tempList;
    setData(finalData);
  }

  return (
    <div className={styles.cardContainer}>
      {/* <DragDropContext onDragEnd={handleDrag}> */}
      <div className={styles.titleContainer}>
        {isEdit ? (
          <span>
            <input
              onChange={(e) => setListName(e.target.value)}
              className={styles.title__input}
            />
            <button className={styles.title__saveBtn} onClick={handleTitleEdit}>
              save
            </button>
          </span>
        ) : (
          <p onClick={() => setIsEdit(true)} className={styles.cardTitle}>
            {title}
          </p>
        )}

        <div>
          <HiOutlineDotsHorizontal
            className={styles.dotsIcon}
            aria-describedby={id}
            onClick={handleClick}
          />

          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
          >
            <Typography
              onClick={handleDelete}
              sx={{ p: 1, width: "10rem", cursor: "pointer" }}
            >
              Delete List
            </Typography>
          </Popover>
        </div>
      </div>

      <DragDropContext onDragEnd={handleDrag}>
        <Droppable droppableId={`list-${index}`} type="cards">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {data &&
                data[index].cards.map((ele, index) => (
                  <CardItem
                    cardData={ele}
                    index={index}
                    key={index}
                    clickHandler={() => clickHandler(ele)}
                    handleCardDelete={() => handleCardDelete(ele.cardId)}
                  />
                ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      {show ? (
        <div className={styles.addCardBtn}>
          <div onClick={handleAdd} className={styles.cardBtn}>
            <IoMdAdd className={styles.addIcon} />
            <p className={styles.addBtn}>Add a card</p>
          </div>
          <Tooltip title="create from template">
            <div className={styles.templateBtn}>
              <TbTemplate />
            </div>
          </Tooltip>
        </div>
      ) : (
        <CardInput show={handleAdd} index={index} />
      )}
    </div>
  );
}
