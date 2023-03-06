#!/usr/bin/env node
let fs=require("fs")
let input=process.argv.slice(2);
// console.log(input)

//seperation of options and files
let options=[]
let files=[]
for(let i=0;i<input.length;i++)
{
    if(input[i][0]=='-')
        options.push(input[i])
    else
        files.push(input[i])
}
// console.log(options)
// console.log(files)

//check if files exist or not
for(let i=0;i<files.length;i++)
{
    let ischeck=fs.existsSync(files[i])
    if(!ischeck)
    {
        console.log(`file ${files[i]} does not exists`)
        return
    }
}

//-n -b cannot be called together
let isboth=options.includes("-n") && options.includes("-b")
if(isboth)
{
    console.log("n and b cannot be executed together")
    return;
}
//reading content from multiple files
let content=""
for(let i=0;i<files.length;i++)
{
    let getbuffer=fs.readFileSync(files[i])
    content+=getbuffer
    if(i!=files.length-1)
        content+='\r\n'
}
// console.log(content)

//Splitting up the content
content=content.split("\r\n")
// console.log(content)

//implementing the commands
//Command -1 s : Removes extra lines(>1)
let isS=options.includes("-s")
if(isS==true)
{
    for(let i=1;i<content.length;i++)
    {
        if(content[i]=="" && content[i-1]=="")
            content[i]=null;
        else if(content[i]=="" && content[i-1]==null)
            content[i]=null;
    }

    let tempS=[];
    for(let i=0;i<content.length;i++)
    {
        if(content[i]!=null)
            tempS.push(content[i]);
    }
    // console.log(tempS)
    content=tempS
    // console.log(`''''''''''''''''-s''''''''''''''''''`)
    // console.log(content.join("\n"))
}


let isN=options.includes("-n")
if(isN==true)
{
    for(let i=0;i<content.length;i++)
    {
        content[i]=`${i+1} ${content[i]}`
    }
    // console.log(`''''''''''-n'''''''''''''''''`)
    // console.log(content.join("\n"))
}


let isB=options.includes("-b")
if(isB==true)
{
    let line=1;
    for(let i=0;i<content.length;i++)
    {
        if(content[i]!='')
            {content[i]=`${line} ${content[i]}`
            line++;
            }
    }
    // console.log(`''''''''-b'''''''''''''''`)
}
console.log(content.join("\n"))