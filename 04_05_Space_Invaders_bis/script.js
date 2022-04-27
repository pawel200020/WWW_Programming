const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')
canvas.width = innerWidth - 25
canvas.height = innerHeight - 25

class Player {
    constructor(path) {

        this.velocity = {
            x: 0,
            y: 0
        }
        this.rotation = 0
        var image = new Image()
        image.src = path
        image.onload = () => {
            this.image = image
            this.width = image.width / 6
            this.height = image.height / 6
            this.position = {
                x: canvas.width / 2,
                y: canvas.height - 60
            }
        }

    }

    draw() {
        if (this.image) {
            c.save()
            c.translate(this.position.x + this.width / 2, this.position.y + this.height / 2)
            c.rotate(this.rotation)
            c.translate(-this.position.x - this.width / 2, -this.position.y - this.height / 2)
            c.drawImage(this.image, this.position.x, this.position.y, this.width, this.height)
            c.restore()
        }


    }
    update() {
        if (this.image) {
            this.draw()
            this.position.x += this.velocity.x
        }
    }
}
$(function() {
    const player = new Player('models/spaceship.png')

    function animate() {
        requestAnimationFrame(animate)
        c.fillStyle = 'black'
        c.fillRect(0, 0, canvas.width, canvas.height)
        player.update()
        player.velocity.x = 0
        player.rotation = 0
    }
    animate()
    $(document).keydown(function(e) {
        if (e.which === 37) {
            if (player.position.x > 0) {
                player.velocity.x = -5
                player.rotation = -0.15
            }

        }
        if (e.which === 39) {
            if (player.position.x <= canvas.width - player.width) {
                player.velocity.x = 5
                player.rotation = 0.15
            }

        }

    });
});