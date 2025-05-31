import {
  Modal,
  Typography,
  Box,
  TextField,
  styled,
  Button,
  IconButton,
  CircularProgress,
} from "@mui/material";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import axios from "axios";
import { baseUrl, editTask, getTaskById, postTask } from "./config";
type task = {
  _id:string;
    status: string;
    taskDescription: string;
    taskTitle: string;
};
const style = {
};
const ModalContainer=styled(Box)(({theme})=>({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: '400px',
  backgroundColor: "#fff",
  padding: '30px',
  borderRadius: "20px",
  [theme.breakpoints.down('sm')]:{
    width:'300px'
  }

}))
const TodoSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, "Too short!")
    .max(50, "Too long!")
    .required("Required"),
  description: Yup.string(),
});
const CustomTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    borderRadius: "12px",
    height: "50px",
  },
  "& .MuiInputBase-input": {
    padding: "12px",
    fontStyle: "italic",
    fontWeight: "bold",
    fontFamily: "Roboto",
    fontSize: "16px",
  },
  "& .MuiInputLabel-root": {
    fontWeight: 500,
    fontStyle: "normal",
  },
});
const TaskModal = (props: {
  open: boolean;
  handleClose: () => void;
  task: task[];
  setTask: Dispatch<SetStateAction<task[]>>;
  id?: string;
}) => {
  const [item, setItem] = useState<task>();
  const[isloading,setLoading]=useState(true)
  useEffect(() => {
    console.log(props.id);
    if (props.id) {
       axios.get(`${baseUrl}${getTaskById(props.id)}`).then(res=>{
        setItem(res.data)
        setLoading(false)
       }).catch(err=>console.log(err))
    }
    else{
      setLoading(false)
    }
  }, []);
  if(isloading){
    return <Box sx={{position:'absolute',zIndex:10,top:'50%',left:'50%'
    }}>
      <CircularProgress/>
    </Box>
  }
  return (
    <Modal
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <ModalContainer sx={style}>
        <Box
          sx={{ width: "100%", display: "flex", justifyContent: "flex-end" }}
        >
          <IconButton onClick={props.handleClose}>
            <CloseIcon color="disabled" />
          </IconButton>
        </Box>
        <Typography
          sx={{ fontSize: "24px", fontWeight: 700, color: "darkblue" }}
        >
           { props.id?'Edit Task':'Add task'}
        </Typography>
        <Formik
          initialValues={{
            title: item?.taskTitle || "",
            description: item?.taskDescription || "",
          }}
          validationSchema={TodoSchema}
          onSubmit={(values) => {
            const newTask = {
              taskTitle: values.title,
              taskDescription: values.description,
              status: "Active",
            };
            if (props.id) {
              axios.put(`${baseUrl}${editTask(props.id)}`,newTask).then(()=>{
                window.location.reload()
              }).catch((err)=>{
               console.log(err)
              })
            } else {
              const body={
                taskTitle: values.title,
               taskDescription: values.description,
               status: "Active",
              }
             axios.post(`${baseUrl}${postTask}`,body).then(()=>{
              window.location.reload()
             }).catch(err=>console.log(err))
            }
          }}
        >
          {({ values, errors, touched, handleChange }) => (
            <Form
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "30px",
                marginTop: "20px",
              }}
            >
              <CustomTextField
                fullWidth
                name="title"
                onChange={handleChange}
                value={values.title}
                error={touched.title && Boolean(errors.title)}
                helperText={touched.title && Boolean(errors.title)}
                placeholder="Task Title"
              />
              <CustomTextField
                fullWidth
                name="description"
                onChange={handleChange}
                value={values.description}
                error={touched.description && Boolean(errors.description)}
                helperText={touched.description && Boolean(errors.description)}
                placeholder="Task Description"
              />
              <Button
                sx={{
                  width: "100%",
                  height: "40px",
                  borderRadius: "15px",
                  backgroundColor: "blueviolet",
                  color: "white",
                  fontWeight: 700,
                }}
                type="submit"
              >
                {" "}
               { props.id?'Edit Task':'Add task'}
              </Button>
            </Form>
          )}
        </Formik>
      </ModalContainer>
    </Modal>
  );
};

export default TaskModal;
