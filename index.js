const fs = require('fs')
const data = require('./data.json')
const { createCanvas, loadImage } = require('canvas')

const basePath = process.cwd();
const buildDir = `${basePath}/build`;
const layersDir = `${basePath}/layers`;

const width = 1200
const height = 1200

const canvas = createCanvas(width, height)
const context = canvas.getContext('2d') 




const buildSetup = () => {
    if (fs.existsSync(buildDir)) {
      fs.rmSync(buildDir, { recursive: true });
    }
    fs.mkdirSync(buildDir);
    fs.mkdirSync(`${buildDir}/json`);
    fs.mkdirSync(`${buildDir}/images`);
   };


const load = (async (L,a)=>{ 
    //console.log(a);
    const image = await loadImage(`./layers/${L.trait_type}/${L.value}.png`).then((image)=>{
    context.drawImage(image,0,0,1200,1200,);
   // console.log(buffer);
    const buffer = canvas.toBuffer('image/png');
    fs.writeFileSync(`./build/images/${a.name}.png`, buffer)  

    })
    //console.log(image);

    

}) 

function  main(){    
    buildSetup()
    data.map((a)=>{ 

            a.attributes.map((L)=>{load(L,a);})
            context.fillStyle = '#fff'
            context.fillRect(0, 0, 0, 0)        
            console.log(`regenerating ${a.name}... `);
            
        }) 
}
 
main()