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
    const headers = {Authentication: 'Bearer ' + JSON.parse(sessionStorage.getItem("token")).token};
    const inputFileRef = React.useRef(null);
    const [editorIsOpen, setEditorIsOpen] = React.useState(false);
    const [editorMode, setEditorMode] = React.useState('upload'); //or 'edit'
    const [currentRowInfo, setCurrentRowInfo] = React.useState({});
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
    }, [route])

    async function reloadPage(){
        axios
        .get(route)
        .then((response) => {
          setData(response.data)})
        .catch((err) => {
          console.warn(err);
          alert(`Error occured while getting ${route}!`)});
    };

    function resetEditor(){
        setEditorMode('upload')
        setRequestBody({});
        setEditorIsOpen(false);
        reloadPage();
    }

    if (!data){return (<></>)};

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

    function pictureNameToUrl(){
        if (Object.keys(requestBody).includes("pictureName"))
            {
                const pictureUrl = `/pictures/${requestBody.category}/${requestBody.pictureName}`;
                requestBody["pictureUrl"] = pictureUrl;
            }
    }

    async function uploadToTable() {
        try {
            pictureNameToUrl();
            await axios.post(`${route}`, requestBody, {headers:headers});
            resetEditor();
        } catch (err) {
            console.warn(err);
            alert('Something went wrong while uploading!');
        }
    };

    async function uploadImageToTable(event){
        try {
          var formData = new FormData();
          const file = event.target.files[0];

          formData.append('image', file);

          setCurrentRowInfo((prev) => ({...prev, "pictureUrl" : `/pictures/no-category/${file.name}`}));
          requestBody.oldPictureUrl = `/pictures/no-category/${file.name}`;

          await axios.post('/upload', formData, {headers:headers});

          setEditorIsOpen(true);
        } catch (err) {
          console.warn(err);
          alert('Error occured while uploading file!');
        }
    };

    async function updateTable() {
        try {
            pictureNameToUrl();
            requestBody.oldPictureUrl = currentRowInfo.pictureUrl;
            await axios.patch(`${route}/${currentRowInfo.id}`, requestBody, {headers:headers});
            resetEditor();
        } catch (err) {
            console.warn(err);
            alert('Something went wrong while uploading!');
        }
    };

    async function deleteFromTable() {
        try {
            await axios.delete(`${route}/${currentRowInfo.id}`, {headers:headers})
            setData(data.filter((row) => row.id !== currentRowInfo.id))
            resetEditor();
        } catch (err) {
            console.warn(err);
            alert('Something went wrong while deleting!');
        }
    };

    function returnJsxFormElement(el)
    {
        if (el === "category")
        {
            var defaultCategory = 'no-category';
            var categories = ["cg-paint-left", "cg-paint-right", "cg-graph", "trad", "comics", "no-category"];
            if (route === "posts")
            {
                defaultCategory = 'misc';
                categories = ["misc", "dev", "art", "comics"];
            }

            if (editorMode === "upload" && !requestBody["category"]){setRequestBody((prev) => ({...prev, "category" : defaultCategory}))}
            return( 
                <div className={styles.formBlock}>
                    <div className={styles.formLabel}>category:</div>
                    <Select defaultValue={editorMode === "upload" ? defaultCategory : currentRowInfo?.category} key={el} onChange={(e) => setRequestBody((prev) => ({...prev, [el] : e.target.value}))}>
                        {categories.map((el) => <MenuItem value={el} key={el}>{el}</MenuItem>)}
                    </Select>
                </div>)
            }
        else if (el === "pictureUrl")
        {
            const newLabel = "pictureName";
            return(
            <div className={styles.formBlock}>
                <div className={styles.formLabel}>pictureName:</div>
                <TextField defaultValue={editorMode === "upload" ? '' :  /([^/]*)$/g.exec(currentRowInfo[el])[0]} key={el} onChange={(e) => {setRequestBody((prev) => ({...prev, "pictureName" : e.target.value}));console.log(requestBody);}}></TextField>
            </div>)

        }
        return( 
        <div className={styles.formBlock}>
            <div className={styles.formLabel}>{`${el}:`}</div>
            <TextField defaultValue={editorMode === "upload" ? '' : currentRowInfo[`${el}`]} key={el} onChange={(e) => {setRequestBody((prev) => ({...prev, [el] : e.target.value}));console.log(requestBody);}}></TextField>
        </div>)
    }

    return (
        <div className={styles.tableWrapper}>
            {editorIsOpen ? 
                <div className={styles.uploaderEditorBox}>
                    <div className={styles.closeIconWrapper}>
                        <CloseIcon onClick={()=>{setEditorMode('upload');setRequestBody({});setEditorIsOpen(false)}} sx={{borderRadius: 2, "border":"solid black 1px", "cursor":"pointer"}}/>
                    </div>
                    {route === "pictures" ? <img className={styles.picturePreview} src={`http://localhost:4444${currentRowInfo.pictureUrl}`}/> : <></>}
                    <div className={styles.formWrapper}>
                        {columnsTitles.filter((el) => !["id","created","modified"].includes(el)).map((el) =>
                            returnJsxFormElement(el)
                        )}
                        <>
                        <div className={styles.submitButton} onClick={() => {editorMode === 'upload' ? uploadToTable() : updateTable(); resetEditor()}}>Submit row</div>
                        {editorMode === "upload" ? <></> : <div className={styles.submitButton} onClick={() =>{deleteFromTable(); resetEditor()}}>Delete row</div>}
                        </>
                    </div>
                </div> 
            : <></>}
            <Box sx={{"height": "800px", "width": "100%"}}>
            <DataGrid
            sx={{"width": "100%", "cursor": "pointer"}}
            columns={columns}
            rows={data}
            disableRowSelectionOnClick
            onRowClick={(rowInfo)=>{setCurrentRowInfo(rowInfo.row); setEditorMode('edit'); setEditorIsOpen(true)}}
        />
        </Box>
        <div className={styles.buttonBox}>
            <div className={styles.button} onClick={()=>{route === "pictures" ? inputFileRef.current.click() : setEditorIsOpen(true)}}>Create new row</div>
            <input 
            ref={inputFileRef} 
            type="file" 
            onChange={uploadImageToTable} 
            hidden 
        />
        </div>
      </div>

    );
};
