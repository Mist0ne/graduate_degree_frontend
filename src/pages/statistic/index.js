import {Box, Container, Typography} from "@mui/material";
import axiosWrapper from "../../utils/axios";
import {useEffect, useState} from "react";
import {DataGrid} from '@mui/x-data-grid';
import {useTranslation} from "react-i18next";

const StatisticPage = () => {
    const {t} = useTranslation();

    const columns = [
        {
            field: 'fileId',
            headerName: 'ID',
            width: 150
        },
        {
            field: 'name',
            headerName: t('statisticPage.fileName'),
            width: 300
        },
        {
            field: 'checkResult',
            headerName: t('statisticPage.allowed'),
            width: 240,
            valueGetter: (params) => t(`statisticPage.statuses.${params.value}`)
        },
        {
            field: 'checkDetails',
            headerName: t('statisticPage.details'),
            sortable: false,
            width: 410,
            valueGetter: (params) =>
                params.value
                    ? t('statisticPage.downloadJsonButton')
                    : t('statisticPage.noDetails')
        },
    ];

    const downloadObjectAsJson = (exportObj, exportName) => {
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(exportObj);
        const downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute("href", dataStr);
        downloadAnchorNode.setAttribute("download", exportName + ".json");
        document.body.appendChild(downloadAnchorNode);
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
    }


    const [files, setFiles] = useState([]);

    const dataProcessing = (data) => {
        let newFiles = [];
        Object.keys(data).forEach((key, index) => {
            if (data[key].status === 'SUCCESS') {
                newFiles.push({
                    id: index + 1,
                    name: data[key].data.name,
                    fileId: data[key].data.uuid,
                    checkResult: data[key].data.allowed,
                    checkDetails: data[key].data.results,
                });
            } else if (data[key].status === 'PENDING') {
                newFiles.push({
                    id: index + 1,
                    name: '-',
                    fileId: key,
                    checkResult: 'inProgress',
                    checkDetails: null,
                });
            } else if (data[key].status === 'unknown task id') {
                newFiles.push({
                    id: index + 1,
                    name: '-',
                    fileId: key,
                    checkResult: 'unknownFile',
                    checkDetails: null,
                });
            }
        });
        setFiles(newFiles);
    };

    useEffect(() => {
        axiosWrapper('get', 'statistics', {}, dataProcessing);
    }, []);

    return <Container>
        <Box>
            <Box sx={{my: 4, display: 'flex', justifyContent: 'center'}}>
                <Typography variant="h5">
                    {t('statisticPage.title')}
                </Typography>
            </Box>
            {files.length
                ? <DataGrid
                    rows={files}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: {page: 0, pageSize: 10},
                        },
                    }}
                    pageSizeOptions={[5, 10, 20]}
                    checkboxSelection
                    onCellClick={(params) => {
                        if (params.field === 'checkDetails') {
                            const checkedFile = files[params.id - 1];
                            if (checkedFile.checkDetails)
                                downloadObjectAsJson(checkedFile.checkDetails, checkedFile.fileId);
                        }
                    }}
                />
                : <Typography variant="h7" sx={{display: 'flex', justifyContent: 'center'}}>
                    {t('statisticPage.nothingToShow')}
                </Typography>
            }
        </Box>
    </Container>;
};

export default StatisticPage;