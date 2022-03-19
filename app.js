import {Calculate} from "./tool.js"
import {Perlin, Perlindot, PerlinGroup} from "./perlin.js"

class App {
    constructor(){
        this.canvas = document.createElement('canvas');
        document.body.appendChild(this.canvas);
        this.ctx = this.canvas.getContext('2d');
        this.pixelRatio = 1;

        window.addEventListener('resize', this.resize.bind(this), false);
        this.resize();

        window.requestAnimationFrame(this.animate.bind(this));

        //mode
        this.mode = 0;

        //perlin scale
        this.scale = 10;

        //wave speed
        this.speed = 0.03;

        window.addEventListener("click", (e) => {
            //mode 변경
            /*if(this.mode == 0){
                this.mode += 1;
                console.log(this.mode);
            }
            else{
                this.mode = 0;
                console.log(this.mode);
            }
            */
            this.perlin = new Perlin(this.canvas,this.scale,this.stageWidth,this.stageHeight,this.speed);
            this.perlin2 = new Perlin(this.canvas,this.scale,this.stageWidth,this.stageHeight,this.speed);
            this.perlin3 = new Perlin(this.canvas,this.scale,this.stageWidth,this.stageHeight,this.speed);
        });

        this.perlin = new Perlin(this.canvas,this.scale,this.stageWidth,this.stageHeight,this.speed);
        this.perlin2 = new Perlin(this.canvas,this.scale,this.stageWidth,this.stageHeight,this.speed);
        this.perlin3 = new Perlin(this.canvas,this.scale,this.stageWidth,this.stageHeight,this.speed);

    }

    resize(){
        this.stageWidth = document.body.clientWidth;
        this.stageHeight = document.body.clientHeight;
        this.canvas.width = this.stageWidth * this.pixelRatio;
        this.canvas.height = this.stageHeight * this.pixelRatio;
        this.perlin = new Perlin(this.canvas,this.scale,this.stageWidth,this.stageHeight,this.speed);
        this.perlin2 = new Perlin(this.canvas,this.scale,this.stageWidth,this.stageHeight,this.speed);
        this.perlin3 = new Perlin(this.canvas,this.scale,this.stageWidth,this.stageHeight,this.speed);


    }

    animate() {
        window.requestAnimationFrame(this.animate.bind(this));
        this.ctx.clearRect(0,0,this.stageWidth,this.stageHeight);
        this.perlin.draw1Dperlin();
        this.perlin2.draw1Dperlin();
        this.perlin3.draw1Dperlin();
    }    
}


window.onload = () => {
    new App();
}
