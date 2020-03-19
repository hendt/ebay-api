const regex = /- `(v\d\.\d\.\d)` is the latest release\./

module.exports.readVersion = function(contents) {
  return contents.match(regex)[1]
}

module.exports.writeVersion = function(contents, version) {
  return contents.replace(regex, "- `v" + version + "` is the latest release.")
}
