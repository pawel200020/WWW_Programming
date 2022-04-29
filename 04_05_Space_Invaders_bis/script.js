const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')
canvas.width = innerWidth - 25
canvas.height = innerHeight - 25

class Invader {
    constructor(path, { position }) {

        this.velocity = {
            x: 0,
            y: 0
        }
        var image = new Image()
        image.src = path
        image.onload = () => {
            this.image = image
            this.width = image.width
            this.height = image.height
            this.position = {
                x: position.x,
                y: position.y
            }
        }

    }

    draw() {
        if (this.image) {
            c.drawImage(this.image, this.position.x, this.position.y, this.width, this.height)
        }


    }
    update({ velocity }) {
        if (this.image) {
            this.draw()
            this.position.x += velocity.x
            this.position.y += velocity.y
        }
    }
    shoot(invBullets) {
        invBullets.push(new INVBullet({
                position: {
                    x: this.position.x + this.width / 2,
                    y: this.position.y + this.height
                },
                velocity: {
                    x: 0,
                    y: 5
                }
            }


        ))
    }
}


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

class Particle {
    constructor({ position, velocity, radius, color }) {
        this.position = position
        this.velocity = velocity
        this.radius = radius
        this.color = color
        this.capacity = 1
    }
    draw() {
        c.save()
        c.globalAlpha = this.capacity
        c.beginPath()
        c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2)
        c.fillStyle = this.color
        c.fill()
        c.closePath()
        c.restore()
    }
    update() {
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
        this.capacity -= 0.05
    }
}

class Bullet {
    constructor({ position, velocity }) {
        this.position = position
        this.velocity = velocity
        this.radius = 5
    }
    draw() {
        c.beginPath()
        c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2)
        c.fillStyle = 'red'
        c.fill()
        c.closePath()
    }
    update() {
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
    }
}

class INVBullet {
    constructor({ position, velocity }) {
        this.position = position
        this.velocity = velocity
        this.width = 3
        this.height = 10
    }
    draw() {
        c.fillStyle = 'white'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)

    }
    update() {
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
    }
}

class Grid {
    constructor(columns, rows) {
        this.position = {
            x: 0,
            y: 0
        }
        this.velocity = {
            x: 3,
            y: 0
        }

        this.invaders = []
        this.width = columns * 30
        for (let j = 0; j < rows; j++) {
            for (let i = 0; i < columns; i++) {
                this.invaders.push(new Invader('models/invader.png', { position: { x: i * 30, y: j * 30 } }))
            }
        }


    }
    update() {
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
        this.velocity.y = 0
        if (this.position.x + this.width >= canvas.width || this.position.x < 0) {
            this.velocity.x = -this.velocity.x
            this.velocity.y = 30
        }
    }
}
$(function() {


    const player = new Player('models/spaceship.png')
    let keys = {
        ArrowLeft: {
            pressed: false
        },
        ArrowRight: {
            pressed: false
        },

    }
    const bullets = []
    const grids = []
    const invBullets = []
    const particles = []
    let frames = 0
    let change = Math.floor((Math.random() * 500) + 500)

    function animate() {
        requestAnimationFrame(animate)
        c.fillStyle = 'black'
        c.fillRect(0, 0, canvas.width, canvas.height)
            //invader.update()
        player.update()
        particles.forEach((particle, i) => {
            particle.update()
            if (particle.capacity <= 0) {
                setTimeout(() => {
                    particles.splice(i, 1)
                }, 0)

            }
        })
        invBullets.forEach((invBullet, i) => {
            if (invBullet.position.y + invBullet.height > canvas.height) {
                setTimeout(() => {
                    invBullets.splice(i, 1)
                })
            } else {
                if (invBullet.position.y + invBullet.height >= player.position.y &&
                    invBullet.position.x + invBullet.width >= player.position.x &&
                    invBullet.position.x <= player.position.x + player.width) {
                    console.log("lost")
                }
            }
            invBullet.update()
        })
        if (keys.ArrowLeft.pressed && player.position.x >= 0) {
            player.velocity.x = -5
            player.rotation = -0.15
        } else if (keys.ArrowRight.pressed && player.position.x <= canvas.width - player.width) {
            player.velocity.x = 5
            player.rotation = 0.15

        } else {
            player.velocity.x = 0
            player.rotation = 0
        }
        bullets.forEach((bullet, index) => {
            if (bullet.position.y < 0) {
                bullets.splice(index, 1)
            } else {
                bullet.update()
            }
        })
        grids.forEach((grid, gridIndex) => {
            grid.update()
            if (frames % 100 === 0 && grid.invaders.length > 0) {
                grid.invaders[Math.floor(Math.random() * grid.invaders.length)].shoot(invBullets)
            }
            grid.invaders.forEach((invader, i) => {
                invader.update({ velocity: grid.velocity })


                bullets.forEach((bullet, j) => {
                    if (bullet.position.y - bullet.radius <= invader.position.y + invader.height &&
                        bullet.position.x - bullet.radius >= invader.position.x &&
                        bullet.position.x - bullet.radius <= invader.position.x + invader.width &&
                        bullet.position.y + bullet.radius >= invader.position.y) {
                        //const invaderFound = grid.invaders.find(invader2 => invader2 === invader)
                        //const bulledFound = bullets.find((bullet2) => bullet2 === bullet)
                        // if (invaderFound && bulledFound) {
                        for (let i = 0; i < 15; i++) {
                            particles.push(new Particle({
                                position: {
                                    x: invader.position.x + invader.width / 2,
                                    y: invader.position.y + invader.height / 2
                                },
                                velocity: {
                                    x: Math.random() - 0.5 * 2,
                                    y: Math.random() - 0.5 * 2
                                },
                                radius: Math.random() + 2,
                                color: 'yellow'
                            }))
                        }

                        setTimeout(() => {
                                grid.invaders.splice(i, 1)
                                bullets.splice(j, 1)
                                if (grid.invaders.length > 0) {
                                    const firstInvader = grid.invaders[0]
                                    const lastInvader = grid.invaders[grid.invaders.length - 1]
                                    grid.width = -firstInvader.position.x + lastInvader.position.x + lastInvader.width
                                    grid.position.x = firstInvader.position.x
                                } else {
                                    grid.splice(gridIndex, 1)
                                }
                            }, 0)
                            //}

                    }
                })
            })
        })
        if (frames % change === 0) {
            grids.push(new Grid(Math.random() * 10 + 4, Math.random() * 5 + 4))
            change = Math.floor((Math.random() * 500) + 800)
            frames = 0
        }



        frames++
    }
    animate()
    addEventListener('keydown', ({ key }) => {
        switch (key) {
            case 'ArrowLeft':

                keys.ArrowLeft.pressed = true
                break
            case 'ArrowRight':
                keys.ArrowRight.pressed = true
                break
            case ' ':
                bullets.push(new Bullet({ position: { x: player.position.x + player.width / 2, y: player.position.y }, velocity: { x: 0, y: -10 } }))
                break
        }
    })
    addEventListener('keyup', ({ key }) => {
            switch (key) {
                case 'ArrowLeft':

                    keys.ArrowLeft.pressed = false
                    break
                case 'ArrowRight':
                    keys.ArrowRight.pressed = false
                    break
            }
        })
        // $(document).keydown(function(e) {
        //     if (e.which === 39 && e.which == 32) {
        //         if (player.position.x <= canvas.width - player.width) {
        //             player.velocity.x = 5
        //             player.rotation = 0.15
        //             bullets.push(new Bullet({ position: { x: player.position.x + player.width / 2, y: player.position.y }, velocity: { x: 0, y: -5 } }))
        //         }

    //     }
    //     if (e.which === 37) {
    //         if (player.position.x > 0) {
    //             player.velocity.x = -8
    //             player.rotation = -0.15
    //         }

    //     }
    //     if (e.which === 39) {
    //         if (player.position.x <= canvas.width - player.width) {
    //             player.velocity.x = 8
    //             player.rotation = 0.15
    //         }

    //     }
    //     if (e.which == 32) {
    //         bullets.push(new Bullet({ position: { x: player.position.x + player.width / 2, y: player.position.y }, velocity: { x: 0, y: -5 } }))
    //     }

    // });
})