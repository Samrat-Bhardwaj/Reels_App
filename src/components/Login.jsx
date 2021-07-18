import React, { useState, useContext } from 'react'
import {TextField,Typography, CardMedia,makeStyles, Container, Grid, Paper, Button,CardActions,Card,CardContent} from "@material-ui/core"
import { AuthContext } from "../contexts/AuthContext";
// import {LinkButton} from "@material-ui/icons"
import {Link} from "react-router-dom"
function Login(props) {
    let { login } = useContext(AuthContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoader] = useState(false);
    let useStyles = makeStyles ({
        centerDivs : {
            height : "100vh",
            display : "flex",
            justifyContent : "center",
            width: "100vw",
            alignItems:"center"
        },
        crousel: {
            height: "10rem",
            backgroundColor: "lightgray"
        },
        fullWidth: {
            width: "100%"
        },
        centerElements: {
            display: "flex",
            flexDirection: "column",
        },
        mb: {
            marginBottom: "0.5rem"
        },
        alignCenter: {
            justifyContent: "center"
        },
        image: {
            height: "6rem",
            backgroundSize: "contain"
        }
    })
    const handleSubmit = async (e) => {
        e.preventDefault();
        // alert(email + password);
        try {
            // async 
            console.log("Logging in user")
            setLoader(true);
            await login(email, password)
            // console.log(res.user);
            setLoader(false);
            props.history.push("/");
        } catch (err) {
            setLoader(false);
        }
        setEmail("");
        setPassword("");
    }
    let classes=useStyles;
    return (
        <div className={classes.centerDivs}>
            <Container>
                {/* total block */}
                <Grid container className={classes.alignCenter} spacing={2}>
                    {/* animation */}
                    <Grid item sm={4}>
                        <Paper>Carousel</Paper>
                    </Grid>

                    {/* login block */}
                    <Grid item sm={5}>
                        <Card variant="outlined">
                        <CardMedia
                                image="data:image/jpeg;base64,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i6pw8ebB/lj/APKsY9HFP+yvn3rNeLTPTivPuTXD8KlnqQyNpPafNA7XHqCoGY52UmUujHMs6JvaSRZzufZqPiQvyrzfTRQ2iaXnqDW6G+sgewFT3HsUkqKvW89zWj3rR2NH8+taWG1Y/LFt/BOlM+uy0tlpyMdZ32nptMdv8Rzb9My66+yr2Rv0Xi+X9Y5SFoubK05do+iwSFhFiGC47HHyiPWSrszzH4jvEaeteubb90Tv4w7RERQfHp1lfh49ma5cQq3sfK6WR8UbLlketzrOc4ganBpAAtYc9za1FREBERAREQEREBERAREQEREHExGujhonyyvDGMBc5x5AD/nl1qOSVVTmHH+iZqhw+FwLz1u6xq6nSnqbyYNzc2v9+PWKSmqp6Nl9Lh0jhy1vLyyMHuBDj4kHqCpOX8Iiw/LDYhYNiYXSP5anAanvd4kHwFhyCCI8K4w3ifGxvJrqho8GxyAX9QXoxQHgVSOmzjJUEbRwuLu6SZwA9gl9SvyAiIgIiICIiAiIgIiICIiAiIgIiICIiAuFiFE2SGx2I96ew/Yuaihelb1mto3iUq2ms7x0ss+hcx1nD09vpX62BahfPom9g9QWVbhMb/lt3x81v/GztzwzhgXzfAtP0LewepfnRN7G+oKE8Jmf1fD7vY1u3Ux01OuuqqdUHoG/Ab6gv5NJH+rZ/C37EjhNo/XHd91jHxOK9MSlFXBZdW6FzpNLQXHqDQST4AblWn3BD+qZ/A37F9IYGtHktDfAAfMruDSWxzz2Xq8frSOam/v2+TC5Qya5swmqG2sQWMO5JG4c/stzA5352tZUBEV5i6vWZNVk5eT3R1RHZHncRERVEREBERAREQEREBERAREQEREGI4k5F++NMx8cginivocb6XNNjpcW7t3AIcL232N10GJ4dmGqw33JL7ljjcNMszXHVIzrvYnmOYDW35bAqrIgzmSMqRYfg/RMJe9x1SSEWMj7W5ea0DYN6u8kk6NEQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREH/2Q=="
                                title="Paella dish"
                                className={classes.image}
                            />
                            <CardContent className={classes.centerElements}>
                                <TextField id="outlined-basic" label="email" type="email" variant="outlined" 
                                    value={email} size="small" display="block" className={classes.mb}
                                    onChange={(e) => setEmail(e.target.value)} />

                                <TextField id="outlined-basic" label="password" type="password" variant="outlined" value={password} size="small"
                                  className={classes.mb} onChange={(e) => setPassword(e.target.value)} display="block"></TextField>    
                            <LinkButton
                                    content="Forget Password?"
                                    route="/signup"
                            ></LinkButton>
                            </CardContent>
                            <CardActions>
                                <Button variant="contained" color="primary" onClick={handleSubmit} disabled={loading} className={classes.fullWidth}>Login</Button>
                            </CardActions>
                        </Card>
                        <Card variant="outlined">
                            <Typography style={{textAlign : "center"}}>
                                Don't have an account?
                                <LinkButton 
                                content="Signup"
                                route="/signup">
                                </LinkButton>
                            </Typography>
                        </Card>
                    </Grid>
                </Grid>

            </Container>
            {/* <h1>Login</h1>
            <input type="email" value={email}
                onChange={(e) => { setEmail(e.target.value) }}></input>
            <input type="password"
                value={password} onChange={(e) => {
                    setPassword(e.target.value)
                }}
            ></input>
            <input type="button" value="submit" onClick={handleSubmit} disabled={loading}></input> */}

        </div>
    )
}

function LinkButton(prop) {
    return (
        <Button variant="text" style={{ color: "blue" }}>
            <Link to={prop.route} >
                {prop.content}
            </Link>
        </Button>
    )
}

export default Login