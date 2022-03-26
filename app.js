import {Calculate} from "./tool.js"
import {Lowestline, Perlin, Perlindot, PerlinGroup} from "./perlin.js"

class App {
    constructor(){
        this.canvas = document.createElement('canvas');
        document.body.appendChild(this.canvas);
        this.ctx = this.canvas.getContext('2d');
        this.pixelRatio = 1;

        //orange
        //background-color: #df621a;
        //resolution
        this.resolution = 3;

        //mode
        this.mode = 0;

        //perlin scale
        this.scale = 5;

        //wave speed
        this.speed = 0.01;
        
        //ColortransSpeed
        this.colorTransSpeed = 0.4;
        
        //amp
        //this.amp = this.stageHeight/4;

        //lines
        this.linecount = 5;

        this.lineArry = [];


        window.addEventListener('resize', this.resize.bind(this), false);
        this.resize();
        window.requestAnimationFrame(this.animate.bind(this));

        this.lowestLine = new Lowestline(this.canvas,this.stageWidth,this.stageHeight,this.lineArry,0,this.resolution);

        window.addEventListener("click", (e) => {
            this.mode += 1;
            switch(this.mode){
                case 0:
                    this.canvas.style.backgroundColor = 'black';
                break;
                case 1:
                    for(let i=0;i<this.linecount;i++){
                        this.lineArry[i].color.r = Math.random()*255;
                        this.lineArry[i].color.g = Math.random()*255;
                        this.lineArry[i].color.b = Math.random()*255;
                    }
                //this.canvas.style.backgroundColor = '#df621a';
                    let negColor = {
                                r:(255-this.lineArry[this.linecount-1].color.r)/3,
                                g:(255-this.lineArry[this.linecount-1].color.g)/3,
                                b:(255-this.lineArry[this.linecount-1].color.b)/3,
                                };
                    this.canvas.style.backgroundColor = "rgba("+negColor.r+","+negColor.g+","+negColor.b+",1)";
                break;
                case 2:
                    this.canvas.style.backgroundColor = 'black';
                break;
                default:
                this.mode = 0;
                this.canvas.style.backgroundColor = 'black';
                break;
            }

        });

        for(let i=0;i<this.linecount;i++)
            {
            this.amp = this.stageHeight/3*Calculate.getRandomArbitrary(0.7,1);;
            this.lineArry[i] = new Perlin(this.canvas,this.scale,this.stageWidth,this.stageHeight,this.speed,this.amp,this.mode,this.resolution);
            }
    }

    resize(){
        this.stageWidth = document.body.clientWidth;
        this.stageHeight = document.body.clientHeight;
        this.canvas.width = this.stageWidth * this.pixelRatio;
        this.canvas.height = this.stageHeight * this.pixelRatio;
        if(this.lowestLine){
            this.lowestLine.stageWidth = this.stageWidth;
            this.lowestLine.stageHeight = this.stageWidth;
        }
        for(let i=0;i<this.linecount;i++)
            {
                this.amp = this.stageHeight/3*Calculate.getRandomArbitrary(0.7,1);;
                this.lineArry[i] = new Perlin(this.canvas,this.scale,this.stageWidth,this.stageHeight,this.speed,this.amp,this.mode,this.resolution);
            }
        if(this.mode==1)
        {    
            let negColor = {
                r:(255-this.lineArry[this.linecount-1].color.r)/2,
                g:(255-this.lineArry[this.linecount-1].color.g)/2,
                b:(255-this.lineArry[this.linecount-1].color.b)/2,
                };
            this.canvas.style.backgroundColor = "rgba("+negColor.r+","+negColor.g+","+negColor.b+",0.6)";
        }
    }

    animate() {
        window.requestAnimationFrame(this.animate.bind(this));
        this.ctx.clearRect(0,0,this.stageWidth,this.stageHeight);
        
        for(let i=0;i<this.linecount;i++){
            this.lineArry[i].lineUpdate();
        }

        for(let i=0;i<this.linecount;i++){
            if(this.mode==1||this.mode==2){
                this.lineArry[i].transColor(this.colorTransSpeed);
            }
            this.lineArry[i].draw1Dperlin(this.mode,'white');
        }
        
        if(this.mode==1){    
            let negColor = {
                r:(255-this.lineArry[this.linecount-1].color.r)/2,
                g:(255-this.lineArry[this.linecount-1].color.g)/2,
                b:(255-this.lineArry[this.linecount-1].color.b)/2,
                };
            this.canvas.style.backgroundColor = "rgba("+negColor.r+","+negColor.g+","+negColor.b+",1)";
        }
        else if(this.mode==2){
            this.canvas.style.backgroundColor = 'black';
            let negColor = {
                r:0,
                g:0,
                b:0,
                };
            this.lowestLine.maxReturn(this.lineArry);
            this.lowestLine.overPaint(negColor);
            for(let i=0;i<this.linecount;i++){
                this.lineArry[i].draw1Dperlin(0,'black');
            }
        }
    }    
}


window.onload = () => {
    new App();
}
