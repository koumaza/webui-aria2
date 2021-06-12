
import { app, BrowserWindow } from "electron";
import * as path from "path";
const nativeImage = require("electron").nativeImage;
const image = nativeImage.createFromPath(__dirname + "/favicon.ico");

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    icon: __dirname + "/favicon.ico"
  });
  win.removeMenu();
  win.loadURL(path.join(__dirname, "index.html"));
}
app.on("ready", () => {
  createWindow();

  app.on("activate", function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});