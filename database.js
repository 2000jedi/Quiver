/**
 * Created by 2000jedi on 2017/4/30.
 */

const fs = require("fs");
const md = require("markdown").markdown;
const dialog = require("electron").remote.dialog;
const libPath = "/Users/jedi/node/Quiver.qvlibrary";

module.exports = {
    libPath: libPath,

    getNotebooks: function () {
        const lib = libPath;
        fs.readdir(lib, function (err, files) {
            if (err) {
                dialog.showErrorBox("File Not Found", "Cannot Find Quiver Library!");
                return
            }
            files.forEach(function (file) {
                if (file.toString() !== "Trash.qvnotebook") {
                    let elem = document.createElement("div");
                    elem.innerHTML = file.toString().split('.')[0];
                    elem.setAttribute("onclick","db.getNotes('" + elem.innerHTML + "');");
                    elem.setAttribute("id",elem.innerHTML);
                    document.getElementById("menu").appendChild(elem);
                }
            });
            let add = document.createElement("div");
            add.innerHTML = " + Add Notebook";
            add.setAttribute("onclick", "db.addNoteBook();");
            document.getElementById("menu").appendChild(add);
        });
    },

    getNotes: function (notebook_name) {
        const lib = libPath + "/" + notebook_name + ".qvnotebook";
        fs.readdir(lib, function (err, files) {
            if (err) {
                dialog.showErrorBox("Internal Error", "Contact Developer");
                return
            }
            document.getElementById("submenu").innerHTML = "";
            files.forEach(function (file) {
                if (file.toString() !== "meta.json") {
                    let elem = document.createElement("div");
                    let file_description = JSON.parse(fs.readFileSync(lib+"/"+file.toString()+"/meta.json", "utf8"));
                    elem.innerHTML = file_description.title;
                    elem.setAttribute("onclick", "db.getNote('" + notebook_name + "', '" + file.toString() + "');");
                    elem.setAttribute("id",file.toString());
                    document.getElementById("submenu").appendChild(elem);
                }
            });
            let add = document.createElement("div");
            add.innerHTML = " + Add Note";
            add.setAttribute("onclick", "db.addNote();");
            document.getElementById("submenu").appendChild(add);
        });
    },

    getNote: function (notebook_name, note_dir) {
        cur_notebook = notebook_name;
        cur_note = note_dir;
        const lib = libPath + '/' + notebook_name + '.qvnotebook/' + note_dir + '/';
        let meta = JSON.parse(fs.readFileSync(lib + 'meta.json', 'utf8'));
        let content = JSON.parse(fs.readFileSync(lib + 'content.json', 'utf8'));
        document.getElementById("content").innerHTML = "";
        content.cells.forEach(function(cell){
            let elem = document.createElement("div");
            if (cell.type === "markdown"){
                elem.innerHTML = md.toHTML(content.cells[0].data);
            } else {
                elem.innerHTML = content.cells[0].data;
            }
            document.getElementById("content").appendChild(elem);
        });

    },

    addNoteBook: function (){
        document.getElementById("input_prompt").innerHTML = "Set name for the new notebook: ";
        document.getElementById("inputDialog").style.display = "initial";
        cur_submit = "notebook";
    },

    addNote: function (){
        document.getElementById("input_prompt").innerHTML = "Set name for the new note: ";
        document.getElementById("inputDialog").style.display = "initial";
        cur_submit = "note";
    },

    updateNote: function (notebook_name, note_name, content) {
        const lib = getLibPath();
    },

    newNote: function (notebook_name, note_name) {
        const lib = getLibPath();
    },

    newNoteBook: function (notebook_name) {
        const lib = getLibPath();
    },

    parseCell: function (content) {
    }
};
