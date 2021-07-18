import React, { useEffect, useState, useContext } from 'react'
import { AuthContext } from "../contexts/AuthContext";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton'
import { storage, firestore, database } from "../firebase";
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import {v4 as uuidv4} from "uuid";
import Avatar from '@material-ui/core/Avatar';

export default function Feed() {
    const useStyles = makeStyles((theme) => ({
        root: {
            '& > *': {
                margin: theme.spacing(1),
            },
        },
        input: {
            display: 'none',
        },
    }));
    const classes = useStyles();
    const [loading, setLoading] = useState(false);
    const [user,setUser] = useState();
    const [error, setError] = useState(false);
    const [videos, setVideos] = useState([]);
    const { signout, currentUser } = useContext(AuthContext)

    const handleLogout = async () => {
        try {
            setLoading(true);
            // auth provider 
            await signout();
            setLoading(false);
        } catch (err) {
            console.log(err);
            setLoading(false)
        }
    }
    const handleInputFile = (e) => {
        e.preventDefault();
        let file = e?.target?.files[0];
        if (file != null) {
            console.log(e.target.files[0])
            // setReel(e.target.files[0]); 
            try {
                setLoading(true)
                // const uploadTaskListener = storage
                //     .ref(`/posts`).put(file);
                // fn1 -> progress
                // fn2 -> error 
                // fn3-> success
                // let purl// put video in post storage
                let puid = uuidv4();
                const uploadTaskListener = storage
                    .ref(`/posts/${puid}`).put(file);
                uploadTaskListener.on('state_changed', fn1, fn2, fn3);
                setLoading(false);
                function fn1(snapshot) {
                    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log(progress);
                }
                function fn2(error) {
                    setError(error);
                    setLoading(false);
                }
                async function fn3() {
                    uploadTaskListener.snapshot.ref.getDownloadURL().then(async url => {
                        let posobj = {
                            likes: [],
                            comment: [],
                            url,
                            auid : currentUser.uid,
                            createdAt : database.getUserTimeStamp(),
                        }

                        let obj = await database.posts.add(posobj);

                        await database.users.doc(currentUser.uid).update({
                            postIds : [...database.users.postIds,obj.id]
                        })

                        console.log(obj);
                        setLoading(false);
                    })
                    
                }



            } catch (err) {

            }
        }
    }

    useEffect (async ()=> {
        console.log(currentUser.uid);
        let sObject = await database.users.doc(currentUser.uid).get();
        setUser(sObject.uid);
        setLoading(false);
        console.log(sObject);
    },[]);

    useEffect(async () => {
        let unsub = await database.posts.orderBy("createdAt", "desc")
        .onSnapshot(async snapshot => {
            console.log(snapshot);
            let videos = snapshot.docs.map(doc => doc.data());
           
            let videosArr = [];
            for (let i = 0; i < videos.length; i++) {
                let videoUrl = videos[i].url;
                let auid = videos[i].auid;
                let userObject = await database.users.doc(auid).get();
                let userProfileUrl = userObject.data().profileUrl;
                let userName = userObject.data().username;
                videosArr.push({ videoUrl, userProfileUrl, userName });
            }
            setVideos(videosArr);


        })
        return unsub;
    }, [])

    return (
        <div>
            <div className="navbar">
            <Avatar alt="Travis Howard" src={user} />
                <button onClick={handleLogout} disabled={loading}>Logout</button>
            </div>
            <div className="uploadImage">
                <div className={classes.root}>
                    <input accept="file/*" className={classes.input} id="icon-button-file" type="file"
                        onChange={handleInputFile}
                    />
                    <label htmlFor="icon-button-file">
                        <Button variant="contained" color="primary" component="span" disabled={loading} endIcon={<PhotoCamera />}>
                            Upload
                        </Button>
                    </label>
                </div>
            </div>
            <div className="feed">
                    {videos.map((videoObj, idx) => {
                        console.log(videoObj);
                        return <div className="video-container">
                            <Video
                                src={videoObj.videoUrl}
                                id={idx}
                                userName={videoObj.userName}
                            >

                            </Video>
                        </div>
                    })}
                </div>
        </div>
    )
}

function Video(props) {
    console.log(props.userName);
    return (
        <>
            <video controls muted="true" id={props.id} >
                <source src={
                    props.src
                } type="video/mp4"

                >
                </source>
            </video >
            { props.userName}
        </>
    )
}
