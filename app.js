import {Calculate} from "./tool.js"
import {Perlin, Perlindot, PerlinGroup} from "./perlin.js"

class App {
    constructor(){
        this.canvas = document.createElement('canvas');
        document.body.appendChild(this.canvas);
        this.ctx = this.canvas.getContext('2d');
        this.pixelRatio = 1;

        //orange
        //background-color: #df621a;

        //mode
        this.mode = 0;

        //perlin scale
        this.scale = 5;

        //wave speed
        this.speed = 0.02;
        
        //ColortransSpeed
        this.colorTransSpeed = 0.5;
        
        //amp
        //this.amp = this.stageHeight/4;

        //lines
        this.linecount = 5;

        this.lineArry = [];


        window.addEventListener('resize', this.resize.bind(this), false);
        this.resize();
        window.requestAnimationFrame(this.animate.bind(this));



        window.addEventListener("click", (e) => {
            //mode 변경
            /*if(this.mode == 1){
                this.mode += 1;
                this.canvas.style.backgroundColor = 'black';
                console.log(this.mode);
            }*/
            if(this.mode == 0){
                this.mode += 1;
                for(let i=0;i<this.linecount;i++)
                {
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
                this.canvas.style.backgroundColor = "rgba("+negColor.r+","+negColor.g+","+negColor.b+",0.6)";
            }
            else{
                this.mode = 0;
                this.canvas.style.backgroundColor = 'black';
                /*Wfor(let i=0;i<this.linecount;i++)
                {
                    this.lineArry[i] = new Perlin(this.canvas,this.scale,this.stageWidth,this.stageHeight,this.speed,this.amp,this.mode);
                }
                console.log(this.mode);*/
            }
            
            
            //this.perlin = new Perlin(this.canvas,this.scale,this.stageWidth,this.stageHeight,this.speed,this.amp);
            //this.perlin2 = new Perlin(this.canvas,this.scale,this.stageWidth,this.stageHeight,this.speed,this.amp);
            //this.perlin3 = new Perlin(this.canvas,this.scale,this.stageWidth,this.stageHeight,this.speed,this.amp);
        });

        for(let i=0;i<this.linecount;i++)
            {
            this.amp = this.stageHeight/3*Calculate.getRandomArbitrary(0.7,1);;
            this.lineArry[i] = new Perlin(this.canvas,this.scale,this.stageWidth,this.stageHeight,this.speed,this.amp,this.mode);
            }
    }

    resize(){
        this.stageWidth = document.body.clientWidth;
        this.stageHeight = document.body.clientHeight;
        this.canvas.width = this.stageWidth * this.pixelRatio;
        this.canvas.height = this.stageHeight * this.pixelRatio;
        for(let i=0;i<this.linecount;i++)
            {
                this.amp = this.stageHeight/3*Calculate.getRandomArbitrary(0.7,1);;
                this.lineArry[i] = new Perlin(this.canvas,this.scale,this.stageWidth,this.stageHeight,this.speed,this.amp,this.mode);
            }
        if(this.mode==1)
        {    
            let negColor = {
                r:(255-this.lineArry[this.linecount-1].color.r)/3,
                g:(255-this.lineArry[this.linecount-1].color.g)/3,
                b:(255-this.lineArry[this.linecount-1].color.b)/3,
                };
            this.canvas.style.backgroundColor = "rgba("+negColor.r+","+negColor.g+","+negColor.b+",0.6)";
        }
    }

    animate() {
        window.requestAnimationFrame(this.animate.bind(this));
        this.ctx.clearRect(0,0,this.stageWidth,this.stageHeight);
        //this.perlin.draw1Dperlin();
        //this.perlin2.draw1Dperlin();
        //this.perlin3.draw1Dperlin();
        
        for(let i=0;i<this.linecount;i++)
        {
            if(this.mode==1){
                this.lineArry[i].transColor(this.colorTransSpeed);
            }
            this.lineArry[i].draw1Dperlin(this.mode);
        }
        /*
        for(let i=0;i<this.linecount;i++){
            this.lineArry[i].draw1Dperlin(0);
        }*/

        if(this.mode==1)
        {    
            let negColor = {
                r:(255-this.lineArry[this.linecount-1].color.r)/3,
                g:(255-this.lineArry[this.linecount-1].color.g)/3,
                b:(255-this.lineArry[this.linecount-1].color.b)/3,
                };
            this.canvas.style.backgroundColor = "rgba("+negColor.r+","+negColor.g+","+negColor.b+",0.6)";
        }
    }    
}


window.onload = () => {
    new App();
}
