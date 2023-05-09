import Button from "@mui/material/Button";
import React from "react";

<div className="App">
            <main className="">
                <Button
                    variant="contained"
                    component="label"
                >
                    Выбрать файл
                    <input
                        type="file"
                        multiple
                        accept=".pdf .zip .rar"
                        hidden
                    />
                </Button>
            </main>
        </div>