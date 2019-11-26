import { Entity } from "/js/entity/entity.js";
import { Fire } from "/js/projectiles/Fire.js";

export class Skeleton extends Entity {
    constructor(name, x, y, target) {
        super(x,y);
        this.name = name;

        this.target = target;

        this.image = new Image();
        this.image.src = '/media/skeleton-sprite.png';
        this.canShoot = true;
    }
    
    shoot(context) {        
        if(this.canShoot && this.target) {                    
            this.canShoot = false;
            this.projectile = new Fire(context, this.x + this.width / 2, this.y);
            const Ex = this.target.x;
            const Ey = this.target.y;

            const angleRadians = Math.atan2(Ey - this.y, Ex - this.x);        

            this.projectile.dx = Math.cos(angleRadians) * this.speed;
            this.projectile.dy = Math.sin(angleRadians) * this.speed;
        }
    }

    draw = context => {
        super.draw(context); 
        if(this.projectile !== undefined) {
            this.projectile.draw();
        }         
        context.save();
        context.fillStyle = "red"; 
        context.font = "15px Arial";
        context.restore();
        context.fillText(this.name, this.x + context.measureText(this.name).width / 4, this.y);
    }
};