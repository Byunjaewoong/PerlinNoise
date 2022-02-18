import {Calculate} from "./tool.js"

export class Perlin{
    constructor(canvas,scale,stageWidth,stageHeight){
        this.ctx = canvas.getContext('2d');
        this.scale = scale;
        this.stageWidth = stageWidth;
        this.stageHeight = stageHeight;
        this.perlinGroup = new PerlinGroup;
        this.get1DGrid();
    }

    get1DGrid(){
        this.dotAmount = this.scale;
        this.interval = Math.round(this.stageWidth/this.scale);
        for(let i=0;i<this.dotAmount;i++){
            const dot = new Perlindot(this.interval*i,this.stageHeight/2+this.stageHeight/4*Math.random(-1,1),0)
            this.perlinGroup.arry[i] = dot;
            console.log(this.perlinGroup.arry[i]);
        }
    }

    getGradient(dot){
        dot.y = Math.random(-1,1);
    }

    cubicInterPolate(a,b,c,d,x){
        const P = (d.y-c.y)-(a.y-b.y);
        const Q = (a.y-b.y)-P;
        const R = c.y - a.y;
        const S = b.y;

        return P*x*x*x + Q*x*x + R*x + S;
    }

    draw1Dperlin(){
        for(let i=0;i<this.stageWidth;i++){
            let j = Math.round(i/this.scale);
            /*if(this.perlinGroup.arry[j+1]&&this.perlinGroup.arry[j+2]**this.perlinGroup.arry[j+3]){
                this.height = this.cubicInterPolate(this.perlinGroup.arry[j],this.perlinGroup.arry[j+1],this.perlinGroup.arry[j+2],this.perlinGroup.arry[j+3],i-j*this.interval);
            }*/
            this.height = this.stageHeight/2;
            if(i==0){
                console.log(this.height);
            }
            this.ctx.fillStyle = "rgba(255,255,255,1)";
            this.ctx.beginPath();
            this.ctx.arc(
                i, //* ratio_w,
                this.height, //* ratio_h,
                2,
                0 * 2/8 * Math.PI, 8 * 2/8 * Math.PI  
                );
            this.ctx.fill();
        }

    }



}

export class Perlindot{
    constructor(x,y,gradient){
        this.x = x;
        this.y = y;
        this.gradient = gradient;
    }
}

export class PerlinGroup{
    constructor(){
        this.arry = [];
    }
}