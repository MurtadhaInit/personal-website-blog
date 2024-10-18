/**
 * Turn a string into a slug.
 *
 * @param str Text to be turned into a slug.
 * @return A slug
 */
const slugify = (str) => {
  return str
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
};

module.exports = async (params) => {
  const currentFile = Object.assign({}, params.app.workspace.getActiveFile());
  const slug = slugify(currentFile.basename);
  const newName = currentFile.path.replaceAll(currentFile.basename, slug);
  await params.app.fileManager.renameFile(currentFile, newName);
};
