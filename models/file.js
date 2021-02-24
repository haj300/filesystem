let fileModel = function(file, type, name, owner, description, date) {
  this._file = file,
  this._type = type,
  this._name = name,
  this._owner = owner,
  this._description = description,
  this._date = date
};

module.exports = fileModel;
