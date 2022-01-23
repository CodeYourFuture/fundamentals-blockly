/* jshint esversion: 6 */

let editor = new BlocklyDomEditor(
  document.getElementById("shareeditor"),
  "share_editor"
);

let data = JSON.parse(
  JSONCrush.uncrush(decodeURIComponent(window.location.href.split("?v=")[1]))
);

editor.init(data.h, data.j);
