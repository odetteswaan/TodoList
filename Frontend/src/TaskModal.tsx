import { Modal,Typography,Box,TextField,styled,Button, IconButton} from "@mui/material"
import { Formik,Form } from "formik";
import * as Yup from 'yup'
import CloseIcon from '@mui/icons-material/Close';
import type { Dispatch, SetStateAction } from "react";
type task={
  task:string;
  description:string,
  status:string,
}
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius:'20px'
};
const TodoSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, 'Too short!')
    .max(50, 'Too long!')
    .required('Required'),
  description: Yup.string()
});
const CustomTextField=styled(TextField)({
    '& .MuiOutlinedInput-root': {
      borderRadius: '12px',
      height: '50px',
    },
    '& .MuiInputBase-input': {
      padding: '12px',
      fontStyle: 'italic',      
      fontWeight: 'bold',       
      fontFamily: 'Roboto',   
      fontSize: '16px',        
    },
    '& .MuiInputLabel-root': {
      fontWeight: 500,    
      fontStyle: 'normal',
    }
})
const TaskModal = (props:{open:boolean,handleClose:()=>void,task:task[],setTask:Dispatch<SetStateAction<task[]>>}) => {
  return (
    <Modal
    open={props.open}
    onClose={props.handleClose}
       aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
            <Box sx={{width:'100%',display:'flex',justifyContent:'flex-end'}}>
                  <IconButton onClick={props.handleClose}>
                    <CloseIcon color="disabled"/>
                  </IconButton>
            </Box>
          <Typography sx={{fontSize:'24px',fontWeight:700,color:'darkblue'}}>Add Task </Typography>
          <Formik  initialValues={{ title: '', description: '' }}
      validationSchema={TodoSchema}
      onSubmit={(values) => {
        props.setTask([...props.task,{task:values.title,description:values.description,status:'Active'}])
        props.handleClose()
      }}>
        {({values,errors,touched,handleChange})=>(
            <Form style={{display:"flex",flexDirection:'column',gap:'30px',marginTop:'20px'}}>
              <CustomTextField fullWidth name="title" onChange={handleChange}
              value={values.title} 
              error={touched.title&&Boolean(errors.title)}
              helperText={touched.title&&Boolean(errors.title)} 
              placeholder="Task Title"/>
              <CustomTextField fullWidth name="description" onChange={handleChange}
              value={values.description} 
              error={touched.description&&Boolean(errors.description)}
              helperText={touched.description&&Boolean(errors.description)}
              placeholder="Task Description"/>
              <Button sx={{width:'100%',height:'40px',borderRadius:'15px',backgroundColor:'blueviolet',color:'white',
                fontWeight:700,
              }} type="submit"> Add Task</Button>
            </Form>
        )}

          </Formik>
        </Box>
      </Modal>
  )
}

export default TaskModal