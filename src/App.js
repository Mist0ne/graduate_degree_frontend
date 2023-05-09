import './App.css';
import React, {createContext, useState} from "react";
import PageTemplate from "./templates/pageTemplate";
import {createTheme, CssBaseline, ThemeProvider} from "@mui/material";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import MainPage from "./pages/main";
import FileUploadPage from "./pages/fileUpload";
import StatisticPage from "./pages/statistic";


export const ThemeContext = createContext(null);


const App = () => {
    // themes block
    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
            background: {
                paper: '#282c34',
                default: '#282c34',
            },
        },
    });

    const lightTheme = createTheme({
        palette: {
            mode: 'light',
            background: {
                paper: '#E6E6E6',
                default: '#E6E6E6',
            },
        },
    });

    const [theme, setTheme] = useState(darkTheme);
    const toggleTheme = () => {
        setTheme((currentTheme) => (currentTheme.palette.mode === "light" ? darkTheme : lightTheme));
    }

    // router block
    const router = createBrowserRouter([
        {
            path: "/",
            element: <PageTemplate child={<MainPage/>}/>,
        },
        {
            path: "/form",
            element: <PageTemplate child={<FileUploadPage/>}/>,
        },
        {
            path: "/checks",
            element: <PageTemplate child={<StatisticPage/>}/>,
        },
    ]);

    return (
        <ThemeContext.Provider value={[theme, toggleTheme]}>
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <RouterProvider router={router}/>
            </ThemeProvider>
        </ThemeContext.Provider>
    );
}

export default App;
