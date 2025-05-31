import { Box,Grid ,styled, Typography,Button, IconButton,CircularProgress} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import { useState ,type Dispatch,type SetStateAction,useEffect} from 'react';
import TaskModal from './TaskModal';
import axios from 'axios';
import { baseUrl, deleteTask, getTask } from './config';
const Card=styled(Box)({
    padding:'30px',
    border:'1px solid #ECECEC',
    display:'flex',
    flexDirection:'column',
    borderRadius:'15px',
   justifyContent:'space-between',
    height:'100%'
})
type task={
  task:string;
  description:string,
  status:string,
}
type ResponseData={
    _id:string;
    status: string;
    taskDescription: string;
    taskTitle: string;
}
const DisplayTodo = (props:{data:task[],deleteItem:(id:number)=>void,setTask:Dispatch<SetStateAction<task[]>>}) => {
    const[open,setModal]=useState(false)
    const[editId,setId]=useState<number>(0)
    const[data,setData]=useState<ResponseData[]|null>(null)
    const[loading,setLoading]=useState(true)
    useEffect(()=>{
       axios.get(`${baseUrl}${getTask}`).then(res=>{
        console.log(res.data)
        setData(res.data)
        setLoading(false)
       }) 
       .catch(err=>console.log(err))
    },[])
    const handleDelete=(id:string)=>{
      axios.delete(`${baseUrl}${deleteTask(id)}`).then(()=>{
        window.location.reload()
      }).catch(err=>console.log(err))
    }
    if(loading){
        return (
        <Box sx={{width:'100%',height:'100vh',display:'flex',justifyContent:'center',alignItems:'center'}}>
             <CircularProgress/>
        </Box>
       )
    }
      return (
<Grid container spacing={2} sx={{marginTop:'50px'}}>
{open&&<TaskModal task={props.data} open={open} handleClose={()=>setModal(false)} id={editId} setTask={props.setTask}/>}
    {data?.length!==0&&data?.map((item,index)=>(
<Grid  size={{lg:3,sm:6,xs:12}} >
    <Card>
        <Box sx={{width:'100%',display:'flex',justifyContent:'space-between'}}>
            <Typography style={{fontSize:'18px',fontWeight:700,color:'black'}}>Task Title :{item.taskTitle}</Typography>
            <IconButton onClick={()=>handleDelete(item._id)}>
                 <DeleteIcon color='error'/>
            </IconButton>
        </Box>
        <hr style={{width:'100%',border:'1px solid black'}}/>
        <Box>
            <Typography sx={{fontSize:'16px',fontWeight:600}}>Description</Typography>
            <Typography sx={{fontSize:'12px',color:'grey'}}>{item.taskDescription}</Typography>
        </Box>
        <Box sx={{width:'100%',display:'flex',justifyContent:'space-between'}}>
            <Button sx={{
                width:'150px',
                height:'50px',
                color:'lightblue',
                backgroundColor:'purple',
                textTransform:'capitalize'

            }}>
                  {item.status==='Active'?"Mark As Completed":"Completed"}
            </Button>
            <Button sx={{
                width:'100px',
                color:'darkgreen',
                backgroundColor:'lightgreen',
                textTransform:'capitalize',
                height:'50px'
            }} 
            onClick={()=>{{setId(index);setModal(true)}}}
            >
                    Edit Task
            </Button>
        </Box>
    </Card>
</Grid>
        
    ))}
    {data?.length===0&&<Typography variant='h2'>No Task Found </Typography>}
</Grid>
  )
}

export default DisplayTodo