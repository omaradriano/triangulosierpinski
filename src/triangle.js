class Triangulo {
    constructor(Ax,Ay,Bx,By,Cx,Cy){
        this.children = {}
        this.Ax = Ax
        this.Ay = Ay
        this.Bx = Bx
        this.By = By
        this.Cx = Cx
        this.Cy = Cy
    }
    showPoints(){
        return {
            A: [this.Ax, this.Ay],
            B: [this.Bx, this.By],
            C: [this.Cx, this.Cy]
        }
    }
    //((Ax + Bx) / 2, (Ay + By) / 2)
    //console.log(0.0 + (-0.5) / 2);
    getEdgesMiddlePoints(){
        return {
            AB : [Number(((this.Ax + this.Bx) / 2).toFixed(4)), Number(((this.Ay + this.By) / 2).toFixed(4))],
            BC : [Number(((this.Bx + this.Cx) / 2).toFixed(4)), Number(((this.By + this.Cy) / 2).toFixed(4))],
            CA : [Number(((this.Cx + this.Ax) / 2).toFixed(4)), Number(((this.Cy + this.Ay) / 2).toFixed(4))], 
        }
    }
    setChildrenCoords(){
        const {AB, BC, CA} = this.getEdgesMiddlePoints()
        return this.children = {
            empty: [...AB, ...BC, ...CA],
            T1 : [
                this.Ax, this.Ay,
                ...AB, 
                ...CA,
            ],
            T2: [
                this.Bx, this.By,
                ...BC,
                ...AB
            ],
            T3: [
                this.Cx, this.Cy,
                ...CA,
                ...BC
            ]
        }
    }
}

// const t1 = new Triangulo(0.0,0.5,-0.5,-0.5,0.5,-0.5)
// let {A, B, C} = t1.showPoints()
// console.log([...A,...B,...C]);
// console.log(t1.getEdgesMiddlePoints());
// console.log(t1.setChildrenCoords());

export default Triangulo