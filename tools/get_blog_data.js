const fs = require('fs');
const path = require('path');
const yaml = require("js-yaml");
const csv = require("csv");
// このファイルのディレクトリ
const thisFileDir = path.dirname(process.argv[1]);

// source/_posts のターゲットディレクトリ
const dir = path.join(thisFileDir, '..', 'source','_posts');


function csv_export(){

    //変換後の配列を格納
    let newData = [];
    newData.push(['title', 'id', 'tags', 'filename', 'user']);
    const allNames = fs.readdirSync(dir);
    const files = allNames.filter(file => /.*\.md$/.test(file));  
    for(var i in files){

        var data = fs.readFileSync(path.join(dir, files[i]), 'utf8');

        // 操作
        console.log(path.join(dir, files[i]));

        // json の取得
        var header = data.match(/^---[\s\S]+?---/) ?? [''];
        var tags_json = yaml.load(header[0].replace(/^-+|-+$/g, ''), {
            schema: yaml.JSON_SCHEMA
        });

        var row = [];
        row.push(tags_json['title'] ?? '');
        row.push(tags_json['id'] ?? '');
        row.push((tags_json['tags'] ?? ['']).toString());
        row.push(files[i]);
        row.push((data.match(/こんにちは.+?です/) ?? [''])[0].replace(/こんにちは、*|です/g, ''))
        newData.push(row);
    }
    console.log(newData);
    //write
    csv.stringify(newData,(error,output)=>{
        fs.writeFileSync( path.join(thisFileDir,'out.csv'), output, 'utf8');
    })
}

function csv_import(){
    
    const allNames = fs.readdirSync(dir);
    const files = allNames.filter(file => /.*\.md$/.test(file));  
    for(var i in files){

        var data = fs.readFileSync(path.join(dir, files[i]), 'utf8');

        // 操作
        console.log(path.join(dir, files[i]));

        // json の取得
        var header = data.match(/^---[\s\S]+?---/) ?? [''];
        var tags_json = yaml.load(header[0].replace(/^-+|-+$/g, ''), {
            schema: yaml.JSON_SCHEMA
        });

        delete tags_json['alias'];
        if(tags_json['tags'] === null || tags_json['tags'] === undefined){
            tags_json['tags'] = [];
        }

        //console.log(tags_json);

        data = data.replace(/^---[\s\S]+?---/, '---\n' + yaml.dump(tags_json) + '\n---');

        console.log(data);
        //console.log(yaml.dump(tags_json));
        //console.log((data.match(/こんにちは.+?です/) ?? [''])[0].replace(/^-+|-+$/g, ''));

        // 書き込み
    }
}

csv_export();

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


fs.readFile("../source/_post/tags_json.txt", "utf-8", (err, data) => {
    if (err) throw err;
    console.log(data);
  });*/