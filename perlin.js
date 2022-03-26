import {Calculate} from "./tool.js"

export class Perlin{
    constructor(canvas,scale,stageWidth,stageHeight,speed,amp,mode,resolution){
        this.ctx = canvas.getContext('2d');
        this.scale = scale;
        this.stageWidth = stageWidth;
        this.stageHeight = stageHeight;
        this.perlinGroup = new PerlinGroup;
        this.amp = amp;
        this.get1DGrid(speed);
        this.getallgroup();
        this.mode = mode;
        this.color={r:0,g:0,b:0};
        this.color.r = Math.random()*255;
        this.color.g = Math.random()*255;
        this.color.b = Math.random()*255;
        this.directionColor();
        this.resolution = resolution;
    }

    directionColor(){
        this.vectorColor = {r:0,g:0,b:0};
        this.vectorColor.r = Calculate.getRandomArbitrary(-1,1);
        this.vectorColor.g = Calculate.getRandomArbitrary(-1,1);
        this.vectorColor.b = Calculate.getRandomArbitrary(-1,1);
    }

    transColor(transSpeed){
        if(this.color.r > 255||this.color.r < 0){
            this.vectorColor.r = this.vectorColor.r*(-1);
        }
        if(this.color.g > 255||this.color.g < 0){
            this.vectorColor.g = this.vectorColor.g*(-1);
        }
        if(this.color.b > 255||this.color.b < 0){
            this.vectorColor.b = this.vectorColor.b*(-1);
        }
        this.color.r = this.color.r + this.vectorColor.r*transSpeed;
        this.color.g = this.color.g + this.vectorColor.g*transSpeed;
        this.color.b = this.color.b + this.vectorColor.b*transSpeed;        
    }

    get1DGrid(speed){
        this.dotAmount = this.scale;
        this.interval = Math.round(this.stageWidth/this.scale);
        //console.log(this.scale);
        //console.log(this.interval);
        for(let i=0;i<this.dotAmount;i++){
            const dot = new Perlindot(this.stageHeight,this.interval*i,0,speed,this.amp)
            this.perlinGroup.arry[i] = dot;
            //console.log(this.perlinGroup.arry[i]);
        }
        this.perlinGroup.arry[this.dotAmount] = new Perlindot(this.stageHeight,this.interval*this.dotAmount,0,speed,this.amp);
        this.perlinGroup.arry[this.dotAmount+1] = new Perlindot(this.stageHeight,this.interval*(this.dotAmount+1),0,speed,this.amp);
        
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
        for(let i=0;i<this.stageWidth+this.resolution;i++){
            let j = Math.floor(i/this.interval);
            if(this.perlinGroup.arry[j+1]&&this.perlinGroup.arry[j+2]&&j>0){
                this.height = this.cubicInterPolate(this.perlinGroup.arry[j-1],this.perlinGroup.arry[j],this.perlinGroup.arry[j+1],this.perlinGroup.arry[j+2],(i-j*this.interval)/this.interval);
            }
            else if(j==0){
                this.height = this.cubicInterPolate({x:0,y:this.stageHeight/2},this.perlinGroup.arry[j],this.perlinGroup.arry[j+1],this.perlinGroup.arry[j+2],(i-j*this.interval)/this.interval);
            }

            this.perlinGroup.allarry[i] = this.height;
            //console.log(i+"    "+j+"    "+this.perlinGroup.allarry[i]);
        }
    }

    lineUpdate(){
        for(let i=0;i<this.perlinGroup.arry.length;i++){
            this.perlinGroup.arry[i].update();
        }
    }

    draw1Dperlin(mode,strokeStyle){
        this.mode = mode;
        //console.log(this.mode);
        
        this.getallgroup();
        this.ctx.lineWidth = 1;
        this.ctx.linecap = 'round';
        this.ctx.linejoin = 'round';
        this.ctx.mitterLimit = 5;

        this.ctx.strokeStyle = strokeStyle;


        this.ctx.fillStyle = "rgba("+this.color.r+","+this.color.g+","+this.color.b+",0.4)";
        for(let i=0;i<this.stageWidth+this.resolution;i+=this.resolution){
            this.height = this.perlinGroup.allarry[i];
            this.ctx.beginPath();
            this.ctx.moveTo(i, this.height);
            this.ctx.quadraticCurveTo(i+this.resolution/2, (this.height+this.perlinGroup.allarry[i+this.resolution])/2, i+this.resolution, this.perlinGroup.allarry[i+this.resolution]);
            if(this.mode == 0){
                this.ctx.stroke();
            }
            if(this.mode == 1||this.mode==2){
                this.ctx.lineTo(i+this.resolution,this.stageHeight);
                this.ctx.lineTo(i,this.stageHeight);
                this.ctx.fill();
            };
            /*this.ctx.beginPath();
            this.ctx.arc(
                i, //* ratio_w,
                this.height, //* ratio_h,
                2,
                0 * 2/8 * Math.PI, 8 * 2/8 * Math.PI  
                );
            this.ctx.fill();*/
        }
    }
}

export class Perlindot{
    constructor(stageHeight,x,gradient,speed,amp){
        this.stageHeight = stageHeight;
        this.x = x;
        this.offset = Calculate.getRandomArbitrary(-1,1);
        this.amp = amp;
        //this.y = this.stageHeight/2+this.amp*this.offset;
        this.constant = this.stageHeight/2;
        this.gradient = gradient;
        let negspeed = speed*(-1);
        this.speed = Calculate.getRandomArbitrary(negspeed,speed);
        this.cur = 0;
    }

    update(){
        this.cur += this.speed;
        this.y = this.constant + this.offset*this.amp*Math.cos(this.cur);
    }
}

export class PerlinGroup{
    constructor(){
        this.arry = [];
        this.allarry = [];
    }
}

export class Lowestline{
    constructor(canvas,stageWidth,stageHeight,lineArry,backgroundColor,resolution){
        this.ctx = canvas.getContext('2d');
        this.stageWidth = stageWidth;
        this.stageHeight = stageHeight;
        this.lineArry = lineArry;
        this.lowestDot = [];
        this.backgroundColor = backgroundColor;
        this.resolution = resolution;
    }

    maxReturn(lineArry){
        this.lineArry = lineArry;
        for(let i=0;i<this.stageWidth+this.resolution;i++){
            this.lowestDot[i]= Math.max.apply(Math, this.lineArry.map(function(o){return o.perlinGroup.allarry[i]}));
        }
    }

    overPaint(backgroundColor){
        this.backgroundColor = backgroundColor;
        this.ctx.fillStyle = "rgba("+this.backgroundColor.r+","+this.backgroundColor.g+","+this.backgroundColor.b+",1)";
        for(let i=0;i<this.stageWidth+this.resolution;i+=this.resolution){
            this.height = this.lowestDot[i];
            this.ctx.beginPath();
            this.ctx.moveTo(i, this.height);
            this.ctx.quadraticCurveTo(i+this.resolution/2, (this.height+this.lowestDot[i+this.resolution])/2, i+this.resolution, this.lowestDot[i+this.resolution]);
            this.ctx.lineTo(i+this.resolution,this.stageHeight);
            this.ctx.lineTo(i,this.stageHeight);
            this.ctx.fill();
            
        }
    }
}
