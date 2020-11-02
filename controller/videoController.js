import routes from "../routes";
import Video from "../models/Video";

export const home = async (req, res) => {
    try{
        const videos = await Video.find({});
        res.render("home", {pageTitle:"Home", videos});        
    } catch(error) {
        console.log(error);
        res.render("home", {pageTitle:"Home", videos:[]});        
    }
};

export const search = (req, res) => {
    // console.log(req.query.term);
    // const searchingBy = req.query.term;
    const {query:{term : searchingBy}} = req;
    res.render("search", {pageTitle:"Search", searchingBy, videos})
};

export const getUpload = (req, res) => {
    res.render("upload", {pageTitle:"Uplaod"});
}

export const postUpload = (req, res) => {
    // console.log(req.body);
    const {
        body : {
            title, file, description
        }
    } = req;
    // TO DO : Upload and save video
    res.redirect(routes.videoDetail(2323));
}

export const videoDetail = (req, res) => res.render("videoDetail", {pageTitle:"VideoDetail"});
export const editVideo = (req, res) => res.render("editVideo", {pageTitle:"editVideo"});
export const deleteVideo = (req, res) => res.render("deleteVideo", {pageTitle:"deleteVideo"});