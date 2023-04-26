import React from 'react';
import { DataGrid} from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import styles from "./TableTemplate.module.scss";
import axios from '../../axios'
import Avatar from "@mui/material/Avatar";
import CloseIcon from '@mui/icons-material/Close';

import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';


export const TableTemplate = ({route}) => {

    const [data, setData] = React.useState();
    const [selectedRows, setSelectedRows] = React.useState([]);
    const headers = {Authentication: 'Bearer ' + JSON.parse(sessionStorage.getItem("token")).token};
    const inputFileRef = React.useRef(null);
    const [imageUrl, setImageUrl] = React.useState('');

    const [currentImage, setCurrentImage] = React.useState();
    const [uploaderIsOpen, setUploaderIsOpen] = React.useState(false);
    const [uploadedImages, setUploadedImages] = React.useState([]);

    const [requestBody, setRequestBody] = React.useState({});

    React.useEffect(()=>{
        axios
        .get(route)
        .then((response) => {
          setData(response.data)})
        .catch((err) => {
          console.warn(err);
          alert(`Error occured while getting ${route}!`);
        });
    }, [])

    async function reloadPage(){
        axios
        .get(route)
        .then((response) => {
          setData(response.data)})
        .catch((err) => {
          console.warn(err);
          alert(`Error occured while getting ${route}!`)});
    };

    if (!data){return (<></>)};

    const openUploader= (image) => {
        setCurrentImage(image);
        setUploaderIsOpen(true);
      };

    const closeUploader= () => {
        setCurrentImage();
        setUploaderIsOpen(false);
      };

    const columnsTitles = Object.keys(data[0]);
    var columns = route === "pictures"
    ? [ {
        field: "preview",
        flex: 1,
        renderCell: (params) => {
          return (
            <>
              <Avatar src={`http://localhost:4444${params.row.pictureUrl}`} variant="square"/>
            </>
          );
        }
      },]
    : [];
    columnsTitles.forEach((el)=>{
        var flex = 1;
        if (["id", "redraw"].includes(el) ){flex=0.5};
        if (["about", "pictureUrl", "txt"].includes(el) ){flex=2.5};
        columns.push({field: el, flex: flex})}
        );

    async function uploadToTable() {
        try {
            await axios.post(`${route}`, requestBody, {headers:headers});
            setRequestBody({});
            reloadPage();
        } catch (err) {
            console.warn(err);
            alert('Something went wrong while uploading!');
        }
    }

    async function uploadImageToTable(event){
        try {
          var formData = new FormData();
          const files = event.target.files;

          Array.from(files).forEach((file) => {
            console.log("file: ",file);
            formData.append('images', file);
            });

          const {data} = await axios.post('/upload', formData, {headers:headers});
          setImageUrl(data.url);

          openUploader();
        } catch (err) {
          console.warn(err);
          alert('Error occured while uploading file!');
        }
      };

    function updateTable(route) {
        try {
        selectedRows.forEach(async (id) => {
            await axios.delete(`${route}/${id}`, {headers:headers})
        })  
        setData(data.filter((row) => !selectedRows.includes(row.id)))
        setSelectedRows([]);
        } catch (err) {
            console.warn(err);
            alert('Something went wrong while updating!');
        }
    }

    function deleteFromTable(route) {
        try {
        selectedRows.forEach(async (id) => {
            await axios.delete(`${route}/${id}`, {headers:headers})
        })  
        setData(data.filter((row) => !selectedRows.includes(row.id)))
        setSelectedRows([]);
        } catch (err) {
            console.warn(err);
            alert('Something went wrong while deleting!');
        }
    }

    function returnJsxFormElement(el)
    {
        if (el === "category" && (route === "pictures" || route === "series-descriptions")){
            const defaultCategory = "no-category";
            if (!requestBody["category"]){setRequestBody((prev) => ({...prev, "category" : defaultCategory}))}
            return( 
            <div className={styles.formBlock}>
                <div className={styles.formLabel}>category: </div>
                <Select defaultValue={defaultCategory} key={el} onChange={(e) => setRequestBody((prev) => ({...prev, [el] : e.target.value}))}>
                    {["cg-paint-left", "cg-paint-right", "cg-graph", "trad", "comics", "no-category"].map((el) =>
                    <MenuItem value={el} key={el}>{el}</MenuItem>)}
                </Select>
            </div>)
        }
        else if (el === "category" && route === "posts"){
            const defaultCategory = "misc";
            if (!requestBody["category"]){setRequestBody((prev) => ({...prev, "category" : defaultCategory}))};
            return(
            <div className={styles.formBlock}>
                <div className={styles.formLabel}>category: </div>
                <Select defaultValue={defaultCategory} key={el} onChange={(e) => setRequestBody((prev) => ({...prev, [el] : e.target.value}))}>
                    {["misc", "dev", "art", "comics"].map((el) =>
                <MenuItem value={el} key={el}>{el}</MenuItem>)}
                </Select>
            </div>)
        }
        return( 
        <div className={styles.formBlock}>
            <div className={styles.formLabel}>{`${el}: `}</div>
            <TextField key={el} onChange={(e) => setRequestBody((prev) => ({...prev, [el] : e.target.value}))}></TextField>
        </div>)
    }

    const onSubmit = async (values) => {
        console.log("values", values);
        // const data = await dispatch(fetchRegister(values));
    
        // console.log("!!!!",data);
    
        // if (!data.payload){
        //   return alert('Registartion failed! :(');
        // };
    
        // if ('token' in data.payload){
        //   window.localStorage.setItem('token', data.payload.token);
        // };
      };

    return (
        <div className={styles.tableWrapper}>
            {uploaderIsOpen ? 
                <div className={styles.uploaderBox}>
                    <div className={styles.closeIconWrapper}>
                        <CloseIcon onClick={()=>{closeUploader(); setRequestBody({});}} sx={{borderRadius: 2, "border":"solid black 1px", "cursor":"pointer"}}/>
                    </div>
                    <div className={styles.formWrapper}>
                        {columnsTitles.filter((el) => !["id","created","modified"].includes(el)).map((el) =>
                            returnJsxFormElement(el)
                        )}
                        <div className={styles.submitButton} onClick={() => {uploadToTable();closeUploader(); setRequestBody({})}}>Submit</div>
                    </div>
                </div> 
            : <></>}
            <Box sx={{"height": "800px", "width": "100%"}}>
            <DataGrid
            sx={{"width": "100%"}}
            columns={columns}
            rows={data}
            checkboxSelection
            disableRowSelectionOnClick

            onRowSelectionModelChange={(ids) => {
                setSelectedRows(ids);
            }}
        />
        </Box>
        <div className={styles.buttonBox}>
            <div className={styles.button} onClick={()=>{route === "pictures" ? inputFileRef.current.click() : openUploader()}}>Upload new items</div>
            <input 
            ref={inputFileRef} 
            type="file" 
            multiple="multiple"
            onChange={uploadImageToTable} 
            hidden 
        />
            <div className={styles.button}>Update selected items</div>
            <div className={styles.button} onClick={() => deleteFromTable(route)}>Remove selected items</div>
        </div>
      </div>

    );
};
