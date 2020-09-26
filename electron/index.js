const electron = require("electron");
const { app } = electron;
const { BrowserWindow } = electron;
const nativeImage = require("electron").nativeImage;
var image = nativeImage.createFromPath(__dirname + "/favicon.ico");
let win;

function createWindow() {
  win = new BrowserWindow({ width: 800, height: 600, icon: __dirname + "/favicon.ico" });
  win.removeMenu();
  win.loadURL(`file://${__dirname}/docs/index.html`);
  win.on("closed", () => {
    win = null;
  });
}
app.on("ready", createWindow);
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
app.on("activate", () => {
  if (win === null) {
    createWindow();
  }
});
