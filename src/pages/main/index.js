import {Box, Container, Step, StepContent, StepLabel, Stepper, Typography} from "@mui/material";
import {useTranslation} from 'react-i18next';
import './index.css';
import {useEffect, useState} from "react";
import Button from "@mui/material/Button";


const MainPage = () => {
    const {t} = useTranslation();

    const steps = ["1", "2", "3"];
    const [activeStep, setActiveStep] = useState(0);
    const [activeTimer, setActiveTimer] = useState(null);
    useEffect(() => {
        setActiveTimer(setTimeout(() => {
            setActiveStep((activeStep + 1) % 3);
        }, 5000));
    }, [activeStep]);

    return (
        <Container maxWidth="lg">
            <Box sx={{display: 'flex', flexFlow: 'column nowrap', animation: 'show 2s', marginTop: 6}}>
                <Typography
                    variant='h3'
                    paragraph={true}
                    sx={{margin: 'auto'}}>
                    {t('mainPage.title')}
                </Typography>
                <Typography
                    variant='h4'
                    paragraph={true}
                    sx={{textAlign: 'center', marginTop: 4}}>
                    {t('mainPage.subtitle')}
                </Typography>
            </Box>
            <Box sx={{
                display: 'flex',
                flexFlow: 'column nowrap',
                animation: 'show 4s',
                maxWidth: "sm",
                margin: 'auto',
                marginTop: 12
            }}>
                <Typography
                    variant='h4'
                    paragraph={true}
                    sx={{margin: 'auto'}}>
                    {t('mainPage.using.title')}
                </Typography>
                <Stepper activeStep={activeStep} orientation="vertical">
                    {steps.map((step) =>
                        <Step key={step} onClick={() => {
                            clearTimeout(activeTimer);
                            setActiveStep(Number(step - 1))
                        }}>
                            <StepLabel>
                                <Typography variant='h6'>
                                    {t(`mainPage.using.steps.${step}.title`)}
                                </Typography>
                            </StepLabel>
                            <StepContent>
                                <Typography variant='h7'>
                                    {t(`mainPage.using.steps.${step}.subtitle`)}
                                </Typography>
                            </StepContent>
                        </Step>
                    )}
                </Stepper>
            </Box>
            <Box sx={{
                maxWidth: 'sm',
                margin: 'auto',
                marginTop: 8,
                display: 'flex',
                justifyContent: 'space-around'
            }}>
                <Button variant="contained" size="large" onClick={() => document.querySelector("a[href='/form']").click()}>
                    {t(`mainPage.using.UploadButton`)}
                </Button>
                <Button variant="contained" size="large" onClick={() => window.open('https://github.com/michelcrypt4d4mus/pdfalyzer', '_blank')}>
                    {t(`mainPage.using.GitHubButton`)}
                </Button>
            </Box>
        </Container>
    );
}

export default MainPage;