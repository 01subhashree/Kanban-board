import { useState } from "react";
import "./App.css";
// import { DragDropContext, Droppable } from "react-beautiful-dnd";
import AddListButton from "./component/button/addListButton/AddListButton";
import { Card } from "./component/card/Card";

function App() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <h1>Kanban board</h1>
      <AddListButton onClick={() => setOpen(true)} />
      <Card />
    </>
  );
}

export default App;
