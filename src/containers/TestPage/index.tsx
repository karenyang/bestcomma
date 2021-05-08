/*
 * TestPage
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
} from '@material-ui/core';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import CloseIcon from '@material-ui/icons/Close';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';


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


export function TestPage() {

  const { innerWidth: width, innerHeight: height } = window;
  const [video_ind, set_video_ind] = useState(0);
  const [swipe_up, set_swipe_up] = useState(true);
  const [show_menu, set_show_menu] = useState(false);
  const [muted, setMuted] = useState(false);

  // const logo = "https://bestcomma-videos.s3-us-west-1.amazonaws.com/FOB_demo/function-of-beauty-logo.png";
  let video_srcs = [
    "https://bestcomma-videos.s3-us-west-1.amazonaws.com/Test_demos/IMG_3727.mp4",
    "https://bestcomma-videos.s3-us-west-1.amazonaws.com/Test_demos/Kona+Coffee+Purveyors+(1).mp4",
    "https://bestcomma-videos.s3-us-west-1.amazonaws.com/Test_demos/169635456_117371457052564_5133095087791045396_n.mp4",
  ];

  let childRefs = video_srcs.map(() => createRef()); //create a childref for each video

  let product_links = [
    "https://www.bestcomma.co/",
    "https://www.bestcomma.co/",
  ];

  let product_img_srcs = [
    "https://bestcomma-videos.s3-us-west-1.amazonaws.com/Test_demos/coffee_beans.jpeg",
    "https://bestcomma-videos.s3-us-west-1.amazonaws.com/Test_demos/nuts.jpeg",
  ];

  let product_names = ["Kona Coffee", "Macadamia Nuts"];


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
          <title>Test Page</title>
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

        {/* <img src={logo} alt="logo" width="120px" height="auto" style={{ position: "absolute", top: "1%", left: "3%", zIndex: 201 }} /> */}

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
                {<Video className={"background-video" + video_ind} forwardRef={childRefs[video_ind]} fluid={true} key={video_ind} src={video_srcs[video_ind] } 
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
              // startIcon={<ShoppingCartIcon />}
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
              <Typography style={{ fontSize: 15 }}>About us</Typography>
            </Button>
          }

        </div>
      </article >
    </ThemeProvider >

  );
}


export default TestPage;
