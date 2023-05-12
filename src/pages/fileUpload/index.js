import {Box, Container, Typography} from "@mui/material";
import {useState} from "react";
import {FileUploader} from "react-drag-drop-files";
import {useTranslation} from "react-i18next";
import Button from "@mui/material/Button";
import axiosWrapper from "../../utils/axios";


const FileUploadPage = () => {
    const {t} = useTranslation();

    const fileTypes = ["PDF", "RAR", "ZIP"];
    const [files, setFiles] = useState([]);

    const handleChange = (newFiles) => {
        const map = new Map();

        [...newFiles, ...files].forEach((file) => {
            map.set(file['name'], file);
        });

        setFiles([...map.values()]);
    };

    const successSubmit = (data) => {
        console.dir(data);
    };

    const errorSubmit = () => {
        alert(321);
    };

    const formSubmit = (e) => {
        e.preventDefault();

        axiosWrapper('post', 'filecheck', {
                files: files
            }, successSubmit, errorSubmit);
    };

    return <Container
        maxWidth="md"
        sx={{display: 'flex', flexFlow: 'column nowrap', alignItems: 'center', boxShadow: 1}}
    >
        <form onSubmit={formSubmit}>
            <Box>
                <Typography variant="h4" sx={{paddingY: 6}}>
                    {t('fileUploadPage.title')}
                </Typography>
                <FileUploader
                    multiple={true}
                    required={true}
                    handleChange={handleChange}
                    name="files"
                    types={fileTypes}
                />
                <Typography variant="h5" sx={{paddingTop: 4}}>
                    {files.length ? t('fileUploadPage.uploader.uploadedList') : t('fileUploadPage.uploader.nothingToShow')}
                </Typography>
                <ul>
                    {files.map((file) => <li key={file.name}>{file.name}</li>)}
                </ul>
            </Box>
            <Box sx={{display: 'flex', flexFlow: 'column nowrap', alignItems: 'center', paddingY: 6}}>
                <Button type="submit" size="large" variant="contained">
                    {t('fileUploadPage.send')}
                </Button>
            </Box>
        </form>
    </Container>;
};

export default FileUploadPage;