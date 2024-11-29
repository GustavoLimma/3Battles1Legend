
//--------------------------------------------------------------------------------------------------------------
//class.js
const canvasJ = document.getElementById('gameMenuCanvas');
const ctxJ = canvasJ.getContext('2d');

class Borda {
    static width = 48
    static height = 48
    constructor ({position}){
        this.position = position
        this.width = 48
        this.height = 48
    }

    draw(){
        ctx.fillStyle = 'rgba(255,0,0,0.0)' //altere último numero para 0.3 para ver a colisao
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}

class Sprite {
    constructor({ position, velocity, map, frames = { max: 1 }, lines = { line: 1 }, scale = 1 }) {
        this.position = position;
        this.map = map;
        this.frames = {...frames, val: 0, elapsed: 0};
        this.lines = lines;
        this.scale = scale;

        this.map.onload = () => {
            this.width = (this.map.width / this.frames.max) * this.scale;
            this.height = (this.map.height / this.lines.line) * this.scale;
        };
        this.movendo = false;
        this.currentDirection = 0; // Posição inicial(EIXO Y) (parado para baixo, nesse caso)
    }

    draw() {
        ctx.save(); // Salva o estado atual do contexto

        if (this.currentDirection === 127 || this.currentDirection === 31) {  // Quando o personagem está indo para a esquerda
            ctx.scale(-1, 1); // Espelha horizontalmente
            ctx.translate(-this.position.x * 2 - this.width, 0); // Ajusta a posição
        }

        // Desenha o sprite com base nos parâmetros
        ctx.drawImage(
            this.map,
            this.frames.val * (this.map.width / this.frames.max), // Posição X da fatia
            this.currentDirection,                                // Posição Y da fatia
            this.map.width / this.frames.max,                    // Largura da fatia
            this.map.height / this.lines.line,                   // Altura da fatia
            this.position.x,
            this.position.y,
            (this.map.width / this.frames.max) * this.scale,      // Largura no canvas
            (this.map.height / this.lines.line) * this.scale      // Altura no canvas
        );

        ctx.restore(); // Restaura o estado original do contexto

        // Lógica para animação
        if (this.frames.max > 1) {
            this.frames.elapsed++;
        }
        if (this.frames.max > 1) {
    this.frames.elapsed++;
    if (this.frames.elapsed % 10 === 0) {
        if (this.frames.val < this.frames.max - 1) {
            this.frames.val++;
        } else {
            this.frames.val = 0; // Voltar ao primeiro frame quando a animação terminar
        }
    }
}

    }
}

//-------------------------------------------------------------------------------------------
//mapa_colisao.js
const colisao = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 0, 1, 0, 0,
    0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0,
    0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0,
    0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 1,
    0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0,
    0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0,
    0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

//canvasMapa.js
const canvas = document.getElementById("mapa");
const ctx = canvas.getContext("2d");

canvas.width = 1240; // Largura do canvas
canvas.height = 720; // Altura do canvas
canvas.style.backgroundColor = "darkgray";

const coliMap = [];

for (let i = 0; i < colisao.length; i += 70) {
    coliMap.push(colisao.slice(i, 70 + i)); // Divide o mapa de colisão em blocos de 70
}

const bordas = [];
offset = {
    x: -1280,
    y: -600
};

coliMap.forEach((row, i) => { // Cada linha sendo id I
    row.forEach((symbol, j) => { // Cada número na linha, ou seja, as colunas de id J
        if (symbol === 1) // Se o número for de colisão
            bordas.push(
                new Borda({
                    position: {
                        x: j * Borda.width + offset.x, // Calcula posição x
                        y: i * Borda.height + offset.y // Calcula posição y
                    }
                })
            );
    });
});

const map = new Image(); // Cria a constante da imagem
map.src = './mapa/mapa.png'; // Carrega a imagem do mapa

const foreImg = new Image(); // Cria a constante da imagem
foreImg.src = './mapa/foreground.png'; // Carrega a imagem do foreground

const foreground = new Sprite({
    position: {
        x: offset.x,
        y: offset.y
    },
    map: foreImg // Usa a imagem do foreground
});
//-----------------------------------------------------------------------------------------------------------

//canvassprite.js
const canvassprite = document.getElementById("canvassprite");
const ctxsprite = canvassprite.getContext("2d") ;

canvassprite.width = canvas.width; //largura canva (3720 mapa completo)
canvassprite.height = canvas.height; //altura canva  (2160 mapa completo)
canvassprite.style.backgroundColor = "rgba(255,0,0,0.0)";
//------------------------------------------------------------------------------------------------

//animacao.js
const playerImage = new Image(); // Cria a constante da imagem
playerImage.src = './Cute_Fantasy_Free/Player/Player.png'; // Carrega a imagem do personagem

map.src = '../mapa/mapa.png'; // Carrega a imagem do mapa

offset = {
    x: -1280,
    y: -600
};
const scale = 2;

const keys = {
    w: { pressed: false },
    a: { pressed: false },
    s: { pressed: false },
    d: { pressed: false }
};

const player = new Sprite({                    //criar animacoes
    position: {
        x: (canvas.width / 2) - ((192 / 6) * scale/ 2),
        y: (canvas.height / 2) - ((320 / 10) * scale/ 2),
    },
    map: playerImage,
    frames: {
        max: 6,
    },
    lines: {
        line: 10
    },
    scale: scale

});

const background = new Sprite({
    position: {
        x: offset.x,
        y: offset.y
    },
    map: map
});

//------------------------------------------------------------------------------------

//npc_chopper.js

// Definição do objeto chopper
const chopper = {
    image: new Image(),
    width: 0,
    height: 0,
    frame: 0, // Frame atual (0 ou 1)
    animationSpeed: 200, // Velocidade da animação (em ms)
    lastFrameTime: 0, // Marca o tempo do último frame
    position: {
        x: (canvas.width / 2) + 430, // Posição inicial x
        y: (canvas.height / 2) - 200 // Posição inicial y
    }
};

// Carregamento da imagem do chopper
chopper.image.src = "npc/npc_actions.png";
chopper.image.onload = () => {
    chopper.width = chopper.image.width / 2; // Largura de cada frame
    chopper.height = chopper.image.height / 12; // Altura de cada frame
};

// Função para limpar a área ocupada pelo chopper
function clearChopper() {
    ctxsprite.clearRect(
        chopper.position.x - 1, // Margem para evitar sobras
        chopper.position.y - 1,
        chopper.width * 2 + 2, // Limpeza em dobro do tamanho do sprite (com margem)
        chopper.height * 2 + 2
    );
}

// Função para atualizar a animação do chopper
function updateChopperAnimation(currentTime) {
    if (currentTime - chopper.lastFrameTime >= chopper.animationSpeed) {
        chopper.frame = (chopper.frame + 1) % 2; // Alterna entre os frames 0 e 1
        chopper.lastFrameTime = currentTime; // Atualiza o tempo do último frame
    }
}

// Função para desenhar o chopper
function drawChopper() {
    // Limpa a área antes de desenhar
    clearChopper();

    if (chopper.image.complete) {
        ctxsprite.drawImage(
            chopper.image,
            chopper.width * chopper.frame, // Define o frame atual
            chopper.height * 4, // Linha do sprite sheet
            chopper.width, // Largura do frame
            chopper.height, // Altura do frame
            chopper.position.x, // Posição x no canvas
            chopper.position.y, // Posição y no canvas
            chopper.width * 2, // Escala x
            chopper.height * 2 // Escala y
        );
    }
}



//-----------------------------------------------------------------------------
//npc_florist.js

// Definição do objeto florist
const florist = {
    image: new Image(),
    width: 0,
    height: 0,
    frame: 0, // Frame atual (0 ou 1)
    animationSpeed: 2500, // Velocidade da animação (em ms)
    lastFrameTime: 0, // Marca o tempo do último frame
    position: {
        x: (canvas.width / 2) + 447, // Posição inicial x
        y: (canvas.height / 2) - 460 // Posição inicial y
    }
};

// Carregamento da imagem do florist
florist.image.src = "npc/npc_actions.png";
florist.image.onload = () => {
    florist.width = florist.image.width / 2; // Largura de cada frame
    florist.height = florist.image.height / 12; // Altura de cada frame
};

// Função para limpar a área ocupada pelo florist
function clearFlorist() {
    ctxsprite.clearRect(
        florist.position.x - 1, // Margem para evitar sobras
        florist.position.y - 1,
        florist.width * 2 + 2, // Limpeza em dobro do tamanho do sprite (com margem)
        florist.height * 2 + 2
    );
}

// Função para atualizar a animação do florist
function updateFloristAnimation(currentTime) {
    if (currentTime - florist.lastFrameTime >= florist.animationSpeed) {
        florist.frame = (florist.frame + 1) % 2; // Alterna entre os frames 0 e 1
        florist.lastFrameTime = currentTime; // Atualiza o tempo do último frame
    }
}

// Função para desenhar o florist
function drawFlorist() {
    // Limpa a área antes de desenhar
    clearFlorist();

    if (florist.image.complete) {
        ctxsprite.drawImage(
            florist.image,
            florist.width * florist.frame, // Define o frame atual
            florist.height * 11, // Linha do sprite sheet
            florist.width, // Largura do frame
            florist.height, // Altura do frame
            florist.position.x, // Posição x no canvas
            florist.position.y, // Posição y no canvas
            florist.width * 2, // Escala x
            florist.height * 2 // Escala y
        );
    }
}

//-----------------------------------------------------------------------------------------------------------------------------------------------

//npc_miner.js

// Definição do objeto miner
const miner = {
    image: new Image(),
    width: 0,
    height: 0,
    frame: 0, // Frame atual (0 ou 1)
    animationSpeed: 300, // Velocidade da animação (em ms)
    lastFrameTime: 0, // Marca o tempo do último frame
    position: {
        x: (canvas.width / 2) + 750, // Posição inicial x
        y: (canvas.height / 2) + 350 // Posição inicial y
    }
};

// Carregamento da imagem do miner
miner.image.src = "npc/npc_actions.png";
miner.image.onload = () => {
    miner.width = miner.image.width / 2; // Largura de cada frame
    miner.height = miner.image.height / 12; // Altura de cada frame
};

// Função para limpar a área ocupada pelo miner
function clearMiner() {
    ctxsprite.clearRect(
        miner.position.x - 1, // Margem para evitar sobras
        miner.position.y - 1,
        miner.width * 2 + 2, // Limpeza em dobro do tamanho do sprite (com margem)
        miner.height * 2 + 2
    );
}

// Função para atualizar a animação do miner
function updateMinerAnimation(currentTime) {
    if (currentTime - miner.lastFrameTime >= miner.animationSpeed) {
        miner.frame = (miner.frame + 1) % 2; // Alterna entre os frames 0 e 1
        miner.lastFrameTime = currentTime; // Atualiza o tempo do último frame
    }
}

// Função para desenhar o miner
function drawMiner() {
    // Limpa a área antes de desenhar
    clearMiner();

    if (miner.image.complete) {
        ctxsprite.drawImage(
            miner.image,
            miner.width * miner.frame, // Define o frame atual
            miner.height * 0, // Linha do sprite sheet (primeira linha)
            miner.width, // Largura do frame
            miner.height, // Altura do frame
            miner.position.x, // Posição x no canvas
            miner.position.y, // Posição y no canvas
            miner.width * 2, // Escala x
            miner.height * 2 // Escala y
        );
    }
}


//---------------------------------------------------------------------------------------------------

//pig.js

// Definição do objeto pig
const pig = {
    image: new Image(),
    width: 0,
    height: 0,
    frame: 0, // Frame atual (0 ou 1)
    animationSpeed: 300, // Velocidade da animação (em ms)
    lastFrameTime: 0, // Marca o tempo do último frame
    position: {
        x: (canvas.width / 2) - 50, // Posição inicial x
        y: (canvas.height / 2) - 220 // Posição inicial y
    }
};

// Carregamento da imagem do pig
pig.image.src = "npc/pig.png";
pig.image.onload = () => {
    pig.width = pig.image.width / 2; // Largura de cada frame
    pig.height = pig.image.height / 2; // Altura de cada frame
};

// Função para limpar a área ocupada pelo pig
function clearPig() {
    ctxsprite.clearRect(
        pig.position.x - 1, // Margem para evitar sobras
        pig.position.y - 1,
        pig.width * 2.5 + 2, // Limpeza proporcional ao tamanho do sprite
        pig.height * 2.5 + 2
    );
}

// Função para atualizar a animação do pig
function updatePigAnimation(currentTime) {
    if (currentTime - pig.lastFrameTime >= pig.animationSpeed) {
        pig.frame = (pig.frame + 1) % 2; // Alterna entre os frames 0 e 1
        pig.lastFrameTime = currentTime; // Atualiza o tempo do último frame
    }
}

// Função para desenhar o pig
function drawPig() {
    // Limpa a área antes de desenhar
    clearPig();

    if (pig.image.complete) {
        // Desenha o pig com escala ajustada
        ctxsprite.drawImage(
            pig.image,
            pig.width * pig.frame, // Define o frame atual
            0, // Linha do sprite sheet (primeira linha)
            pig.width, // Largura do frame
            pig.height, // Altura do frame
            pig.position.x, // Posição x no canvas
            pig.position.y, // Posição y no canvas
            pig.width * 2.5, // Escala x
            pig.height * 2.5 // Escala y
        );
    }
}
//--------------------------------------------------------------------------------------------------------------------------------------
//Dialogos npc
var dialogueflorist = new Boolean(false);
var dialoguechopper = new Boolean(false);
var dialogueminer = new Boolean(false);
function PositionDialogueFlorist(){
    let fx = florist.position.x;
    let fy = florist.position.y;
    if(fx >=520 && fx <= 660 && fy >=240 && fy <= 300){
        dialogueflorist = true;
    }else{
        dialogueflorist = false;
    }
}
posiçãointerval = setInterval(PositionDialogueFlorist, 1000);

function PositionDialogueChopper(){
    let cx = chopper.position.x;
    let cy = chopper.position.y;
    if(cx >=465 && cx <= 612 && cy >=270 && cy <= 385){
        dialoguechopper = true;
    }else{
        dialoguechopper = false;
    }
}
posiçãointerval = setInterval(PositionDialogueChopper, 1000);

function PositionDialogueminer(){
    let mx = miner.position.x;
    let my = miner.position.y;
    if(mx >=500 && mx <= 615 && my >=260 && my <= 360){
        dialogueminer = true;
    }else{
        dialogueminer = false;
    }
}
posiçãointerval = setInterval(PositionDialogueminer, 1000);
//esqueleto----------------------------------------------------------------------------------------------------------------

// Definição do objeto esqueleto
const esqueleto = {
    image: new Image(),
    width: 0,
    height: 0,
    frame: 0, // Frame atual (0 ou 1)
    animationSpeed: 300, // Velocidade da animação (em ms)
    lastFrameTime: 0, // Marca o tempo do último frame
    position: {
        x: (canvas.width / 2) - 60, // Posição inicial x
        y: (canvas.height / 2) - 100 // Posição inicial y
    }
};

// Carregamento da imagem do esqueleto
esqueleto.image.src = "Cute_Fantasy_Free/Enemies/Skeleton.png";
esqueleto.image.onload = () => {
    esqueleto.width = esqueleto.image.width / 17; // Largura de cada frame
    esqueleto.height = esqueleto.image.height / 9; // Altura de cada frame
};

// Função para limpar a área ocupada pelo esqueleto
function clearesqueleto() {
    ctxsprite.clearRect(
        esqueleto.position.x - 1, // Margem para evitar sobras
        esqueleto.position.y - 1,
        esqueleto.width * 2 + 2, // Limpeza proporcional ao tamanho do sprite
        esqueleto.height * 2 + 2
    );
}

// Função para atualizar a animação do esqueleto
function updateesqueletoAnimation(currentTime) {
    if (currentTime - esqueleto.lastFrameTime >= esqueleto.animationSpeed) {
        esqueleto.frame = (esqueleto.frame + 1) % 2; // Alterna entre os frames 0 e 1
        esqueleto.lastFrameTime = currentTime; // Atualiza o tempo do último frame
    }
}

// Função para desenhar o esqueleto
function drawesqueleto() {
    // Limpa a área antes de desenhar
    clearesqueleto();

    if (esqueleto.image.complete) {
        // Desenha o esqueleto com escala ajustada
        ctxsprite.drawImage(
            esqueleto.image,
            esqueleto.width * esqueleto.frame, // Define o frame atual
            0, // Linha do sprite sheet (primeira linha)
            esqueleto.width, // Largura do frame
            esqueleto.height, // Altura do frame
            esqueleto.position.x, // Posição x no canvas
            esqueleto.position.y, // Posição y no canvas
            esqueleto.width * 2.5, // Escala x
            esqueleto.height * 2.5 // Escala y
        );
    }
}

//--------------------------------------------------------------------------------------------------------------------------------------


const movables = [background, ...bordas, foreground, chopper, florist, miner, pig, esqueleto];

function rectangularCollision({ rectangle1, rectangle2 }) {
    return (
        rectangle1.position.x + rectangle1.width >= rectangle2.position.x && // Colisão pela direita
        rectangle1.position.x <= rectangle2.position.x + rectangle2.width && // Colisão pela esquerda
        rectangle1.position.y <= rectangle2.position.y + rectangle2.height && // Colisão pela parte superior
        rectangle1.position.y + rectangle1.height >= rectangle2.position.y // Colisão pela parte inferior
    );
}

function animate() {
    const currentTime = performance.now(); // Tempo atual em ms
    window.requestAnimationFrame(animate); // Chama a função novamente (loop de animação)
    // Limpa a tela antes de redesenhar tudo
    ctxsprite.clearRect(0, 0, canvas.width, canvas.height);
    background.draw(); // Desenha o fundo
    bordas.forEach(borda => {
        borda.draw();
    });

    player.draw(); // Desenha o personagem
    foreground.draw()

     // NPCs e outros elementos
     updateChopperAnimation(currentTime);
     drawChopper();
 
     updateFloristAnimation(currentTime);
     drawFlorist();
 
     updateMinerAnimation(currentTime);
     drawMiner();
 
     updatePigAnimation(currentTime);
     drawPig();

     updateesqueletoAnimation(currentTime);
     drawesqueleto();
 
    let movendo = true;
    player.movendo = false
    // Movimento para cima (w)

    const speed = 5; // jogar em consts.js quando criar
    if (keys.w.pressed && lastKey === 'w') {
        player.movendo = true
        for (let i = 0; i < bordas.length; i++) {
            const borda = bordas[i];
            if (
                rectangularCollision({
                    rectangle1: player,
                    rectangle2: {
                        ...borda,
                        position: {
                            x: borda.position.x,
                            y: borda.position.y + 5 // Tentando mover o personagem para cima
                        }
                    }
                })
            ) {
                movendo = false; // Se houver colisão, impede o movimento
                break;
            }
        }

        if (movendo) {
            movables.forEach(movable => movable.position.y += speed); // Movimenta para direita
            player.currentDirection = 160; // Moonwalk correcão
        }

    // Movimento para a esquerda (a)
    } else if (keys.a.pressed && lastKey === 'a') {
        player.movendo = true;

        for (let i = 0; i < bordas.length; i++) {
            const borda = bordas[i];
            if (
                rectangularCollision({
                    rectangle1: player,
                    rectangle2: {
                        ...borda,
                        position: {
                            x: borda.position.x + 5,
                            y: borda.position.y
                        }
                    }
                })
            ) {
                movendo = false;
                break;
            }
        }

        if (movendo) {
            movables.forEach(movable => movable.position.x += speed); // Movimenta para a esquerda
            player.currentDirection = 127; // Moonwalk correcão
        }

    // Movimento para baixo (s)
    } else if (keys.s.pressed && lastKey === 's') {
        player.movendo = true;

        for (let i = 0; i < bordas.length; i++) {
            const borda = bordas[i];
            if (
                rectangularCollision({
                    rectangle1: player,
                    rectangle2: {
                        ...borda,
                        position: {
                            x: borda.position.x,
                            y: borda.position.y - 5 // Tentando mover o personagem para baixo
                        }
                    }
                })
            ) {
                movendo = false;
                break;
            }
        }

        if (movendo) {
            movables.forEach(movable => movable.position.y -= speed); // Movimenta para baixo
            player.currentDirection = 96; // Moonwalk correcão
        }

    // Movimento para a direita (d)
    } else if (keys.d.pressed && lastKey === 'd') {
        player.movendo = true;

        for (let i = 0; i < bordas.length; i++) {
            const borda = bordas[i];
            if (
                rectangularCollision({
                    rectangle1: player,
                    rectangle2: {
                        ...borda,
                        position: {
                            x: borda.position.x - 5,
                            y: borda.position.y
                        }
                    }
                })
            ) {
                movendo = false;
                break;
            }
        }

        if (movendo) {
            movables.forEach(movable => movable.position.x -= speed); // Movimenta para a direita
            player.currentDirection = 128; // Moonwalk correcão
        }
    }
}
animate();
//-------------------------------------------------------------------------------------
//movimentacao.js
window.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'w':
            keys.w.pressed = true;
            lastKey = 'w';
            player.currentDirection = 160; // Andar para cima
            player.movendo = true;
            break;
        case 'a':
            keys.a.pressed = true;
            lastKey = 'a';
            player.currentDirection = 127; // Andar para a esquerda
            player.movendo = true;
            break;
        case 's':
            keys.s.pressed = true;
            lastKey = 's';
            player.currentDirection = 96; // Andar para baixo
            player.movendo = true;
            break;
        case 'd':
            keys.d.pressed = true;
            lastKey = 'd';
            player.currentDirection = 128; // Andar para a direita
            player.movendo = true;
            break;
    }
});

window.addEventListener('keyup', (event) => {
    keys[event.key].pressed = false;
    player.movendo = false;

    if (event.key === 'w') player.currentDirection = 64;  // Parado para cima
    if (event.key === 'a') player.currentDirection = 31; // Parado para a esquerda
    if (event.key === 's') player.currentDirection = 0;  // Parado para baixo
    if (event.key === 'd') player.currentDirection = 32;  // Parado para a direita
});