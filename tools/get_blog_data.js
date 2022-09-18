const fs = require('fs');
const path = require('path');
const yaml = require("js-yaml");
// このファイルのディレクトリ
const thisFileDir = path.dirname(process.argv[1]);

// source/_posts のターゲットディレクトリ
const dir = path.join(thisFileDir, '..', 'source','_posts');


const allNames = fs.readdirSync(dir);
const files = allNames.filter(file => /.*\.md$/.test(file));  

for(var i in files){

    var data = fs.readFileSync(path.join(dir, files[i]), 'utf8');
    console.log(path.join(dir, files[i]));
    var header = data.match(/^---[\s\S]+?---/) ?? [''];
    var data1 = yaml.load(header[0].replace(/^-+|-+$/g, ''), {
        schema: yaml.JSON_SCHEMA
    });
    console.log(data1);
    //console.log(header[0].replace(/^-+|-+$/g, ''));
    //var hyaml = header[0].replace('---', '');
    //console.log(hyaml);
    /*
    var id_inp = data.match(/id:.+/g) ?? [''];
    var id = id_inp[0].replace(/id:|\s/g, '');
    console.log('-----');
    console.log('filename:\t'+files[i]);
    console.log('blogid:\t\t'+id);
    */
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