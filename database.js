/**
 * Created by 2000jedi on 2017/4/30.
 */

const fs = require("fs");
const md = require("markdown").markdown;
module.exports = {
    getNotebooks: function () {
        const lib = getLibPath();
        fs.readdir(lib, function (err, files) {
            if (err) {
                alert("Cannot find Quiver library!");
                return
            }

            files.forEach(function (file) {
                if (file.toString() !== "Trash.qvnotebook") {
                    let elem = document.createElement("div");
                    elem.innerHTML = file.toString().split('.')[0];
                    elem.setAttribute("onclick","db.getNotes('" + elem.innerHTML + "');");
                    document.getElementById("menu").appendChild(elem);
                }
            });
        });
    },

    getNotes: function (notebook_name) {
        cur_notebook = notebook_name;
        const lib = getLibPath() + "/" + notebook_name + ".qvnotebook";
        fs.readdir(lib, function (err, files) {
            if (err) {
                console.log("Error reading notebook");
                return
            }
            document.getElementById("submenu").innerHTML = "";
            files.forEach(function (file) {
                if (file.toString() !== "meta.json") {
                    let elem = document.createElement("div");
                    let file_description = JSON.parse(fs.readFileSync(lib+"/"+file.toString()+"/meta.json", "utf8"));
                    elem.innerHTML = file_description.title;
                    elem.setAttribute("onclick", "db.getNote('" + notebook_name + "', '" + file.toString() + "');");
                    document.getElementById("submenu").appendChild(elem);
                }
            });
        });
    },

    getNote: function (notebook_name, note_dir) {
        cur_notebook = notebook_name;
        cur_note = note_dir;
        const lib = getLibPath() + '/' + notebook_name + '.qvnotebook/' + note_dir + '/';
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

function getLibPath(){
    return "D:\\Documents\\记录\\Quiver.qvlibrary";
}