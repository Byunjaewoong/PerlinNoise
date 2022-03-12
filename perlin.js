import {Calculate} from "./tool.js"

export class Perlin{
    constructor(canvas,scale,stageWidth,stageHeight){
        this.ctx = canvas.getContext('2d');
        this.scale = scale;
        this.stageWidth = stageWidth;
        this.stageHeight = stageHeight;
        this.perlinGroup = new PerlinGroup;
        this.get1DGrid();
        this.getallgroup();
    }

    get1DGrid(){
        this.dotAmount = this.scale;
        this.interval = Math.round(this.stageWidth/this.scale);
        //console.log(this.scale);
        //console.log(this.interval);
        for(let i=0;i<this.dotAmount;i++){
            const dot = new Perlindot(this.interval*i,this.stageHeight/2+this.stageHeight/4*(Calculate.getRandomArbitrary(-1,1)),0)
            this.perlinGroup.arry[i] = dot;
            //console.log(this.perlinGroup.arry[i]);
        }
        this.perlinGroup.arry[this.dotAmount] = new Perlindot(this.interval*this.dotAmount,this.stageHeight/2+this.stageHeight/4*(Calculate.getRandomArbitrary(-1,1)),0);
        
    }

    getGradient(dot){
        dot.y = Math.random(-1,1);
    }

    cubicInterPolate(a,b,c,d,x){
        let P = (d.y-c.y)-(a.y-b.y);
        let Q = (a.y-b.y)-P;
        let R = c.y - a.y;
        let S = b.y;

        return P*x*x*x + Q*x*x + R*x + S;
    }

    getallgroup(){
        for(let i=0;i<this.stageWidth;i++){
            let j = Math.floor(i/this.interval);
            if(this.perlinGroup.arry[j+1]&&this.perlinGroup.arry[j+2]&&j>0){
                this.height = this.cubicInterPolate(this.perlinGroup.arry[j-1],this.perlinGroup.arry[j],this.perlinGroup.arry[j+1],this.perlinGroup.arry[j+2],(i-j*this.interval)/this.interval);
            }
            else if(j==0){
                this.height = this.cubicInterPolate({x:0,y:this.stageWidth/2},this.perlinGroup.arry[j],this.perlinGroup.arry[j+1],this.perlinGroup.arry[j+2],(i-j*this.interval)/this.interval);
            }
            else if(j==(this.scale-1)){
                this.height = this.cubicInterPolate(this.perlinGroup.arry[j-1],this.perlinGroup.arry[j],this.perlinGroup.arry[j+1],{x:0,y:this.stageWidth/2},(i-j*this.interval)/this.interval);
            }
            else if(j==(this.scale)){
                this.height = this.cubicInterPolate(this.perlinGroup.arry[j-1],this.perlinGroup.arry[j],{x:0,y:this.stageWidth/2},{x:0,y:this.stageWidth/2},(i-j*this.interval)/this.interval);
            }
            else{
                this.height = this.stageHeight/2;
            }

            this.perlinGroup.allarry[i] = this.height;
            //console.log(i+"    "+j+"    "+this.perlinGroup.allarry[i]);
        }
    }

    draw1Dperlin(){
        for(let i=0;i<this.stageWidth;i++){
            this.height = this.perlinGroup.allarry[i];
            //this.height = this.stageHeight/2;
            //if(j>=2&&j<=3){
            //    console.log(this.height+"    "+i);
            //}
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
        this.allarry = [];
    }
}
