import { Box,styled ,Button} from "@mui/material"
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DisplayTodo from "./DisplayTodo";
import { useState } from "react";
import TaskModal from "./TaskModal";
const Container=styled(Box)({
  width:'100%',
  display:'flex',
  justifyContent:'center'
})
const CustomBtn=styled(Button)({
  height:'40px',
  width:'150px',
  backgroundColor:'lightgreen',
  textTransform:'capitalize',
  borderRadius:'5px',
  fontSize:'16px',
  fontWeight:700,
  color:'green',
})
type task={
  task:string;
  description:string,
  status:string,
}
const App=()=>{
  const[taskArray,setTask]=useState<task[]>([])
  const[open,setModal]=useState(false)
  const DeleteItem=(index:number)=>{
         const newArray=taskArray.filter((_,i)=>i!==index)
         setTask(newArray)
  }
  return(
    <>
  <Container>
    {open&&<TaskModal open={open} handleClose={()=>setModal(false)} task={taskArray} setTask={setTask} />}
    <CustomBtn 
    onClick={()=>setModal(true)} endIcon={<AddCircleOutlineIcon/>}>
        Add Todo
    </CustomBtn>
  </Container>
    <DisplayTodo data={taskArray} deleteItem={DeleteItem} setTask={setTask}/>
    </>
  )
}

export default App
