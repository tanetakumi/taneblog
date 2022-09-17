const fs = require('fs');
const path = require('path');

const dir = './source/_posts'

const allNames = fs.readdirSync('./source/_posts');
const files = allNames.filter(file => /.*\.md$/.test(file));  
/*
var test = fs.readFileSync('./source/_posts/second.md', 'utf8');

console.log(test);
*/

for(var i in files){
    console.log(files[i]);
    var data = fs.readFileSync(dir + '/' + files[i], 'utf8');
    var id_inp = data.match(/id:.+/g) ?? [''];
    var id = id_inp[0].replace(/id:|\s/g, '');
    console.log(id) 
}

/*
for(var i in files){
    console.log(files[i]);
    fs.readFile('./source/_posts/'+files[i], 'utf8', function(err, data) {
        //console.log(data);
        var id_inp = data.match(/id:.+/g) ?? [''];
        var id = id_inp[0].replace(/id:|\s/g, '');
        console.log(id) 
            
    })
}

var filelist;
fs.readdir('./source/_posts', "utf-8", function(err, files){
    if (err) throw err;
    filelist = files.filter(function(file){
        return /.*\.md$/.test(file); //絞り込み
    })
});
console.log(filelist);


fs.readFile("../source/_post/data1.txt", "utf-8", (err, data) => {
    if (err) throw err;
    console.log(data);
  });*/