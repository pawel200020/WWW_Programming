const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')
canvas.width = innerWidth - 25
canvas.height = innerHeight - 25
const score = document.querySelector('#score')

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
        this.opacity = 1

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
            c.globalAlpha = this.opacity
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
    constructor({ position, velocity, radius, color, fades }) {
        this.position = position
        this.velocity = velocity
        this.radius = radius
        this.color = color
        this.opacity = 1
        this.fades = fades
    }
    draw() {
        c.save()
        c.globalAlpha = this.opacity
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
        if (this.fades) {
            this.opacity -= 0.01
        }

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
    constructor(columns, rows, invaderPath) {
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
                this.invaders.push(new Invader(invaderPath, { position: { x: i * 30, y: j * 30 } }))
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

    const playerImagePath = 'models/spaceship.png'
    const invaderImagePath = 'models/invader.png'
    const player = new Player(playerImagePath)
    const bullets = []
    const grids = []
    const invBullets = []
    const particles = []
    let frames = 0
    let scorep = 0
    let game = {
        over: false,
        active: true
    }
    let keys = {
        ArrowLeft: {
            pressed: false
        },
        ArrowRight: {
            pressed: false
        },

    }

    function createParticles({ object, color, quantity, fades }) {
        for (let i = 0; i < quantity; i++) {
            if (object) {
                particles.push(new Particle({
                    position: {
                        x: object.position.x + object.width / 2,
                        y: object.position.y + object.height / 2
                    },
                    velocity: {
                        x: (Math.random() - 0.5) * 2,
                        y: (Math.random() - 0.5) * 2
                    },
                    radius: Math.random() * 2,
                    color: color || 'white',
                    fades: fades
                }))
            } else {
                particles.push(new Particle({
                    position: {
                        x: Math.random() * canvas.width,
                        y: Math.random() * canvas.height
                    },
                    velocity: {
                        x: 0,
                        y: 0.5
                    },
                    radius: Math.random() * 2,
                    color: color || 'white',
                    fades: fades
                }))
            }

        }
    }
    let change = Math.floor((Math.random() * 500) + 500)
    createParticles({ quantity: 100 })

    function animate() {
        if (!game.active) return
        requestAnimationFrame(animate)
        c.fillStyle = 'black'
        c.fillRect(0, 0, canvas.width, canvas.height)
        player.update()
        particles.forEach((particle, i) => {
            if (particle.position.y - particle.radius >= canvas.height) {
                particle.position.x = Math.random() * canvas.width
                particle.position.y = Math.random() * canvas.height
            }
            if (particle.opacity <= 0) {
                setTimeout(() => {
                    particles.splice(i, 1)
                }, 0)

            } else {
                particle.update()
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
                    setTimeout(() => {
                        invBullets.splice(i, 1)
                        player.opacity = 0
                        game.over = true
                    }, 0)
                    setTimeout(() => {
                        game.active = false
                    }, 1000)
                    createParticles({
                        object: player,
                        color: 'red',
                        fades: true,
                        quantity: 15
                    })

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
                        const invaderFound = grid.invaders.find(invader2 => invader2 === invader)
                        const bulledFound = bullets.find((bullet2) => bullet2 === bullet)
                        if (invaderFound && bulledFound) {
                            createParticles({
                                object: invader,
                                color: 'white',
                                fades: true,
                                quantity: 15
                            })
                            scorep += 1
                            score.innerHTML = scorep


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
                        }

                    }
                })
            })
        })
        if (frames % change === 0) {
            grids.push(new Grid(Math.random() * 10 + 4, Math.random() * 5 + 4, invaderImagePath))
            change = Math.floor((Math.random() * 500) + 800)
            frames = 0
        }



        frames++
    }
    animate()
    addEventListener('keydown', ({ key }) => {
        if (game.over) return
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
        if (game.over) return
        switch (key) {
            case 'ArrowLeft':

                keys.ArrowLeft.pressed = false
                break
            case 'ArrowRight':
                keys.ArrowRight.pressed = false
                break
        }
    })
})