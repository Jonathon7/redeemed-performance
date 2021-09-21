const signup = (req, res) => {
  req.session.user = [];
  const newUser = { userName: req.body.username, password: req.body.password };
  req.session.user.push(newUser);
};
