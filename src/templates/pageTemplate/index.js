import Header from "../header/header";
import React from "react";

const PageTemplate = ({child}) => {
    return (
        <>
            <Header/>
            {child}
        </>
    );
}

export default PageTemplate;