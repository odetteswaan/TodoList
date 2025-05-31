import { Box,Grid ,styled, Typography,Button} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
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
const DisplayTodo = (props:{data:task[]}) => {
  return (
<Grid container spacing={2} sx={{marginTop:'50px'}}>

    {props.data.length!==0&&props.data.map(item=>(
<Grid  size={{lg:3,sm:6,xs:12}} >
    <Card>
        <Box sx={{width:'100%',display:'flex',justifyContent:'space-between'}}>
            <Typography style={{fontSize:'18px',fontWeight:700,color:'black'}}>Task Title :{item.task}</Typography>
            <DeleteIcon color='error'/>
        </Box>
        <hr style={{width:'100%',border:'1px solid black'}}/>
        <Box>
            <Typography sx={{fontSize:'16px',fontWeight:600}}>Description</Typography>
            <Typography sx={{fontSize:'12px',color:'grey'}}>{item.description}</Typography>
        </Box>
        <Box sx={{width:'100%',display:'flex',justifyContent:'space-between'}}>
            <Button sx={{
                width:'200px',
                height:'50px',
                color:'lightblue',
                backgroundColor:'purple',
                textTransform:'capitalize'

            }}>
                  {item.status==='Active'?"Mark As Completed":"Completed"}
            </Button>
        </Box>
    </Card>
</Grid>
        
    ))}
    {props.data.length===0&&<Typography variant='h2'>No Task Found </Typography>}
</Grid>
  )
}

export default DisplayTodo