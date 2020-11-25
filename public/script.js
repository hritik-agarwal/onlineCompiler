$(document).ready(function () {
  let code = $(".codemirror-textarea")[0];
  let editor = CodeMirror.fromTextArea(code, {
    lineNumbers: true,
    lineWrapping: true,
    autofocus: true,
    theme: "twilight",
    mode: "text/x-c++src",
    matchBrackets: true,
    closeBrackets: true
  })
})