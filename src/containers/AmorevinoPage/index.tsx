/*
 * AmorevinoPage
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
  ListItemText,
  ListItem,
  IconButton,
  List,
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
import logo from "../../images/amorevino-logo-text-primary.svg";

const theme = createMuiTheme({
  typography: {
    fontFamily: [
      'Times New Roman',
    ].join(','),
  },
});


export function AmorevinoPage() {

  const { innerWidth: width, innerHeight: height } = window;
  const [video_ind, set_video_ind] = useState(0);
  const [swipe_up, set_swipe_up] = useState(true);
  const [show_menu, set_show_menu] = useState(false);
  const [muted, setMuted] = useState(false);

  let video_srcs = [
    "https://bestcomma-videos.s3-us-west-1.amazonaws.com/amorevino_may/Intro.mp4",
    "https://bestcomma-videos.s3-us-west-1.amazonaws.com/amorevino_may/Vinyes+Dels+Aspres+Oriol+dels+Aspres+Blanc+2020+(1).mp4",
    "https://bestcomma-videos.s3-us-west-1.amazonaws.com/amorevino_may/Sabate%CC%81+i+Coca+Castellroig+So+Blanc+2019+(1).mp4",
    "https://bestcomma-videos.s3-us-west-1.amazonaws.com/amorevino_may/Miros+Ribera+2019.mp4",
    "https://bestcomma-videos.s3-us-west-1.amazonaws.com/amorevino_may/Vinyes+Dels+Aspres+Oriol+dels+Aspres+Negre+2020+(1).mp4",
    "https://bestcomma-videos.s3-us-west-1.amazonaws.com/amorevino_may/Cal+Bess%C3%B3+Lo+Cirerer+2017.mp4",
    "https://bestcomma-videos.s3-us-west-1.amazonaws.com/amorevino_may/Bodegas+Pen%CC%83afiel+Miros+de+Ribera+Roble+2018.mp4",
  ];


  let childRefs = video_srcs.map(() => createRef()); //create a childref for each video

  let product_links = [
    "https://www.amorevino.com/products/vinyes-dels-aspres-oriol-dels-aspres-blanc-2020",
    "https://www.amorevino.com/products/sabate-i-coca-castellroig-so-blanc-2019",
    "https://www.amorevino.com/products/bodegas-penafiel-miros-de-ribera-alba-de-miros-2019",
    "https://www.amorevino.com/products/vinyes-dels-aspres-oriol-dels-aspres-negre-2020",
    "https://www.amorevino.com/products/cal-besso-lo-cirerer-2017",
    "https://www.amorevino.com/products/bodegas-penafiel-miros-de-ribera-roble-2018",
  ];
  

  let product_img_srcs = [
    "https://bestcomma-videos.s3-us-west-1.amazonaws.com/amorevino_may/vinyes-dels-aspres-oriol-dels-aspres-blanc-2020_760x.png",
    "https://bestcomma-videos.s3-us-west-1.amazonaws.com/amorevino_may/sabate-i-coca-castellroig-so-blanc-2019_760x.png",
    "https://bestcomma-videos.s3-us-west-1.amazonaws.com/amorevino_may/bodegas-penafiel-miros-de-ribera-alba-de-miros-2019_760x.png",
    "https://bestcomma-videos.s3-us-west-1.amazonaws.com/amorevino_may/vinyes-dels-aspres-oriol-dels-aspres-negre-2020_760x.png",
    "https://bestcomma-videos.s3-us-west-1.amazonaws.com/amorevino_may/cal-besso-lo-cirerer-2017_760x.png",
    "https://bestcomma-videos.s3-us-west-1.amazonaws.com/amorevino_may/bodegas-penafiel-miros-de-ribera-roble-2018_760x.png",
  ];

  let product_names = ["Vinyes Dels Aspres Oriol dels Aspres Blanc", "Sabaté i Coca Castellroig So Blanc", "Bodegas Peñafiel Miros de Ribera Alba de Miros", "Vinyes Dels Aspres Oriol dels Aspres Negre", "Cal Bessó Lo Cirerer", "Bodegas Peñafiel Miros de Ribera Roble"];
  let product_descriptions = ["2020", "2019", "2019", "2020", "2017", "2018"];


  let menu_items = [];
  for (let i = 0; i < product_img_srcs.length; i++) {
    menu_items.push(
      <ListItem key={i} alignItems="flex-start" style={{ backgroundColor: "rgba(200, 200, 200, 0.8)", padding: "10px" }}
        onClick={() => {
          set_show_menu(false);
          set_video_ind(i + 1);
        }}>
        <img alt={"wine" + i} src={product_img_srcs[i]} width="100px" height="auto" style={{ marginRight: "20px" }} />
        <ListItemText primary={
          <Typography
            style={{ fontSize: 12 }}
          >
            {product_names[i]}
          </Typography>}
          secondary={product_descriptions[i]} />
      </ListItem>
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
          <title>Amoreivno May Page</title>
          <meta
            name="description"
            content="Amoreivno May Page"
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
              textTransform: "none", backgroundColor: "rgba(220, 220, 220, 0.8)",
            }}
            onClick={() => {
              set_show_menu(!show_menu);
              gtag('event', 'click_upper_right_menu', { "video_ind": video_ind, "product_name": product_names[video_ind] });
            }}
          >
            {<MenuIcon style={{ fontSize: "20", margin: 0, color: "black" }} />}
          </IconButton>
        }

        {
          show_menu &&
          <IconButton className="button-animation" key="closemenu" style={{
            position: "absolute", color: "white",
            top: "10%", right: "2%", zIndex: 201,
          }}
            onClick={() => {
              set_show_menu(false);
              gtag('event', 'close_menu');

            }}>
            <CloseIcon />
          </IconButton>

        }
        {
          show_menu &&
          <List className="wine-menu" style={{ position: "absolute", zIndex: 201, top: "15%", width: width }}>
            {menu_items}
          </List >
        }

        {video_ind > 0 &&
          <Typography key="current-product-name" style={{
            position: "absolute", color: "white",
            top: "5%", left: "50%", transform: "translate(-50%, -10%)",
            fontSize: 12, textAlign: 'center', zIndex: 202,
          }}>
            {product_names[(video_ind - 1) % video_srcs.length]}
          </Typography>
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
                {<Video className={"background-video" + video_ind} forwardRef={childRefs[video_ind]} fluid={true} key={video_ind} src={video_srcs[video_ind]}
                  width={width} height={height} muted={muted} />}
              </div>
            </CSSTransition>
          </TransitionGroup>

          {video_ind === 0 && !show_menu &&
            <Button className="button-animation" variant="contained" key="see-my-wine" style={{
              position: "absolute", backgroundColor: "rgba(240 , 100, 100, 0.8)", alignSelf: "center",
              color: "white", padding: "10px 10px", textTransform: "none",
              bottom: "0%", left: "50%", transform: "translate(-50%, -30%)"
            }}
              onClick={() => {
                set_show_menu(!show_menu);
                gtag('event', 'click_menu_home_page');

              }}>
              <Typography style={{ fontSize: 14 }} display="inline">Erfahre mehr über Deinen Wein</Typography>
            </Button>
          }

          {video_ind > 0 &&
            <IconButton className="button-animation" key="next" style={{
              position: "absolute", color: "white", backgroundColor: "rgba(220, 220, 220, 0.8)",
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
          {
            video_ind > 0 &&
            <Typography key="next-product-name" style={{
              position: "absolute", color: "white",
              bottom: "10%", left: "50%", transform: "translate(-50%, 0%)",
              fontSize: 12, textAlign: 'center',
            }}>
              {product_names[video_ind % video_srcs.length]}
            </Typography>
          }
          {
            video_ind > 0 &&
            <Button className="button-animation" variant="outlined" color="secondary" key="more"
              startIcon={<ShoppingCartIcon />}
              style={{
                position: "absolute", padding: "10px 10px", textTransform: "none",
                backgroundColor: "rgba(220, 220, 220, 0.8)", alignSelf: "center",
                color: "white", borderColor: "White",
                bottom: "2%", right: "1%",
              }}
              onClick={() => {
                gtag('event', 'click_learn_more', { "current_video_ind": video_ind, "href": product_links[video_ind - 1] })
              }}
              href={product_links[video_ind - 1]}>
              <Typography style={{ fontSize: 15 }}>Mehr Infos</Typography>
            </Button>
          }

        </div>
      </article >
    </ThemeProvider >

  );
}


export default AmorevinoPage;
