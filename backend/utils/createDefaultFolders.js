const Folder = require("../models/folder")

async function createDefaultFolders(userId) {
  const defaultFolders = [
    { name: "YouTube", isDefault: true },
    { name: "Instagram", isDefault: true },
    { name: "X", isDefault: true },
] // userId doesn't exist yet — it's created during signup

const folderPromises = defaultFolders.map((folder)=>{
    Folder.create({...folder, user: userId})
})
await Promise.all(folderPromises) // this line waits for all folder creations to complete in parallel.
}

module.exports = createDefaultFolders