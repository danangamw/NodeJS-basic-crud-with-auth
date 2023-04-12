const Link = require('../models/Link');
const createError = require('http-errors');

const showAdd = (req, res) => {
  res.render('links/add');
};

const addLink = async (req, res) => {
  const { title, url, description } = req.body;
  const newLink = {
    user_id: req.user.id,
    title,
    url,
    description,
  };
  await Link.create(newLink);
  req.flash('success', 'Link saved successfully');
  res.redirect('/links');
};

const getAllLinks = async (req, res) => {
  const links = await Link.findAll({
    where: { user_id: req.user.id },
    raw: true,
  });

  res.render('links/list', { links });
};

const deleteLink = async (req, res) => {
  const { id } = req.params;
  await Link.destroy({ where: { id } });
  req.flash('success', 'Link removed!');
  res.redirect('/links');
};

const showEdit = async (req, res) => {
  const { id } = req.params;
  const link = await Link.findOne({ where: { id }, raw: true });
  res.render('links/edit', { link });
};

const editLink = async (req, res, next) => {
  const { id } = req.params;
  const { title, description, url } = req.body;
  const editedLink = {
    title,
    description,
    url,
  };

  try {
    console.log(editedLink);
    const newLink = await Link.update(editedLink, { where: { id } });
    req.flash('success', 'Link updated!');
    res.redirect('/links');
  } catch (err) {
    console.log(err);
    next(createError(500));
  }
};

module.exports = {
  showAdd,
  addLink,
  getAllLinks,
  deleteLink,
  editLink,
  showEdit,
};
