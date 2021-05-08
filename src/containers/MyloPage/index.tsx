/*
 * MyloPage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import { useState, createRef } from 'react';
import { Helmet } from 'react-helmet';

import videojs from 'video.js';

import Video from '../../components/Video/video';
import {
  Button,
  Typography,
  Card,
  IconButton,
  Paper,
  TextareaAutosize,
  Avatar,
} from '@material-ui/core';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import CloseIcon from '@material-ui/icons/Close';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CommentIcon from '@material-ui/icons/Comment';
import MenuIcon from '@material-ui/icons/Menu';

import {
  FacebookShareButton,
  FacebookIcon,
  FacebookMessengerShareButton,
  FacebookMessengerIcon,
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon,

} from 'react-share';

import smsIcon from "../../images/sms_icon.svg";
import instagramIcon from "../../images/instagram_icon.png";
import shareIcon from "../../images/share.svg";
import VolumeOffIcon from '@material-ui/icons/VolumeOff';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import "./index.css";


const theme = createMuiTheme({
  typography: {
    fontFamily: [
      'Times New Roman',
    ].join(','),
  },
});


export function MyloPage() {

  const { innerWidth: width, innerHeight: height } = window;
  const [video_ind, set_video_ind] = useState(0);
  const [swipe_up, set_swipe_up] = useState(true);
  const [show_menu, set_show_menu] = useState(false);
  const [showSharing, setShowSharing] = useState(false); // for now DEMO 
  const [showComment, setShowComment] = useState(false);
  const [isCopiedLink, setIsCopiedLink] = useState(false);
  const [muted, setMuted] = useState(false);

  const logo = "https://bestcomma-videos.s3-us-west-1.amazonaws.com/Mylo_April/mylo-logo.svg";

  let video_srcs = ["https://bestcomma-videos.s3-us-west-1.amazonaws.com/Mylo_April/Intro_video.mp4",
  ];

  let childRefs = video_srcs.map(() => createRef()); //create a childref for each video

  let product_link = "https://mylo.sk/";

  // let refs = video_srcs.map((src, i) => (useRef(null)));

  const handleMute = () => {
    videojs(childRefs[video_ind].current).muted(!muted);
    setMuted(!muted);
  };

  return (
    <ThemeProvider theme={theme}>
      <article>
        <Helmet>
          <title>Mylo Page</title>
          <meta
            name="description"
            content="BestComma Video Page"
          />
        </Helmet>

        <div style={{ overflow: "hidden", position: "relative", height: height, zIndex: 0 }}>
          <Video className={"background-video" + video_ind} forwardRef={childRefs[video_ind]} fluid={true} key={video_ind} src={video_srcs[video_ind]}
            width={width} height={height} muted={muted} />

          <Button key="mute_button"
            style={{
              position: "absolute", top: "0%", right: "0%", padding: "5px", margin: "0px", color: "white", zIndex: 200,
              textTransform: "none", transform: "translate(10%, 10%)",
            }}
            onClick={handleMute}
          >
            {muted ? <VolumeOffIcon /> : <VolumeUpIcon />}
          </Button>


          <img src={logo} alt="logo" width="120px" height="auto" style={{ position: "absolute", top: "1%", left: "1%", zIndex: 201 }} />

          <div style={{
            display: 'flex',
            position: "absolute",
            alignSelf: "center",
            bottom: "0%", left: "50%", transform: "translate(-50%, -10%)",
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-around',
          }}>
            <Button className="button-animation" variant="contained" key="discount-button"
              style={{
                backgroundColor: "rgba(170, 223, 205, 0.9)", alignSelf: "center",
                color: "white", padding: "15px 30px", marginBottom: 10,
                bottom: "0%", left: "50%", transform: "translate(-50%, -0%)", borderRadius: 40, width: "250px"
              }}
              onClick={() => {
                gtag('event', 'click_discount');
              }}
              href={product_link}
            >
              <Typography style={{ fontSize: 18, textTransform: "none" }} display="inline">Claim Your Discount</Typography>
            </Button>

            <Button className="button-animation" variant="contained" key="start-feedback-button"
              style={{
                backgroundColor: "rgba(170, 223, 205, 0.8)", alignSelf: "center",
                color: "white", padding: "15px 30px", marginBottom: 10,
                bottom: "0%", left: "50%", transform: "translate(-50%, -0%)", borderRadius: 40, width: "250px"
              }}
              onClick={() => {
                gtag('event', 'click_start_feedback');
                setShowComment(true);
              }}
            >
              <Typography style={{ fontSize: 18, textTransform: "none" }} display="inline">Share you feedback</Typography>
            </Button>
          </div>


          {showComment &&
            <Paper className="sharing-panel" style={{
              width: width, height: "70%", backgroundColor: "rgba(220,220, 220, 0.8)",
              position: "absolute", bottom: "0%", zIndex: 203,
            }}>
              <div style={{
                display: 'flex',
                height: "100%",
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'space-around',
              }}>
                <Typography style={{ padding: "30px", margin: "10px", fontFamily: "Arial", fontSize: "20px" }}>
                  Share you feedback with us
              </Typography>

                <TextareaAutosize aria-label="empty textarea" placeholder="Type here ... " rowsMin={6}
                  style={{ width: "100%", borderColor: "white", height: "200px", fontSize: "20px" }} />

                <div style={{ width: "80%" }} >
                  <Button style={{ textAlign: "center", width: "100%", padding: "10px", backgroundColor: "#AADFCD", margin: "5px", borderRadius: 40 }} onClick={() => { setShowComment(false); }}>
                    <Typography style={{ color: "white", fontWeight: "bold", padding: "5px", fontFamily: "Arial", textAlign: "center", textTransform: "none", fontSize: "15px" }}>
                      Submit
                    </Typography>
                  </Button>
                  <Button style={{ textAlign: "center", width: "100%", padding: "10px", backgroundColor: "#EEEEEE", margin: "5px", borderRadius: 40 }} onClick={() => { setShowComment(false); }}>
                    <Typography style={{ fontFamily: "Arial", padding: "5px", textTransform: "none", fontSize: "15px" }}>
                      Cancel
                  </Typography>
                  </Button>
                </div>
              </div>
            </Paper>
          }
        </div>

      </article >
    </ThemeProvider >

  );
}


export default MyloPage;
