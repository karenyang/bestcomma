/*
 * FobPage
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


export function FobPage() {

  const { innerWidth: width, innerHeight: height } = window;
  const [video_ind, set_video_ind] = useState(0);
  const [swipe_up, set_swipe_up] = useState(true);
  const [show_menu, set_show_menu] = useState(false);
  const [showSharing, setShowSharing] = useState(false); // for now DEMO 
  const [showComment, setShowComment] = useState(false);
  const [isCopiedLink, setIsCopiedLink] = useState(false);
  const [muted, setMuted] = useState(false);

  const logo = "https://bestcomma-videos.s3-us-west-1.amazonaws.com/FOB_demo/function-of-beauty-logo.png";
  let video_srcs = [
    "https://bestcomma-videos.s3-us-west-1.amazonaws.com/FOB_demo/Unboxing+Function+of+Beauty.mp4",
    "https://bestcomma-videos.s3-us-west-1.amazonaws.com/FOB_demo/Function+of+Beauty+-+Customizable+Haircare.mp4",
    "https://bestcomma-videos.s3-us-west-1.amazonaws.com/FOB_demo/A+curly+girl%E2%80%99s+how-to%2C+but+make+it+custom.mp4",
    "https://bestcomma-videos.s3-us-west-1.amazonaws.com/FOB_demo/Straight+Hair+Tutorial%E2%80%94Leave-in+Treatment.mp4",
    "https://bestcomma-videos.s3-us-west-1.amazonaws.com/FOB_demo/skin_care.mp4",
  ];

  let childRefs = video_srcs.map(() => createRef()); //create a childref for each video

  let product_links = [
    "https://www.functionofbeauty.com/",
    "https://www.functionofbeauty.com/",
    "https://www.functionofbeauty.com/",
    "https://www.functionofbeauty.com/skin-serum-quiz/",
  ];

  let product_img_srcs = [
    "https://bestcomma-videos.s3-us-west-1.amazonaws.com/FOB_demo/bottle1.jpeg",
    "https://bestcomma-videos.s3-us-west-1.amazonaws.com/FOB_demo/bottle2.jpeg",
    "https://bestcomma-videos.s3-us-west-1.amazonaws.com/FOB_demo/bottle3.jpeg",
    "https://bestcomma-videos.s3-us-west-1.amazonaws.com/FOB_demo/skincare.jpeg",
  ];

  let product_names = ["How We Customize", "How to Start", "Our Story", "What's New"];


  // let refs = video_srcs.map((src, i) => (useRef(null)));

  let menu_items = [];
  for (let i = 0; i < product_img_srcs.length; i++) {
    menu_items.push(
      <Card key={i} style={{
        textAlign: "center",
        padding: "0px",
        backgroundImage: `url(${product_img_srcs[i]})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        width: "140px",
        height: "140px",
        display: "flex",
        justifyContent: "center", /* align horizontal */
        alignItems: "center", /* align vertical */
        margin: "15px"
      }
      }
        onClick={() => {
          set_show_menu(false);
          set_video_ind(i + 1);
        }}>
        <div style={{ position: "absolute", width: "inherit", height: "inherit", zIndex: 204, backgroundColor: "rgba(255,255,255,0.6" }}></div>
        < Typography style={{ fontSize: "18px", padding: "5px", color: "black", zIndex: 205, }}>
          {product_names[i]}
        </Typography >
      </Card >
    )
  }

  const handleMute = () => {
    videojs(childRefs[video_ind].current).muted(!muted);
    setMuted(!muted);
  };

  return (
    <ThemeProvider theme={theme}>
      <article>
        <Helmet>
          <title>Function Of Beauty Page</title>
          <meta
            name="description"
            content="BestComma Video Page"
          />
        </Helmet>

        <Button key="mute_button" 
          style={{
            position: "absolute", top: "0%", right: "0%", padding: "5px", margin: "0px", color: "white", zIndex: 200,
            textTransform: "none", transform: "translate(10%, 10%)",
          }}
          onClick={handleMute}
        >
          {muted ? <VolumeOffIcon /> : <VolumeUpIcon />}
        </Button>

        <img src={logo} alt="logo" width="120px" height="auto" style={{ position: "absolute", top: "1%", left: "3%", zIndex: 201 }} />

        {video_ind > 0 &&
          <IconButton className="button-animation" key="prev"
            style={{
              position: "absolute", top: "6%", right: "2%", padding: "10px 10px", zIndex: 205,
              textTransform: "none", backgroundColor: "rgba(170, 223, 205, 0.8)",
            }}
            onClick={() => {
              set_show_menu(!show_menu);
              gtag('event', 'click_upper_right_menu', { "video_ind": video_ind, "product_name": product_names[video_ind] });
            }}
          >
            {<MenuIcon style={{ fontSize: "20", margin: 0, color: "white" }} />}
          </IconButton>
        }

        {video_ind === 0 &&
          <div style={{
            position: "absolute", top: "10%", left: "6%", zIndex: 202, maxWidth: "200px",
          }}>
            <Typography style={{
              color: "#AADFCD", fontWeight: "bold",
              fontSize: 28, textAlign: 'start',
            }}>
              Hey Alex!
            </Typography>
            <Typography style={{
              color: "white",
              fontSize: 20, textAlign: 'start'
            }}>
              Here you can learn all about your newest purchase 🌟
            </Typography>
          </div>
        }

        {video_ind > 0 &&
          <Typography key="current-product-name" style={{
            position: "absolute", color: "black",
            top: "7%", left: "50%", transform: "translate(-50%, -10%)",
            fontSize: 20, textAlign: 'center', zIndex: 202,
          }}>
            {product_names[(video_ind - 1) % video_srcs.length]}
          </Typography>
        }

        {/* {
          show_menu &&
          <IconButton className="button-animation" key="closemenu" style={{
            position: "absolute", color: "white",
            top: "10%", right: "2%", zIndex: 203,
          }}
            onClick={() => {
              set_show_menu(false);
              gtag('event', 'close_menu');
            }}>
            <CloseIcon />
          </IconButton>

        } */}
        {
          show_menu &&
          <Paper className="menu-bg" style={{
            width: width, height: height, backgroundColor: "rgba(250,250,250,0.8)",
            position: "absolute", top: "0%", zIndex: 203,
          }}>
            <Typography style={{ marginTop: "25%", marginBottom: "10%", fontSize: "20px", fontFamily: "Arial" }}>
              Select to Watch
            </Typography>

            <IconButton className="button-animation" key="closemenu" style={{
              position: "absolute", color: "black",
              top: "13%", right: "2%", zIndex: 203,
            }}
              onClick={() => {
                set_show_menu(false);
                gtag('event', 'close_menu');
              }}>
              <CloseIcon />
            </IconButton>
            <div style={{ height: "60%", display: "flex", flexWrap: "wrap", justifyContent: "space-around", justifyItems: "space-around" }}>
              {menu_items}
            </div>
          </Paper>
        }

        <div className="video-block" style={{ overflow: "hidden", position: "relative", height: height }}>
          <TransitionGroup >
            <CSSTransition
              key={video_ind}
              addEndListener={(node, done) => {
                node.addEventListener("transitionend", done, false);
              }}
              classNames={swipe_up ? "video-down" : "video-up"}
            >
              <div>
                {<Video className={"background-video" + video_ind} forwardRef={childRefs[video_ind]} fluid={false} key={video_ind} src={video_srcs[video_ind] } 
                width={width} height={height} muted={muted}/> }
              </div>
            </CSSTransition>
          </TransitionGroup>

          {video_ind === 0 && !show_menu &&
            <Button className="button-animation" variant="contained" key="see-my-product"
              style={{
                position: "absolute", backgroundColor: "#AADFCD", alignSelf: "center",
                color: "white", padding: "15px 30px", marginBottom: 10,
                bottom: "0%", left: "50%", transform: "translate(-50%, -30%)", borderRadius: 40, width: "250px"
              }}
              onClick={() => {
                set_show_menu(!show_menu);
                gtag('event', 'click_menu_home_page');

              }}>
              <Typography style={{ fontSize: 17, fontWeight: "bold" }} display="inline">Discover More</Typography>
            </Button>
          }

          {video_ind > 0 &&
            <IconButton className="button-animation" key="next" style={{
              position: "absolute", color: "white", backgroundColor: "rgba(170, 223, 205, 0.8)",
              bottom: "0%", left: "50%", transform: "translate(-50%, -20%)",
            }}
              onClick={() => {
                set_swipe_up(true);
                set_video_ind((video_ind + 1) % video_srcs.length);
                gtag('event', 'click_next_video', { "current_video_ind": video_ind, "current_product_name": product_names[video_ind + 1] });
              }}>
              <KeyboardArrowDownIcon style={{ fontSize: "20" }} />
            </IconButton>
          }

          {/* {video_ind > 0 &&
            <Typography key="next-product-name" style={{
              position: "absolute", color: "white",
              bottom: "10%", left: "50%", transform: "translate(-50%, 0%)",
              fontSize: 12, textAlign: 'center',
            }}>
              {product_names[(video_ind) % video_srcs.length]}
            </Typography>
          } */}


          {
            video_ind > 0 &&
            <Button className="button-animation" variant="outlined" color="secondary" key="more"
              startIcon={<ShoppingCartIcon />}
              style={{
                position: "absolute", padding: "10px 10px", textTransform: "none",
                backgroundColor: "rgba(170, 223, 205, 0.8)", alignSelf: "center",
                color: "white", borderColor: "White",
                bottom: "2%", right: "1%",
              }}
              onClick={() => {
                gtag('event', 'click_learn_more', { "current_video_ind": video_ind, "current_product_name": product_names[video_ind + 1], "href": product_links[video_ind - 1] })
              }}
              href={product_links[video_ind - 1]}>
              <Typography style={{ fontSize: 15 }}>Shop</Typography>
            </Button>
          }

          {
            video_ind > 0 &&
            <IconButton
              style={{
                position: "absolute", bottom: "22%", right: "1%", padding: "10px 10px", color: "white", zIndex: 200,
                textTransform: "none",
              }}
              onClick={() => { setShowSharing(true); setShowComment(false) }}
            >
              <Avatar src={shareIcon} style={{ width: "35px", height: "auto", padding: 0, margin: 0 }} />
            </IconButton>
          }

          {showSharing &&
            <Paper className="sharing-panel" style={{
              width: width, backgroundColor: "rgb(250,250,250)",
              position: "absolute", bottom: "0%", zIndex: 203,
            }}>
              <div style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                padding: "10px",
              }}>
                <Typography style={{ fontFamily: "Arial", textTransform: "none", fontSize: "14px" }}>
                  Share to
            </Typography>
              </div>

              <div style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-around',
                padding: "20px",
                backgroundColor: "rgb(250,250,250)",
              }}>

                <IconButton
                  href="sms:?&body=Check this out! https://app.bestcomma.co/coffeevine"
                  style={{ padding: 0, margin: 0 }}
                >
                  <Avatar src={instagramIcon} style={{ width: "31px", height: "auto", padding: 0, margin: 0 }} />
                </IconButton>


                <FacebookMessengerShareButton
                  url={"https://app.bestcomma.co/coffeevine"}
                  appId="TODO"
                  className="share-button"
                >
                  <FacebookMessengerIcon size={32} round />
                </FacebookMessengerShareButton>

                <WhatsappShareButton
                  url={"https://app.bestcomma.co/coffeevine"}
                  title={"Coffevine x Bestcomma"}
                  className="share-button"
                >
                  <WhatsappIcon size={32} round />
                </WhatsappShareButton>

                <FacebookShareButton
                  url={"https://app.bestcomma.co/coffeevine"}
                  quote={"Coffevine x Bestcomma"}
                  className="share-button"
                  onClick={() => { console.log("Clicked share FacebookShareButton with url ", window.location.href) }}
                >
                  <FacebookIcon size={32} round />
                </FacebookShareButton>

                <TwitterShareButton
                  url={"https://app.bestcomma.co/coffeevine"}
                  title={"Coffevine x Bestcomma"}
                  className="share-button"
                >
                  <TwitterIcon size={32} round />
                </TwitterShareButton>

                <IconButton
                  href="sms:?&body=Check this out! https://app.bestcomma.co/coffeevine"
                  style={{ padding: 0, margin: 0 }}
                >
                  <Avatar src={smsIcon} style={{ width: "31px", height: "auto", padding: 0, margin: 0 }} />
                </IconButton>



              </div>


              <div style={{
                display: 'flex',
                flexDirection: "column",
                alignItems: 'center',
                justifyContent: 'space-around',
              }}>
                <Button onClick={() => { navigator.clipboard.writeText('Copy this text to clipboard'); setIsCopiedLink(true); }}
                  style={{ width: "100%", padding: "10px", backgroundColor: "white" }}>
                  {isCopiedLink ?
                    <Typography style={{ fontFamily: "Arial", textTransform: "none", fontSize: "15px", color: "white" }}>
                      Copied!
                </Typography>
                    :
                    <Typography style={{ fontFamily: "Arial", textTransform: "none", fontSize: "15px" }}>
                      Copy link
                </Typography>
                  }
                </Button>

                <Button onClick={() => { setShowSharing(false); setIsCopiedLink(false); }}
                  style={{ width: "100%", padding: "10px", backgroundColor: "rgb(240,240,240)", }}>
                  <Typography style={{ fontFamily: "Arial", textTransform: "none", fontSize: "15px" }}>
                    Cancel
              </Typography>
                </Button>
              </div>

            </Paper>

          }


          {video_ind > 0 &&

            <Button key="comment_button" className="button-animation"
              style={{
                position: "absolute", bottom: "30%", right: "0%", padding: "10px 10px", color: "white", zIndex: 200,
                textTransform: "none"
              }}
              onClick={() => { setShowComment(true); setShowSharing(false); setIsCopiedLink(false); }}
            >
              <CommentIcon style={{ fontSize: 32 }} />
            </Button>
          }
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

                <div style={{width: "80%"}} >
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


export default FobPage;
