import passport from "passport";
import routes from "../routes";
import User from "../models/User";

export const getJoin = (req, res) => {
  res.render("join", { pageTitle: "Join" });
};

export const postJoin = async (req, res, next) => {
  // console.log(req.body);
  const {
    body: { name, email, password, password2 },
  } = req;

  if (password !== password2) {
    res.status(400);
    res.render("join", { pageTitle: "Join" });
  } else {
    // TO DO : Register User
    try {
      const user = await User({
        name,
        email,
      });
      await User.register(user, password);
      next();
    } catch (error) {
      // console.log(error);
      res.redirect(routes.home);
    }
  }
};

export const getLogin = (req, res) => {
  res.render("login", { pageTitle: "Login" });
};

export const postLogin = passport.authenticate("local", {
  failureRedirect: routes.login,
  successRedirect: routes.home,
});

export const githubLoginCallback = async (
  accessToken,
  refreshToken,
  profile,
  cb
) => {
  // console.log(accessToken, refreshToken, profile, cb);
  const {
    _json: { id, avatar_url, name, email },
  } = profile;
  try {
    const user = await User.findOne({ email });

    if (user) {
      // 이미 가입한 계정이고, github로 추가 인증한거면 user update해주자.
      // 기존 email과 git email이 동일한 거면 동일 계정이므로 user model에 정의해둔 githubId 정보를 write하자.a1
      user.githubId = id;
      user.save();
      // return cb의미는 첫 번째 인자는 error를 의미하므로, 로그인 성공시 null
      // 두번째 인자는 user
      return cb(null, user);
    } else {
      const newUser = await User.create({
        email,
        name,
        githubId: id,
        avatarUrl: avatar_url,
      });
      return cb(null, newUser);
    }
  } catch (error) {
    return cb(error);
  }
};

export const githubLogin = passport.authenticate("github");

export const postGithubLogin = (req, res) => {
  res.redirect(routes.home);
};

export const facebookLoginCallback = async (
  accessToken,
  refreshToken,
  profile,
  cb
) => {
  // console.log(accessToken, refreshToken, profile, cb);
};

export const facebookLogin = passport.authenticate("facebook");

export const postFacebookLogin = (req, res) => {
  res.redirect(routes.home);
};

export const postNaverLogin = (req, res) => {
  res.redirect(routes.home);
};

export const naverLogin = passport.authenticate("naver");

export const naverLoginCallback = async (
  accessToken,
  refreshToken,
  profile,
  cb
) => {
  // console.log(accessToken, refreshToken, profile, cb);
  const {
    _json: { id, profile_image: avatarUrl, nickname: name, email },
  } = profile;
  try {
    const user = await User.findOne({ email });

    if (user) {
      // 이미 가입한 계정이고, github로 추가 인증한거면 user update해주자.
      // 기존 email과 git email이 동일한 거면 동일 계정이므로 user model에 정의해둔 githubId 정보를 write하자.a1
      user.naverId = id;
      user.save();
      // return cb의미는 첫 번째 인자는 error를 의미하므로, 로그인 성공시 null
      // 두번째 인자는 user
      return cb(null, user);
    } else {
      const newUser = await User.create({
        email,
        name,
        naverId: id,
        avatarUrl,
      });
      return cb(null, newUser);
    }
  } catch (error) {
    return cb(error);
  }
};

export const logout = (req, res) => {
  req.logout();
  res.redirect(routes.home);
};

export const getMe = (req, res) => {
  res.render("userDetail", { pageTitle: "userDetail", user: req.user });
};

export const userDetail = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const user = await User.findById(id).populate("videos");
    console.log(user);
    res.render("userDetail", { pageTitle: "userDetail", user });
  } catch (error) {
    res.redirect(routes.home);
  }
};

export const getEditProfile = (req, res) =>
  res.render("editProfile", { pageTitle: "editProfile" });

export const postEditProfile = async (req, res) => {
  const {
    body: { name, email },
    file,
  } = req;

  try {
    const user = await User.findByIdAndUpdate(req.user.id, {
      name,
      email,
      avatarUrl: file ? file.location : req.user.avatarUrl,
    });
    res.redirect(routes.me);
  } catch (error) {
    res.redirect(routes.editProfile);
  }
};

export const getChangePassword = (req, res) =>
  res.render("changePassword", { pageTitle: "changePassword" });

export const postChangePassword = async (req, res) => {
  const {
    body: { oldPassword, newPassword, newPasswordV },
  } = req;

  try {
    if (newPassword !== newPasswordV) {
      res.status(400);
      res.redirect(`/users${routes.changePassword}`);
      // console.log("not match password");
      return;
    }
    await req.user.changePassword(oldPassword, newPassword);
    res.redirect(routes.me);
  } catch (error) {
    res.redirect(`/users${routes.changePassword}`);
  }
};
