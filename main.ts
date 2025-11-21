//sprites && variable setup.go
let bob: Sprite = null 
let blast: Sprite = null 
let enemyBlast: Sprite = null 
let enemyBlast2: Sprite = null
let alien: Sprite = null 
let npc: Sprite = null
let coinIcon: Sprite = null
let bigAlien: Sprite = null 
let bro: Sprite = null

let blasterVelocityX = 0 
let blasterVelocityY = 200
let keys = 2
let bossFight1 = false
let bossFight2 = false
let aliensOnScreen = 0
let blasterType = 1
let bootsType = 1
let deleteSprites = false
let monkeyCollected = 0
let monkeyQuest = 0
let gameOverTimer = 0
let monkeyCompanion = false
let roboBossActivate = false
let cell1 = false
let cell2 = false
let cell3 = false 
let cell4 = false
let cell5 = false
let test = 0
let level = 1
let enemyDirection = "below"
let inRangeOfBro = false
let leverPuzzleSolved = false
let leverFlip = 1
let correctOrder1 = false
let correctOrder2 = false
let correctOrder3 = false
let correctOrder4 = false
let correctOrder5 = false





namespace SpriteKind{
    export const EnemyProjectile = SpriteKind.create()
    export const NonPlayable = SpriteKind.create()
    export const Chest = SpriteKind.create()
    export const HealthChest = SpriteKind.create()
    export const BigAlien = SpriteKind.create()
    export const Gate = SpriteKind.create()
    export const Key = SpriteKind.create()
    export const Coin = SpriteKind.create()
    export const ShopHeart = SpriteKind.create()
    export const BootsUpgrade = SpriteKind.create()
    export const BlasterUpgrade = SpriteKind.create()
    export const Portal = SpriteKind.create()
    export const Monkey = SpriteKind.create()
    export const Companion = SpriteKind.create()
    export const Cell = SpriteKind.create()
    export const BigRobo = SpriteKind.create()
    export const SubtractHealth = SpriteKind.create()
    export const RandHealth = SpriteKind.create()
    export const Lever = SpriteKind.create()
    
}   

info.setLife(20)
info.setBackgroundColor(15)
info.setBorderColor(15)
info.setFontColor(1)
coinIcon = sprites.create(assets.image`coin`)
coinIcon.setPosition(135, 5)
coinIcon.setFlag(SpriteFlag.RelativeToCamera, true)
info.setScore(10)

//gameOver(Sorry Bob...)
info.onLifeZero(function() {
    
    animation.runImageAnimation(bob, assets.animation`Bobdied`, 300, false)
    startGameOverTimer()
    game.onUpdate(function(){
        if(gameOverTimer > 4){
            game.over()
        }
    })  
    //game.over()
})

function startGameOverTimer(){
    game.onUpdateInterval(300, function(){
        gameOverTimer++
    })
}


//controller setup
bob = sprites.create(assets.image`bob`, SpriteKind.Player)
controller.moveSprite(bob)
scene.cameraFollowSprite(bob)
bob.z = 10



//blaster 
controller.A.onEvent(ControllerButtonEvent.Pressed, function (){
    blast = sprites.createProjectileFromSprite(img`
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . 9 9 9 9 . . . . . .
        . . . . . 9 9 2 2 9 9 . . . . .
        . . . . . 9 2 2 2 2 9 . . . . .
        . . . . . 9 2 2 2 2 9 . . . . .
        . . . . . 9 9 2 2 9 9 . . . . .
        . . . . . . 9 9 9 9 . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
    `, bob, blasterVelocityX, blasterVelocityY)
    music.pewPew.play()
    if(blasterType == 2){
        let blast2 = sprites.createProjectileFromSprite(img`
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . 9 9 9 9 . . . . . .
        . . . . . 9 9 2 2 9 9 . . . . .
        . . . . . 9 2 2 2 2 9 . . . . .
        . . . . . 9 2 2 2 2 9 . . . . .
        . . . . . 9 9 2 2 9 9 . . . . .
        . . . . . . 9 9 9 9 . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
    `, bob, blasterVelocityX * -1, blasterVelocityY * -1)
    }
})
 
//aiming
game.onUpdate(function(){
    //up
    if(controller.up.isPressed()){
        blasterVelocityY = -200
        blasterVelocityX  = 0
        //angles
        if(controller.left.isPressed()){
            blasterVelocityX = -200
        } 
        if(controller.right.isPressed()) {
            blasterVelocityX = 200
        }
    }
    //down
    if (controller.down.isPressed()) {
        blasterVelocityY = 200
        blasterVelocityX = 0 
        //angles
        if (controller.left.isPressed()) {
            blasterVelocityX = -200
        }
        if (controller.right.isPressed()) {
            blasterVelocityX = 200
        }

    }
    //left
    if (controller.left.isPressed()) {
        blasterVelocityY = 0
        blasterVelocityX = -200
        //angles
        if (controller.up.isPressed()) {
            blasterVelocityY = -200
        }
        if (controller.down.isPressed()) {
            blasterVelocityY = 200
        }
    }
    
    //right 
    if (controller.right.isPressed()) {
        blasterVelocityY = 0 
        blasterVelocityX = 200
        //angles
        if (controller.up.isPressed()) {
            blasterVelocityY = -200
        }
        if (controller.down.isPressed()) {
            blasterVelocityY = 200
        }

    }

})

//spawnFunctions

    //alien 
    function spawnAlien(xPos: number, yPos: number, movement: number){
        let alien = sprites.create(assets.image`alien`, SpriteKind.Enemy)
        aliensOnScreen++
        alien.setPosition(xPos * 16, yPos * 16) 
        let enemyBlastX = 0 
        let enemyBlastY = -200
        let enemyAlive = true 
        let enemyMoveX = 0
        let enemyMoveY = 0
        let movementSequence = 1
        
        alien.onDestroyed(function() {
            enemyAlive = false 
            aliensOnScreen--
            //enemyDropsYummyItems
            let dropChance = Math.randomRange(0, 100)
            if(dropChance <= 45){
                let drop = Math.pickRandom([1, 2])
                if(drop == 1){
                    //spawn💗
                    let heart: Sprite = sprites.create(img`
                . . . . . . . . . . . . . . . .
                . . f f f f f f . f f f f f f .
                . f f 3 3 3 3 f f f 3 3 3 3 f f
                . f 3 3 3 3 3 3 f 3 3 3 3 3 3 f
                . f 3 3 3 3 3 3 3 3 1 1 1 3 3 f
                . f 3 3 3 3 3 3 3 3 1 1 1 3 3 f
                . f 3 3 3 3 3 3 3 3 1 1 1 3 3 f
                . f 3 3 3 3 3 3 3 3 3 3 3 3 3 f
                . f f 3 3 3 3 3 3 3 3 3 3 3 f f
                . . f f 3 3 3 3 3 3 3 3 3 f f .
                . . . f f 3 3 3 3 3 3 3 f f . .
                . . . . f f 3 3 3 3 3 f f . . .
                . . . . . f f 3 3 3 f f . . . .
                . . . . . . f f 3 f f . . . . .
                . . . . . . . f f f . . . . . .
                . . . . . . . . . . . . . . . .
                    `, SpriteKind.Food)
                    heart.setPosition(alien.x, alien.y)
                    //deleteSprites
                    game.onUpdate(function () {
                        if (deleteSprites == true) {
                            heart.destroy()
                        }
                    })
                }else{
                    let coin: Sprite = sprites.create(assets.image`coin`, SpriteKind.Coin)
                    coin.setPosition(alien.x, alien.y)
                    //deleteSprites
                    game.onUpdate(function () {
                        if (deleteSprites == true) {
                            coin.destroy()
                        }
                    })
                    
                }
            }
        })
        //alienblaster 
        game.onUpdateInterval(1200, function () {
            if (enemyAlive == true && Math.abs(bob.x - alien.x) <= 70 && Math.abs(bob.y - alien.y)<= 70){
                inRangeOfBro = true
                if (Math.abs(bob.x - alien.x) <= 70 && Math.abs(bob.y - alien.y) <= 70){
                    if(bob.x < (alien.x + 20) && bob.x > (alien.x - 20) && bob.y > alien.y){
                        enemyBlastX = 0 
                        enemyBlastY = 200
                        enemyDirection = "above"
                    }
                }
                if (Math.abs(bob.x - alien.x) <= 70 && Math.abs(bob.y - alien.y) <= 70) {
                    if (bob.x < (alien.x + 20) && bob.x > (alien.x - 20) && bob.y < alien.y) {
                        enemyBlastX = 0
                        enemyBlastY = -200
                        enemyDirection = "below"
                    }
                } 
                if (Math.abs(bob.x - alien.x) <= 70 && Math.abs(bob.y - alien.y) <= 70) {
                    if (bob.y < (alien.y + 20) && bob.y > (alien.y - 20) && bob.x > alien.x) {
                        enemyBlastX = 200
                        enemyBlastY = 0
                        enemyDirection = "left"
                    }
                }
                if (Math.abs(bob.x - alien.x) <= 70 && Math.abs(bob.y - alien.y) <= 70) {
                    if (bob.y < (alien.y + 20) && bob.y > (alien.y - 20) && bob.x < alien.x) {
                        enemyBlastX = -200
                        enemyBlastY = 0
                        enemyDirection = "right"
                    }
                }   
                //angles2
                if(bob.x <= (alien.x - 20) && bob.y <= (alien.y - 20)){
                    enemyBlastX = -200
                    enemyBlastY = -200
                    enemyDirection = "bottomRight"
                }
                if (bob.x >= (alien.x + 20) && bob.y <= (alien.y - 20)) {
                    enemyBlastX = 200
                    enemyBlastY = -200
                    enemyDirection = "bottomLeft"
                }
                if (bob.x <= (alien.x - 20) && bob.y >= (alien.y + 20)) {
                    enemyBlastX = -200
                    enemyBlastY =  200
                    enemyDirection = "topRight"
                }
                if (bob.x >= (alien.x + 20) && bob.y >= (alien.y + 20)) {
                    enemyBlastX = 200
                    enemyBlastY = 200
                    enemyDirection = "topLeft"
                }

                //projectileForAlien
                enemyBlast = sprites.createProjectileFromSprite(img`
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . 5 5 5 5 5 . . . . .
                    . . . . . . 5 7 7 7 5 . . . . .
                    . . . . . . 5 7 7 7 5 . . . . .
                    . . . . . . 5 7 7 7 5 . . . . .
                    . . . . . . 5 5 5 5 5 . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                `, alien, enemyBlastX, enemyBlastY)
                enemyBlast.setKind(SpriteKind.EnemyProjectile)
                music.knock.play()
            }
            else{
                inRangeOfBro = false
            }
        })
        //movement
        if(movement == 1){
            enemyMoveX = 20
        }
        game.onUpdateInterval(4000, function(){
            if(movement == 1){
                alien.setVelocity(enemyMoveX, enemyMoveY)
                enemyMoveX = enemyMoveX * -1
            }
            if(movement == 2){
                alien.setVelocity(Math.pickRandom([-20, 0, 20]), Math.pickRandom([-20, 0, 20]))
            }
        })  
        //deleteSprites
        game.onUpdate(function(){
            if(deleteSprites == true){
                alien.destroy()
                enemyAlive = false
            }
        })

    }

    //2nd-area-alien 
    function spawnAlien2(xPos: number, yPos: number, movement: number) {
        let alien= sprites.create(assets.image`robo`, SpriteKind.Enemy)
        aliensOnScreen++
        alien.setPosition(xPos * 16, yPos * 16)
        let enemyBlastX = 0
        let enemyBlastY = -200
        let enemyAlive = true
        let enemyMoveX = 0
        let enemyMoveY = 0
        let enemyBlast2X = 0
        let enemyBlast2Y = -200
        
        let movementSequence = 1

        alien.onDestroyed(function () {
            enemyAlive = false
            aliensOnScreen--
            //enemyDropsYummyItems
            let dropChance = Math.randomRange(0, 100)
            if (dropChance <= 45) {
                let drop = Math.pickRandom([1, 2])
                if (drop == 1) {
                    //spawn💗
                    let heart: Sprite = sprites.create(img`
                    . . . . . . . . . . . . . . . .
                    . . f f f f f f . f f f f f f .
                    . f f 3 3 3 3 f f f 3 3 3 3 f f
                    . f 3 3 3 3 3 3 f 3 3 3 3 3 3 f
                    . f 3 3 3 3 3 3 3 3 1 1 1 3 3 f
                    . f 3 3 3 3 3 3 3 3 1 1 1 3 3 f
                    . f 3 3 3 3 3 3 3 3 1 1 1 3 3 f
                    . f 3 3 3 3 3 3 3 3 3 3 3 3 3 f
                    . f f 3 3 3 3 3 3 3 3 3 3 3 f f
                    . . f f 3 3 3 3 3 3 3 3 3 f f .
                    . . . f f 3 3 3 3 3 3 3 f f . .
                    . . . . f f 3 3 3 3 3 f f . . .
                    . . . . . f f 3 3 3 f f . . . .
                    . . . . . . f f 3 f f . . . . .
                    . . . . . . . f f f . . . . . .
                    . . . . . . . . . . . . . . . .
                        `, SpriteKind.Food)
                    heart.setPosition(alien.x, alien.y)
                    //deleteSprites
                    game.onUpdate(function () {
                        if (deleteSprites == true) {
                            heart.destroy()
                        }
                    })
                } else {
                    let coin: Sprite = sprites.create(assets.image`coin`, SpriteKind.Coin)
                    coin.setPosition(alien.x, alien.y)
                    //deleteSprites
                    game.onUpdate(function () {
                        if (deleteSprites == true) {
                            coin.destroy()
                        }
                    })

                }
            }
        })
        //alienBlaster()
        game.onUpdateInterval(1200, function () {
            if (enemyAlive == true && Math.abs(bob.x - alien.x) <= 70 && Math.abs(bob.y - alien.y) <= 70) {
                if (Math.abs(bob.x - alien.x) <= 70 && Math.abs(bob.y - alien.y) <= 70) {
                    if (bob.x < (alien.x + 20) && bob.x > (alien.x - 20) && bob.y > alien.y) {
                        enemyBlastX = 30
                        enemyBlastY = 200
                        enemyBlast2X = -30
                        enemyBlast2Y = 200
                        enemyDirection = "above"
                    }
                }
                if (Math.abs(bob.x - alien.x) <= 70 && Math.abs(bob.y - alien.y) <= 70) {
                    if (bob.x < (alien.x + 20) && bob.x > (alien.x - 20) && bob.y < alien.y) {
                        enemyBlastX = 30
                        enemyBlastY = -200
                        enemyBlast2X = -30
                        enemyBlast2Y = -200
                        enemyDirection = "below"
                    }
                }
                if (Math.abs(bob.x - alien.x) <= 70 && Math.abs(bob.y - alien.y) <= 70) {
                    if (bob.y < (alien.y + 20) && bob.y > (alien.y - 20) && bob.x > alien.x) {
                        enemyBlastX = 200
                        enemyBlastY = 30
                        enemyBlast2X = 200
                        enemyBlast2Y = -30
                        enemyDirection = "left"

                    }
                }
                if (Math.abs(bob.x - alien.x) <= 70 && Math.abs(bob.y - alien.y) <= 70) {
                    if (bob.y < (alien.y + 20) && bob.y > (alien.y - 20) && bob.x < alien.x) {
                        enemyBlastX = -200
                        enemyBlastY = 30
                        enemyBlast2X = -200
                        enemyBlast2Y = -30
                        enemyDirection = "right"
                    }
                }
                //angles2
                if (bob.x <= (alien.x - 20) && bob.y <= (alien.y - 20)) {
                    enemyBlastX = -200
                    enemyBlastY = -170
                    enemyBlast2X = -200
                    enemyBlast2Y = -230
                    enemyDirection = "bottomRight"
                }
                if (bob.x >= (alien.x + 20) && bob.y <= (alien.y - 20)) {
                    enemyBlastX = 200
                    enemyBlastY = -200
                    enemyBlast2X = 200
                    enemyBlast2Y = -230
                    enemyDirection = "bottomLeft"
                }
                if (bob.x <= (alien.x - 20) && bob.y >= (alien.y + 20)) {
                    enemyBlastX = -200
                    enemyBlastY = 200
                    enemyBlast2X = -200
                    enemyBlast2Y = 230
                    enemyDirection = "topRight"
                }
                if (bob.x >= (alien.x + 20) && bob.y >= (alien.y + 20)) {
                    enemyBlastX = 200
                    enemyBlastY = 200
                    enemyBlast2X = 200
                    enemyBlast2Y = 230
                    enemyDirection = "topLeft"
                }

                //projectileForAlien
                enemyBlast = sprites.createProjectileFromSprite(img`
                        . . . . . . . . . . . . . . . .
                        . . . . . . . . . . . . . . . .
                        . . . . . . . . . . . . . . . .
                        . . . . . . . . . . . . . . . .
                        . . . . . . . . . . . . . . . .
                        . . . . . . 5 5 5 5 5 . . . . .
                        . . . . . . 5 7 7 7 5 . . . . .
                        . . . . . . 5 7 7 7 5 . . . . .
                        . . . . . . 5 7 7 7 5 . . . . .
                        . . . . . . 5 5 5 5 5 . . . . .
                        . . . . . . . . . . . . . . . .
                        . . . . . . . . . . . . . . . .
                        . . . . . . . . . . . . . . . .
                        . . . . . . . . . . . . . . . .
                        . . . . . . . . . . . . . . . .
                        . . . . . . . . . . . . . . . .
                    `, alien, enemyBlastX, enemyBlastY)
                enemyBlast.setKind(SpriteKind.EnemyProjectile)
                enemyBlast2 = sprites.createProjectileFromSprite(img`
                        . . . . . . . . . . . . . . . .
                        . . . . . . . . . . . . . . . .
                        . . . . . . . . . . . . . . . .
                        . . . . . . . . . . . . . . . .
                        . . . . . . . . . . . . . . . .
                        . . . . . . 5 5 5 5 5 . . . . .
                        . . . . . . 5 7 7 7 5 . . . . .
                        . . . . . . 5 7 7 7 5 . . . . .
                        . . . . . . 5 7 7 7 5 . . . . .
                        . . . . . . 5 5 5 5 5 . . . . .
                        . . . . . . . . . . . . . . . .
                        . . . . . . . . . . . . . . . .
                        . . . . . . . . . . . . . . . .
                        . . . . . . . . . . . . . . . .
                        . . . . . . . . . . . . . . . .
                        . . . . . . . . . . . . . . . .
                    `, alien, enemyBlast2X, enemyBlast2Y)
                enemyBlast2.setKind(SpriteKind.EnemyProjectile)
                music.knock.play()
            }
        })
        //movement
        if (movement == 1) {
            enemyMoveX = 20
        }
        game.onUpdateInterval(4000, function () {
            if (movement == 1) {
                alien.setVelocity(enemyMoveX, enemyMoveY)
                enemyMoveX = enemyMoveX * -1
            }
            if (movement == 2) {
                alien.setVelocity(Math.pickRandom([-20, 0, 20]), Math.pickRandom([-20, 0, 20]))
            }
        })
        //deleteSprites
        game.onUpdate(function () {
            if (deleteSprites == true) {
                alien.destroy()
                enemyAlive = false
            }
        })

    }
    

    //npc
    function spawnNPC(xPos: number, yPos: number, costume: number){
        let npc = sprites.create(assets.image`bobs friend`, SpriteKind.NonPlayable)
        npc.setPosition(xPos * 16, yPos * 16)
        //shopKeeperCostume
        if(costume == 2){
            npc.setImage(assets.image`shopHelper`)
        }
        //gateGuyCostume!
        if(costume == 3){
            npc.setImage(assets.image`doog`)
        }
        //shop2costume.
        if(costume == 5){
            npc.setImage(assets.image`finalNPC`)
        }
        //row_of_monkeys
        if(costume == 4){
            npc.setKind(SpriteKind.Monkey)
            npc.setImage(img`
                . . . . . . . f f f f f . . . .
                . . . . . . f e e e e e f . . .
                . . . . . f e e e d d d d f . .
                . . . . f f e e d f d d f d c .
                . . . f d d e e d f d d f d c .
                . . . c d b e e d d d d e e d c
                f f . c d b e e d d c d d d d c
                f e f . c f e e d d d c c c c c
                f e f . . f f e e d d d d d f .
                f e f . f e e e e f f f f f . .
                f e f f e e e e e e e f . . . .
                . f f e e e e f e f f e f . . .
                . . f e e e e f e f f e f . . .
                . . . f e f f b d f b d f . . .
                . . . f d b b d d c d d f . . .
                . . . f f f f f f f f f . . . .
            `)
        }
        //tourGuide
        if(costume == 6){
            npc.setImage(assets.image`Tourrr GUiiide`)
        }
        //startTourGuide
        if(costume == 7){
            npc.setImage(assets.image`good_ol_man`)
        }

        //monkeyTamer
        if(costume == 8){
            npc.setImage(img`
                . . . . . . . c c c . . . . . .
                . . . . . . c b 5 c . . . . . .
                . . . . c c c 5 5 c c c . . . .
                . . c c b c 5 5 5 5 c c c c . .
                . c b b 5 b 5 5 5 5 b 5 b b c .
                . c b 5 5 b b 5 5 b b 5 5 b c .
                . . f 5 5 5 b b b b 5 5 5 c . .
                . . f f 5 5 5 5 5 5 5 5 f f . .
                . . f f f b f e e f b f f f . .
                . . f f f 1 f b b f 1 f f f . .
                . . . f f b b b b b b f f . . .
                . . . e e f e e e e f e e . . .
                . . e b c b 5 b b 5 b f b e . .
                . . e e f 5 5 5 5 5 5 f e e . .
                . . . . c b 5 5 5 5 b c . . . .
                . . . . . f f f f f f . . . . .
            `)
        }
        //3rdareanpcs_markedbysand
        if(costume == 9){
            npc.setImage(img`
                . . . . . . f f f f . . . . . .
                . . . . f f f 2 2 f f f . . . .
                . . . f f f 2 2 2 2 f f f . . .
                . . f f f e e e e e e f f f . .
                . . f f e 2 2 2 2 2 2 e e f . .
                . . f e 2 f f f f f f 2 e f . .
                . . f f f f e e e e f f f f . .
                . f f e f b f 4 4 f b f e f f .
                . f e e 4 1 f d d f 1 4 e e f .
                . . f e e d d d d d d e e f . .
                . . . f e e 4 4 4 4 e e f . . .
                . . e 4 f 2 2 2 2 2 2 f 4 e . .
                . . 4 d f 2 2 2 2 2 2 f d 4 . .
                . . 4 4 f 4 4 5 5 4 4 f 4 4 . .
                . . . . . f f f f f f . . . . .
                . . . . . f f . . f f . . . . .
            `)
            npc.say("Welcome to Condrum City! Have fun!")
            
        }

        if(costume == 10){
            npc.setImage(img`
                . . . . . . 5 . 5 . . . . . . .
                . . . . . f 5 5 5 f f . . . . .
                . . . . f 1 5 2 5 1 6 f . . . .
                . . . f 1 6 6 6 6 6 1 6 f . . .
                . . . f 6 6 f f f f 6 1 f . . .
                . . . f 6 f f d d f f 6 f . . .
                . . f 6 f d f d d f d f 6 f . .
                . . f 6 f d 3 d d 3 d f 6 f . .
                . . f 6 6 f d d d d f 6 6 f . .
                . f 6 6 f 3 f f f f 3 f 6 6 f .
                . . f f d 3 5 3 3 5 3 d f f . .
                . . f d d f 3 5 5 3 f d d f . .
                . . . f f 3 3 3 3 3 3 f f . . .
                . . . f 3 3 5 3 3 5 3 3 f . . .
                . . . f f f f f f f f f f . . .
                . . . . . f f . . f f . . . . .
            `)
            npc.say("Have fun!")
        }

        if(costume == 11){
            npc.setImage(img`
                ........................
                .....ffff...............
                ...fff22fff.............
                ..fff2222fff............
                .fffeeeeeefff...........
                .ffe222222eef...........
                .fe2ffffff2ef...........
                .ffffeeeeffff...........
                ffefbf44fbfeff..........
                fee41fddf14eef..........
                .ffffdddddeef...........
                fddddf444eef............
                fbbbbf2222f4e...........
                fbbbbf2222fd4...........
                .fccf45544f44...........
                ..ffffffff..............
                ....ff..ff..............
                ........................
                ........................
                ........................
                ........................
                ........................
                ........................
                ........................
            `)
            npc.say("Good Luck!")
        }

        if(costume == 12){
            npc.setImage(img`
                . f f f . f f f f . f f f .
                f f f f f c c c c f f f f f
                f f f f b c c c c b f f f f
                f f f c 3 c c c c 3 c f f f
                . f 3 3 c c c c c c 3 3 f .
                . f c c c c 4 4 c c c c f .
                . f f c c 4 4 4 4 c c f f .
                . f f f b f 4 4 f b f f f .
                . f f 4 1 f d d f 1 4 f f .
                . . f f d d d d d d f f . .
                . . e f e 4 4 4 4 e f e . .
                . e 4 f b 3 3 3 3 b f 4 e .
                . 4 d f 3 3 3 3 3 3 c d 4 .
                . 4 4 f 6 6 6 6 6 6 f 4 4 .
                . . . . f f f f f f . . . .
                . . . . f f . . f f . . . .
            `)
            npc.say("Good luck and have fun!")
        }
        if(costume == 13){
            npc.setImage(img`
                . . . . . . f f f f . . . . . .
                . . . . f f f 2 2 f f f . . . .
                . . . f f f 2 2 2 2 f f f . . .
                . . f f f e e e e e e f f f . .
                . . f f e 2 2 2 2 2 2 e e f . .
                . . f e 2 f f f f f f 2 e f . .
                . . f f f f e e e e f f f f . .
                . f f e f b f 4 4 f b f e f f .
                . f e e 4 1 f d d f 1 4 e e f .
                . . f e e d d d d d d e e f . .
                . . . f e e 4 4 4 4 e e f . . .
                . . e 4 f 2 2 2 2 2 2 f 4 e . .
                . . 4 d f 2 2 2 2 2 2 f d 4 . .
                . . 4 4 f 4 4 5 5 4 4 f 4 4 . .
                . . . . . f f f f f f . . . . .
                . . . . . f f . . f f . . . . .
            `)
        }
    
        game.onUpdate(function (){
            //Close2NPC
            if(Math.abs(bob.x - npc.x) < 40 && Math.abs(bob.y - npc.y) < 40 && level == 1){
                npc.z = bob.z - 1
                //shop1
                if(costume == 1){
                    npc.say('Welcome friend!', 500)
                }
                //shop2
                if (costume == 2 || costume == 5) {
                    npc.say('Buy my stuff!', 500)
                } 
                //gateGuy
                if(costume == 3){
                    npc.say("KEY OPENS GATE :)", 500, 9, 15)
                    
                }
                //tourGuide
                if(costume == 6){
                    npc.say('Press B to talk', 500)
                    if(controller.B.isPressed()== true){
                        game.splash("One night in October")
                        game.splash("I was walking into the arena")
                        game.splash("Then, a monster came to me")
                        game.splash("And then it almost hurt me")
                        game.splash("but luckily, I'm still here")
                        game.splash("Good Luck Friend!")
                        music.beamUp

                    }

                }
                //startTourGuide
                if(costume == 7){
                    npc.say('Press B to talk', 500)
                    if(controller.B.isPressed()== true){
                        game.splash('Hello, young fellow')
                        game.splash('Help us! Big Alien stole', 'the key')
                        game.splash('Please beat Big', 'Alien for us!')
                        game.splash('Good Luck Bud.')
                        music.magicWand.play()

                    }
                }
                //monkeyTamer
                if(costume == 8){
                    npc.say("Press B to talk", 500)
                    if (controller.B.isPressed() == true){
                        if(monkeyQuest == 0){
                            game.splash('Hello, Time to catch ','monkeys!')
                            game.splash('Oh, I forgot to tell ya','My Monkeys are loose!!')
                            game.splash('So, If you catch them',"I'll give you a gift")
                            game.splash('Good Luck!')
                            music.magicWand.play()
                            monkeyQuest = 1
                        }
                        if(monkeyQuest == 1){
                            game.splash('There are still', (20-monkeyCollected).toString()+' monkeys loose.')
                        }
                        if(monkeyQuest == 2){
                            game.splash('Woo, TYSM! Monkeys back!')
                            game.splash('Bro wants to follow yo!')
                            game.splash('Take good care of him!')
                            music.powerUp.play()
                            spawnMonkeyCompanion()
                        }
                    }
                }
            }
            //level2 
            if (Math.abs(bob.x - npc.x) < 40 && Math.abs(bob.y - npc.y) < 40 && level == 2){
                //chestNPC
                if (costume == 13) {
                    npc.say("Press B to talk", 500)
                    if (controller.B.isPressed() == true) {
                        game.splash('Be Careful!', 'Good Luck!')
                    }
                }

            }

            
            
            if (deleteSprites == true) {
                npc.say("", 100)
                npc.destroy()
                
            }

            
        })
        game.onUpdateInterval(2000, function(){
            if(costume == 4){
                npc.setVelocity(Math.pickRandom([-40, 0, 40]), Math.pickRandom([-40, 0, 40]))
            }
        })
        
    }


    //monkeyCompanion()
    function spawnMonkeyCompanion(){
        monkeyCompanion = true
        let monkeyBlastX = 0
        let monkeyBlastY = 0
        bro = sprites.create(assets.image`bro`, SpriteKind.Companion)
        bro.setPosition(bob.x + 10, bob.y - 10)
        
        game.onUpdate(function () {
            bro.follow(bob, 75)
        })
        //monkeyAttack
        game.onUpdateInterval(2000, function (){
            //if(inRangeOfBro == true){
                if(enemyDirection == "above"){
                    monkeyBlastX = 0
                    monkeyBlastY = -200
                }
                if (enemyDirection == "below") {
                    monkeyBlastX = 0
                    monkeyBlastY = 200
                }
                if (enemyDirection == "left") {
                    monkeyBlastX = -200
                    monkeyBlastY = 0
                }
                if (enemyDirection == "right") {
                    monkeyBlastX = 200
                    monkeyBlastY = 0
                }
                if (enemyDirection == "topLeft") {
                    monkeyBlastX = -200
                    monkeyBlastY = -200
                }
                if (enemyDirection == "topRight") {
                    monkeyBlastX = 200
                    monkeyBlastY = -200
                }
                if (enemyDirection == "bottomRight") {
                    monkeyBlastX = 200
                    monkeyBlastY = 200
                }
                if (enemyDirection == "bottomLeft") {
                    monkeyBlastX = -200
                    monkeyBlastY = 200
                }
                let banana = sprites.createProjectileFromSprite(assets.image`banana`, bro, monkeyBlastX, monkeyBlastY)
            //}
        })



    }

    //chest
    function spawnChest(xPos: number, yPos: number, kind: string){
        let chest = sprites.create(img`
            . . b b b b b b b b b b b b . .
            . b 7 9 9 9 9 9 9 9 9 9 9 7 b .
            b 7 9 9 9 9 9 9 9 9 9 9 9 9 7 b
            b 7 9 9 9 9 9 9 9 9 9 9 9 9 7 b
            b 7 9 9 9 9 9 9 9 9 9 9 9 9 7 b
            b 7 7 9 9 9 9 9 9 9 9 9 9 7 7 b
            b 7 7 7 7 7 7 7 7 7 7 7 7 7 7 b
            b 7 7 7 7 7 7 7 7 7 7 7 7 7 7 b
            b b b b b b b 7 7 b b b b b b b
            c b b b b b b c c b b b b b b c
            c c c c c c b c c b c c c c c c
            b 7 7 7 7 7 c b b c 7 7 7 7 7 b
            b 7 7 7 7 7 7 7 7 7 7 7 7 7 7 b
            b c 7 7 7 7 7 7 7 7 7 7 7 7 c b
            b b b b b b b b b b b b b b b b
            . b b . . . . . . . . . . b b .
        `, SpriteKind.Chest)
        chest.setPosition(xPos * 16, yPos * 16)
        if(kind == "health"){
            chest.setKind(SpriteKind.HealthChest)
        }
        if(kind == "subtract"){
            chest.setKind(SpriteKind.SubtractHealth)
        }
        if(kind == "random"){
            chest.setKind(SpriteKind.RandHealth)
        }
        //deleteSprites
        game.onUpdate(function () {
            if (deleteSprites == true) {
                chest.destroy()
            }
        })
    }
    
    
    //energyCell
    function spawnCell(xPos: number, yPos: number, direction: number, order: number, solved: number){
        let cell = sprites.create(assets.image`EnergyCellUP`, SpriteKind.Cell)
        cell.setPosition(xPos * 16, yPos * 16)
        let cellDirection = 1
        if(direction == 2){
            cell.setImage(assets.image`EnergyCellDOWN`)
            cellDirection = 2
        }
        if(direction == 3){
            cell.setImage(assets.image`EnergyCellLEFT`)
            cellDirection = 3

        }
        if(direction == 4){
            cell.setImage(assets.image`EnergyCellRIGHT`)
            cellDirection = 4
        }
        //rotateNOW
        game.onUpdate(function(){
            if(cell.overlapsWith(bob)== true && controller.B.isPressed()== true && roboBossActivate == false){
               cellDirection++
               if(cellDirection > 4){
                   cellDirection = 1
               } 

               if(cellDirection == 1){
                   cell.setImage(assets.image`EnergyCellUP`)
               }
                if (cellDirection == 2) {
                    cell.setImage(assets.image`EnergyCellDOWN`)
                }
                if (cellDirection == 3) {
                    cell.setImage(assets.image`EnergyCellLEFT`)
                }
                if (cellDirection == 4) {
                    cell.setImage(assets.image`EnergyCellRIGHT`)
                }
                music.knock.play()
                pause(100)
            }
            //cell1
            if(order == 1){
                if(cellDirection == solved){
                    cell1 = true
                } else{
                    cell1 = false
                }
            }   
            //cell2
            if (order == 2) {
                if (cellDirection == solved) {
                    cell2 = true
                } else {
                    cell2 = false
                } 
            }
            //cell3
            if (order == 3) {
                if (cellDirection == solved) {
                    cell3 = true
                } else {
                    cell3 = false
                }
            
            }
            //cell4
            if (order == 4) {
                if (cellDirection == solved) {
                    cell4 = true
                } else {
                    cell4 = false
                }
            }
            //cell5
            if (order == 5) {
                if (cellDirection == solved) {
                    cell5 = true
                } else {
                    cell5 = false
                }
            }
            //puzzle
            if (cell1 == true && cell2 == true && cell3 == true && cell4 == true && cell5 == true && roboBossActivate == false){
                roboBossActivate = true
                solved = 100
                cell1 = false
                cell2 = false
                cell3 = false
                cell4 = false
                cell5 = false
                music.powerUp.play()
                music.stopAllSounds()
                music.play(song2, music.PlaybackMode.LoopingInBackground)
                game.splash("ROBO_BOSS ACTIVATED", "PROCEED WITH CAUTION")
                
            }
        })
        //deleteSprites
        game.onUpdate(function () {
            if (deleteSprites == true) {
                cell.destroy()
            }
        })

    }
    //levers
    function spawnLever(xPos: number, yPos: number, order: number){
        let lever = sprites.create(assets.image`leverDownOff`, SpriteKind.Lever)
        if(order < 3){
            lever.setImage(assets.image`leverUpOff`)
        }
        lever.setPosition(xPos * 16, yPos * 16)
        let flipped = false 

        game.onUpdate(function () {
            if(leverFlip == 7){
                lever.setImage(assets.image`leverDownOff`)
                if (order < 3) {
                    lever.setImage(assets.image`leverUpOff`)
                }
                leverFlip = 1
                //fix bug last lever stays down
            }
            if (lever.overlapsWith(bob) == true && controller.B.isPressed() == true && leverPuzzleSolved == false && flipped == false){
            //LeverFlip
                if(order == 1 && leverFlip == 1){
                    correctOrder1 = true
                }
                if (order == 2 && leverFlip == 2) {
                    correctOrder2 = true
                }
                if (order == 3 && leverFlip == 3) {
                    correctOrder3 = true
                }
                if (order == 4 && leverFlip == 4) {
                    correctOrder4 = true
                }
                if (order == 5 && leverFlip == 5) {
                    correctOrder5 = true
                }
                if(order < 3){
                    lever.setImage(assets.image`leverUpOn`)
                }
                if(order >= 3){
                    lever.setImage(assets.image`leverDownOn`)
                }
                leverFlip++
                flipped = true
                music.thump.play()
                
                if(leverFlip == 6){
                    if (correctOrder1 == true && correctOrder2 == true && correctOrder3 == true && correctOrder4 == true && correctOrder5 == true){
                        leverPuzzleSolved = true
                        music.magicWand.play()
                    }else{
                        
                        flipped = false
                        music.powerDown.play()
                        leverFlip = 7
                        correctOrder1 = false
                        correctOrder2 = false
                        correctOrder3 = false
                        correctOrder4 = false
                        correctOrder5 = false

                    }
                }

            
            }
        })
    }

    






    //gate
    function spawnGate(x1: number, y1: number){
        let gateLocked = true
        let gate = sprites.create(img`
            1122222222222222222222222222222222222222222222222222222222222211
            2211122222222222222222222222222222222222222222222222222222111122
            2222211122222222222222222222222222222222222222222222222111222222
            2222222211122222222222222222444222222222222222222222111222222222
            2222222222211122222222222224444422222222222222221111222222222222
            2222222222222211122222222244222442222222222221112222222222222222
            2222222222222222211122222244222442222222221112222222222222222222
            2222222222222222222211122244444442222211112222222222222222222222
            2222222222222222222222211444444444221122222222222222222222222222
            22222222222222222222222114444f4444112222222222222222222222222222
            22222222222222222222222114444f4444112222222222222222222222222222
            2222222222222222222221111444444444112222222222222222222222222222
            2222222222222221111111111111111111111112222222222222222222222222
            2222222221111112222222222222222222222221111111111222222222222222
            2221111112222222222222222222222222222222222222222111111111122222
            1112222222222222222222222222222222222222222222222222222222211111
        `, SpriteKind.Gate)
        gate.setPosition(x1 * 16 , y1 * 16)
        tiles.setWallAt(tiles.getTileLocation(x1, y1), true)
        tiles.setWallAt(tiles.getTileLocation(x1 + 1, y1), true)
        tiles.setWallAt(tiles.getTileLocation(x1 - 1, y1), true)
        tiles.setWallAt(tiles.getTileLocation(x1 + 2, y1), true)

        game.onUpdate(function(){
            if(keys > 0 && Math.abs(bob.x - gate.x)<= 20 && Math.abs(bob.y - gate.y)<= 20 && gateLocked == true){
                keys--
                gateLocked = false   
                music.bigCrash.play()
                gate.destroy()
                tiles.setWallAt(tiles.getTileLocation(x1, y1), false)
                tiles.setWallAt(tiles.getTileLocation(x1 + 1, y1), false)
                tiles.setWallAt(tiles.getTileLocation(x1 -1, y1), false)
                tiles.setWallAt(tiles.getTileLocation(x1 + 1, y1), false)
                music.beamUp.play()
                
            }
        })
        //deleteSprites
        game.onUpdate(function () {
            if (deleteSprites == true) {
                gate.destroy()
            }
        })



    }
    
    //spawnRoboBoss
    function spawnRoboBoss(xPos: number, yPos: number) {
        let roboBoss = sprites.create(assets.image`RoboKillerPieceOfJunk1001`, SpriteKind.BigRobo)
        roboBoss.setPosition(xPos * 16, yPos * 16)
        let rbalive = true
        let moveX = 50
        let moveY = 0
        let moveTime = 2200
        let moveSequence = 1
        let attackCooldown = 0
        let roboBossHP = 20

        roboBoss.onDestroyed(function () {
            rbalive = false
            //spawnKey
            let key: Sprite = sprites.create(assets.image`key`, SpriteKind.Key)
            key.setPosition(roboBoss.x, roboBoss.y)
            //spawn💗
            for (let i = 0; i < 3; i++) {
                let heart: Sprite = sprites.create(img`
                    . . . . . . . . . . . . . . . .
                    . . f f f f f f . f f f f f f .
                    . f f 3 3 3 3 f f f 3 3 3 3 f f
                    . f 3 3 3 3 3 3 f 3 3 3 3 3 3 f
                    . f 3 3 3 3 3 3 3 3 1 1 1 3 3 f
                    . f 3 3 3 3 3 3 3 3 1 1 1 3 3 f
                    . f 3 3 3 3 3 3 3 3 1 1 1 3 3 f
                    . f 3 3 3 3 3 3 3 3 3 3 3 3 3 f
                    . f f 3 3 3 3 3 3 3 3 3 3 3 f f
                    . . f f 3 3 3 3 3 3 3 3 3 f f .
                    . . . f f 3 3 3 3 3 3 3 f f . .
                    . . . . f f 3 3 3 3 3 f f . . .
                    . . . . . f f 3 3 3 f f . . . .
                    . . . . . . f f 3 f f . . . . .
                    . . . . . . . f f f . . . . . .
                    . . . . . . . . . . . . . . . .
                `, SpriteKind.Food)
                heart.setPosition(roboBoss.x, roboBoss.y)
            }

        })

        //movementSequence
        game.onUpdateInterval(moveTime, function () {
            if(rbalive == true && roboBossActivate == true){

                roboBoss.setVelocity(moveX, moveY)
                moveSequence++
                if (moveSequence > 4) {
                    moveSequence = 1
                }
                if (moveSequence == 1 || moveSequence == 4) {
                    moveX = 50
                }
                if (moveSequence == 2 || moveSequence == 3) {
                    moveX = -50
                }
            }
        })

        //projectile
        game.onUpdateInterval(100, function () {
            //bob.say(bossHP.toString(), 1000)
            if (rbalive == true && roboBossActivate == true) {
                if (Math.abs(bob.x - roboBoss.x) <= 70 && Math.abs(bob.y - roboBoss.y) <= 70) {
                    attackCooldown++
                    if (attackCooldown < 19) {
                        enemyBlast = sprites.createProjectileFromSprite(img`
                            . . . . . . . . . . . . . . . .
                            . . . . . . . . . . . . . . . .
                            . . . . . . . . . . . . . . . .
                            . . . . . b b b b b b . . . . .
                            . . . . b b 9 9 9 9 b b . . . .
                            . . . . b 9 9 d d 9 9 b . . . .
                            . . . . b 9 d d d d 9 b . . . .
                            . . . . b 9 d d d d 9 b . . . .
                            . . . . b 9 9 d d 9 9 b . . . .
                            . . . . b b 9 9 9 9 b b . . . .
                            . . . . . b b b b b b . . . . .
                            . . . . . . . . . . . . . . . .
                            . . . . . . . . . . . . . . . .
                            . . . . . . . . . . . . . . . .
                            . . . . . . . . . . . . . . . .
                            . . . . . . . . . . . . . . . .
                        `, roboBoss, 0, 200)
                        enemyBlast.setKind(SpriteKind.EnemyProjectile)
                        music.knock.play()
                    }
                }
                if (attackCooldown > 29) {
                    attackCooldown = 0
                }
            }
        })


        //bossTakesDamage
        game.onUpdate(function () {
            sprites.onOverlap(SpriteKind.Projectile, SpriteKind.BigRobo, function (blast: Sprite, boss: Sprite) {
                if(roboBossActivate == false){
                    blast.destroy()
                    music.smallCrash.play()
                }
                if(roboBossActivate == true){
                    roboBossHP--
                    blast.destroy()
                    music.thump.play()
                    boss.startEffect(effects.fire, 300)
                    let bossSpeech = Math.pickRandom([1, 2, 3, 4])
                    if (bossSpeech == 1) {
                        boss.say("BOB?!?!", 100)
                    }
                    if (bossSpeech == 2) {
                        boss.say("WHY YOU BULLY ME?", 100)
                    }
                    if (bossSpeech == 3) {
                        boss.say("I TO0 SWEET TO BE BULLIED!", 100)
                    }
                    if (bossSpeech == 4) {
                        boss.say("OWWW!!!", 100)
                    }
                    //destroyBoss
                    if (roboBossHP < 1) {
                        boss.say("", 1)
                        boss.destroy()
                        music.smallCrash.play()
                        music.stopAllSounds()
                        music.play(song, music.PlaybackMode.LoopingInBackground)
                    }
                }
            })

        })

        //BossFightSong
        game.onUpdate(function () {
            if (Math.abs(bob.x - roboBoss.x) <= 50 && Math.abs(bob.y - roboBoss.y) <= 80 && bossFight2 == false && roboBossActivate == true) {
                bossFight2 = true
                music.stopAllSounds()
                music.play(song2, music.PlaybackMode.LoopingInBackground)
                //test++
                //bob.say(test.toString())

            }
            if (bossFight2 == true && Math.abs(bob.x - roboBoss.x) > 50 && Math.abs(bob.y - roboBoss.y) > 80) {
                music.stopAllSounds()
                music.play(song, music.PlaybackMode.LoopingInBackground)
                bossFight2 = false
                //test++
                //bob.say(test.toString())
            }
        })
        //deleteSprites
        game.onUpdate(function () {
            if (deleteSprites == true) {
                roboBoss.destroy()
            }
            /*if (roboBossActivate == true) {
                roboBoss.destroy()
                roboBossActivate = false
            }*/
        })
    }
    //BigAlien
    function spawnBigAlien(xPos: number, yPos: number, costume: number){
        let bigAlien = sprites.create(assets.image`AlienBuddyBully3000`, SpriteKind.BigAlien)
        bigAlien.setPosition(xPos * 16, yPos * 16)

        let alive = true
        let moveX = 50
        let moveY = 0
        let moveTime = 2200
        let moveSequence = 1
        let attackCooldown = 0
        let bossHP = 20

        bigAlien.onDestroyed(function(){
            alive = false
            //spawnKey
            let key: Sprite = sprites.create(assets.image`key`, SpriteKind.Key)
            key.setPosition(bigAlien.x, bigAlien.y)
            //spawn💗
            for(let i = 0; i < 3 ; i++){            
                let heart: Sprite = sprites.create(img`
                    . . . . . . . . . . . . . . . .
                    . . f f f f f f . f f f f f f .
                    . f f 3 3 3 3 f f f 3 3 3 3 f f
                    . f 3 3 3 3 3 3 f 3 3 3 3 3 3 f
                    . f 3 3 3 3 3 3 3 3 1 1 1 3 3 f
                    . f 3 3 3 3 3 3 3 3 1 1 1 3 3 f
                    . f 3 3 3 3 3 3 3 3 1 1 1 3 3 f
                    . f 3 3 3 3 3 3 3 3 3 3 3 3 3 f
                    . f f 3 3 3 3 3 3 3 3 3 3 3 f f
                    . . f f 3 3 3 3 3 3 3 3 3 f f .
                    . . . f f 3 3 3 3 3 3 3 f f . .
                    . . . . f f 3 3 3 3 3 f f . . .
                    . . . . . f f 3 3 3 f f . . . .
                    . . . . . . f f 3 f f . . . . .
                    . . . . . . . f f f . . . . . .
                    . . . . . . . . . . . . . . . .
                `, SpriteKind.Food)
                heart.setPosition(bigAlien.x, bigAlien.y)
            }

        })

        //movementSequence
        game.onUpdateInterval(moveTime, function(){
            bigAlien.setVelocity(moveX, moveY)
            moveSequence++
            if(moveSequence > 4){
                moveSequence = 1
            }
            if(moveSequence == 1 || moveSequence == 4){
                moveX = 50
            }
            if(moveSequence == 2 || moveSequence == 3){
                moveX = -50
            }
        })

        //projectile
        game.onUpdateInterval(100, function(){
            //bob.say(bossHP.toString(), 1000)
            if(alive == true){
                if(Math.abs(bob.x - bigAlien.x)<= 70 && Math.abs(bob.y - bigAlien.y ) <= 70){
                    attackCooldown++
                    if(attackCooldown < 19){
                        enemyBlast = sprites.createProjectileFromSprite(img`
                            . . . . . . . . . . . . . . . .
                            . . . . . . . . . . . . . . . .
                            . . . . . . . . . . . . . . . .
                            . . . . . b b b b b b . . . . .
                            . . . . b b 9 9 9 9 b b . . . .
                            . . . . b 9 9 d d 9 9 b . . . .
                            . . . . b 9 d d d d 9 b . . . .
                            . . . . b 9 d d d d 9 b . . . .
                            . . . . b 9 9 d d 9 9 b . . . .
                            . . . . b b 9 9 9 9 b b . . . .
                            . . . . . b b b b b b . . . . .
                            . . . . . . . . . . . . . . . .
                            . . . . . . . . . . . . . . . .
                            . . . . . . . . . . . . . . . .
                            . . . . . . . . . . . . . . . .
                            . . . . . . . . . . . . . . . .
                        `, bigAlien, 0, 200)
                        enemyBlast.setKind(SpriteKind.EnemyProjectile)
                        music.knock.play()
                    }
                }
                if(attackCooldown > 29){
                    attackCooldown = 0
                }
            }
        })


        //bossTakesDamage
        game.onUpdate(function(){
            sprites.onOverlap(SpriteKind.Projectile, SpriteKind.BigAlien, function(blast: Sprite, boss: Sprite){
                bossHP--
                blast.destroy()
                music.thump.play()
                boss.startEffect(effects.fire, 300)
                let bossSpeech = Math.pickRandom([1, 2, 3, 4])
                if(bossSpeech == 1){
                    boss.say("BOB?!?!", 100)
                }
                if (bossSpeech == 2) {
                    boss.say("WHY YOU BULLY ME?", 100)
                }
                if (bossSpeech == 3) {
                    boss.say("I TO0 SWEET TO BE BULLIED!", 100)
                }
                if (bossSpeech == 4){
                    boss.say("OWWW!!!", 100)
                }
                //destroyBoss
                if(bossHP < 1){
                    boss.say("", 1)
                    boss.destroy()
                    music.smallCrash.play()
                    music.stopAllSounds()
                    music.play(song, music.PlaybackMode.LoopingInBackground)
                   

                }
            })
            
        })

        //BossFightSong
        game.onUpdate(function(){
            if(Math.abs(bob.x - bigAlien.x)<= 50 && Math.abs(bob.y - bigAlien.y) <= 80 && bossFight1 == false && costume == 1){
                bossFight1 = true
                music.stopAllSounds()
                music.play(song2, music.PlaybackMode.LoopingInBackground)
                //test++
                //bob.say(test.toString())

            }
            if (bossFight1 == true && Math.abs(bob.x - bigAlien.x) > 50 && Math.abs(bob.y - bigAlien.y) > 80 && costume == 1){
                music.stopAllSounds()
                music.play(song, music.PlaybackMode.LoopingInBackground)
                bossFight1 = false
                //test++
                //bob.say(test.toString())
            }
        })
        
        
    }


    //portalForNewLife
    function spawnPortal(xPos: number, yPos: number){
        let portal = sprites.create(img`
            . . . . . . . . . . . . . . . .
            . . . . . . 4 4 4 4 . . . . . .
            . . . . 4 4 4 5 5 4 4 4 . . . .
            . . . 3 3 3 3 4 4 4 4 4 4 . . .
            . . 4 3 3 3 3 2 2 2 1 1 4 4 . .
            . . 3 3 3 3 3 2 2 2 1 1 5 4 . .
            . 4 3 3 3 3 2 2 2 2 2 5 5 4 4 .
            . 4 3 3 3 2 2 2 4 4 4 4 5 4 4 .
            . 4 4 3 3 2 2 4 4 4 4 4 4 4 4 .
            . 4 2 3 3 2 2 4 4 4 4 4 4 4 4 .
            . . 4 2 3 3 2 4 4 4 4 4 2 4 . .
            . . 4 2 2 3 2 2 4 4 4 2 4 4 . .
            . . . 4 2 2 2 2 2 2 2 2 4 . . .
            . . . . 4 4 2 2 2 2 4 4 . . . .
            . . . . . . 4 4 4 4 . . . . . .
            . . . . . . . . . . . . . . . .
        `, SpriteKind.Portal)
        portal.setPosition(xPos * 16, yPos * 16)
    }
    //alienSpawneer
    function spawner(xPos: number, yPos: number){
        game.onUpdateInterval(15000, function () {
            if(aliensOnScreen < 200 && level == 1){
                spawnAlien(xPos, yPos, 2)
            
            }
        })

        
        
    }

    //healthItem...
    function healthItem(xPos: number, yPos: number){
        let healthItem = sprites.create(img`
            ................
            ..ffffff.ffffff.
            .ff3333fff3333ff
            .f333333f333333f
            .f3333333311133f
            .f3333333311133f
            .f3333333311133f
            .f3333333333333f
            .ff33333333333ff
            ..ff333333333ff.
            ...ff3333333ff..
            ....ff33333ff...
            .....ff333ff....
            ......ff3ff.....
            .......fff......
            ffffffffffffffff
            ffff44ff4444ffff
            fffff4ff4ff4ffff
            fffff4ff4ff4ffff
            ffff444f4444ffff
            ffffffffffffffff
        `, SpriteKind.ShopHeart)
        healthItem.setPosition(xPos * 16, yPos * 16)
        
        //deleteSprites
        game.onUpdate(function () {
            if (deleteSprites == true) {
            healthItem.destroy()
            }
        })
    }

    //bootsUpgrade
    function bootsUpgrade(xPos: number, yPos: number){
        let bootsUpgrade = sprites.create(assets.image`bootsUpgrade`, SpriteKind.BootsUpgrade)
        bootsUpgrade.setPosition(xPos * 16, yPos * 16)
        bootsUpgrade.say("Boots2.0")
        

        //deleteSprites
        game.onUpdate(function () {
            if (deleteSprites == true) {
                bootsUpgrade.say("", 1)
                bootsUpgrade.destroy()
            }
        })
    }
    //BlasterUpgrade
    function blasterUpgrade(xPos: number, yPos: number) {
        let blasterUpgrade = sprites.create(assets.image`blasterUpgrade`, SpriteKind.BlasterUpgrade)
        blasterUpgrade.setPosition(xPos * 16, yPos * 16)
        blasterUpgrade.say("Blaster2.0")
        //deleteSprites
        game.onUpdate(function () {
            if(deleteSprites == true) {
                blasterUpgrade.say("", 1)
                blasterUpgrade.destroy()
            }
        })
    }

//overlapFunctions

    //blast.hitsEnemy
    sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, 
    function(blast: Sprite, enemy: Sprite){
        enemy.destroy()
        blast.destroy()
        music.thump.play()

    })

    //damage
    sprites.onOverlap(SpriteKind.EnemyProjectile, SpriteKind.Player, 
    function(blast: Sprite, player: Sprite){
        info.changeLifeBy(-1)
        blast.destroy()
        player.startEffect(effects.coolRadial, 300)
        music.zapped.play()
    })

    //chestOpen
    sprites.onOverlap(SpriteKind.Player, SpriteKind.Chest, function(player: Sprite, chest: Sprite){
        chest.destroy()
        info.changeScoreBy(5)
        
        let openChest =sprites.create(img`
            . b b b b b b b b b b b b b b .
            b 7 9 9 9 9 9 9 9 9 9 9 9 9 9 b
            b 7 9 f f f f f f f f f f f 7 b
            b 7 f f 4 4 4 4 4 4 4 4 f f f b
            b f f 4 4 4 4 4 3 4 4 4 4 f f b
            . f 4 4 4 3 3 3 3 3 3 4 4 4 f .
            b f 4 4 4 3 4 4 3 4 4 4 4 4 f b
            b f 4 4 4 3 4 4 3 4 4 4 4 4 f b
            b f 4 4 4 3 3 3 3 3 3 4 4 4 f b
            b f 4 4 4 4 4 4 3 4 3 4 4 4 f b
            b f 4 4 4 4 4 4 3 4 3 4 4 4 f b
            b f 4 4 4 3 3 3 3 3 3 4 4 4 f b
            b f f 4 4 4 4 4 3 4 4 4 4 f f b
            b c f f 4 4 4 4 4 4 4 4 f f c b
            b b b f f f f f f f f f f b b b
            . b b . . . . . . . . . . b b .
        `)
        
        openChest.setPosition(chest.x, chest.y)
        music.baDing.playUntilDone()
        openChest.setImage(assets.image`emptyChest`)
    })
    sprites.onOverlap(SpriteKind.Player, SpriteKind.HealthChest, function (player: Sprite, chest: Sprite) {
        chest.destroy()
        info.changeLifeBy(Math.randomRange(1, 5))

        let openChest = sprites.create(img`
            . b b b b b b b b b b b b b b .
            b 7 9 9 9 9 9 9 9 9 9 9 9 9 9 b
            b 7 9 f f f f f 9 f f f f f 7 b
            b 7 f f 3 3 3 f f f 3 3 3 f f b
            b b f 3 3 3 3 3 f 3 3 3 3 3 f b
            . b f 3 3 3 3 3 3 3 1 1 3 3 f .
            b c f 3 3 3 3 3 3 3 1 1 3 3 f b
            b c f 3 3 3 3 3 3 3 3 3 3 3 f b
            b c f f 3 3 3 b b b 3 3 3 f f b
            b c c f f 3 b b b b b 3 f f c b
            b b b b f f b b b b b f f b b b
            b 7 7 7 7 f f b b b f f 7 7 7 b
            b 7 7 7 7 7 f f b f f 7 7 7 7 b
            b c 7 7 7 7 7 f f f 7 7 7 7 c b
            b b b b b b b b b b b b b b b b
            . b b . . . . . . . . . . b b .
        `)
        openChest.setPosition(chest.x, chest.y)
        music.powerUp.playUntilDone()
        openChest.setImage(assets.image`emptyChest`)
    })
    //SubtractHealth
    sprites.onOverlap(SpriteKind.Player, SpriteKind.SubtractHealth, function (player: Sprite, chest: Sprite) {
        chest.destroy()
        info.changeLifeBy(Math.randomRange(-4, -10))

        let openChest = sprites.create(img`
            . b b b b b b b b b b b b b b .
            b 7 9 9 9 9 9 9 9 9 9 9 9 9 9 b
            b 7 9 f f f f f f f f f f f 7 b
            b 7 f f 1 1 1 1 1 1 1 1 1 f f b
            b b f 1 1 1 1 1 1 1 1 1 1 1 f b
            . b f 1 1 2 2 1 1 1 2 2 1 1 f .
            b c f 1 1 1 1 1 1 1 1 1 1 1 f b
            b c f 1 1 1 1 1 1 1 1 1 1 1 f b
            b c f f 1 1 1 1 1 1 1 1 1 f f b
            b c c f f 1 1 1 1 1 1 1 f f c b
            b b b b f f 1 1 1 1 1 f f b b b
            b 7 7 7 7 f f 1 f 1 f f 7 7 7 b
            b 7 7 7 7 f 1 1 1 1 1 f 7 7 7 b
            b c 7 7 7 f f f f f f f 7 7 c b
            b b b b b b b b b b b b b b b b
            . b b . . . . . . . . . . b b .
        `)
        openChest.setPosition(chest.x, chest.y)
        music.bigCrash.play()
        music.buzzer.playUntilDone()
        openChest.startEffect(effects.ashes, 300)
        openChest.setImage(assets.image`emptyChest`)
    })
    //randhealth
    sprites.onOverlap(SpriteKind.Player, SpriteKind.RandHealth, function (player: Sprite, chest: Sprite) {
        chest.destroy()
        info.changeLifeBy(Math.randomRange(1, 8))

        let openChest = sprites.create(assets.image`emptyChest
        `)

        openChest.setPosition(chest.x, chest.y)
        music.powerUp.play()
        music.powerUp.playUntilDone()
        openChest.startEffect(effects.confetti, 1250)
        openChest.setImage(assets.image`emptyChest`)
    })


    //key
    sprites.onOverlap(SpriteKind.Player, SpriteKind.Key, function(player: Sprite, key: Sprite){
        keys++
        key.destroy()
        music.baDing.play()
        player.say("I GOT A KEY!!!", 300)
        music.beamUp.play()
    })
    //heart
    sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function(player: Sprite, heart: Sprite){
        info.changeLifeBy(1)
        heart.destroy()
        music.powerUp.play()
    })
    //coin
    sprites.onOverlap(SpriteKind.Player, SpriteKind.Coin, function (player: Sprite, coin: Sprite) {
        info.changeScoreBy(1)
        coin.destroy()
        music.baDing.play()
    })
    //Monkeys
    sprites.onOverlap(SpriteKind.Player, SpriteKind.Monkey, function(bob: Sprite, monkey: Sprite){
        if(monkeyQuest == 1){
            monkey.setKind(SpriteKind.NonPlayable)
            monkey.setPosition(62 * 16, 46 * 16)
            monkeyCollected++
            music.buzzer.play()
            bob.say(monkeyCollected.toString()+"/20", 500)
            if(monkeyCollected == 20){
                monkeyQuest = 2

            }
        }
    })
    //ShopHeart
    sprites.onOverlap(SpriteKind.Player, SpriteKind.ShopHeart, function(player: Sprite, heart: Sprite){
        if(info.score() >= 10){
            player.say("Press A to buy!", 200)
            if(controller.A.isPressed()== true){
                if(game.ask("Do you want to buy?")== true){
                    info.changeScoreBy(-10)
                    info.changeLifeBy(5)
                    music.powerUp.play()
                    player.setPosition(player.x - 40, player.y)
                }
                
            }
        }
    })

    //bootsUpgrade
    sprites.onOverlap(SpriteKind.Player, SpriteKind.BootsUpgrade, function(player: Sprite, boots: Sprite){
        if(info.score()>= 15){
            player.say("Press A to buy!", 200)
            if (controller.A.isPressed() == true) {
                if (game.ask("Do you want to buy?") == true) {
                    info.changeScoreBy(-15)
                    music.beamUp.play()
                    player.setPosition(player.x + 40, player.y)
                    boots.say("", 5)
                    boots.destroy()
                    bootsType = 2
                    tiles.setWallAt(tiles.getTileLocation(1, 25), false)
                    tiles.setWallAt(tiles.getTileLocation(1, 26), false)
                    tiles.setWallAt(tiles.getTileLocation(4, 30), false)
                    tiles.setWallAt(tiles.getTileLocation(5, 30), false)
                    tiles.setWallAt(tiles.getTileLocation(8, 25), false)
                    tiles.setWallAt(tiles.getTileLocation(8, 26),false)
                    if(blasterType == 1){
                      player.setImage(assets.image`bob2boots`)
                    }
                    else if(blasterType == 2){
                        player.setImage(assets.image`bobBlaster_boots`)
                    }
                }
            }
        }
    })
    
    //blasterUpgrade
    sprites.onOverlap(SpriteKind.Player, SpriteKind.BlasterUpgrade, function(bob: Sprite, blaster: Sprite){
        if (info.score() >= 20) {
            bob.say("Press A to buy!", 200)
            if (controller.A.isPressed() == true) {
                if (game.ask("Do you want to buy?") == true) {
                    info.changeScoreBy(-20)
                    blaster.say("", 5)
                    blaster.destroy()
                    music.buzzer.play()
                    blasterType = 2
                    if (bootsType == 1) {
                        bob.setImage(assets.image`bobBlaster2`)
                    }
                    else if (bootsType == 2) {
                        bob.setImage(assets.image`bobBlaster_boots`)
                    }

                }
            }
        }
    })
    //portal
    sprites.onOverlap(SpriteKind.Player, SpriteKind.Portal, function(bob: Sprite, portal : Sprite){
        music.magicWand.play()
        if(game.ask("Portal For New Life?")== true){
            music.stopAllSounds()
            music.play(song3, music.PlaybackMode.LoopingInBackground)
            deleteSprites = true
            portal.destroy()
            pause(100)
            level = 2
            level2Setup()
        } else{
            bob.x = bob.x + 10
        }

    
    })


//levelSetup

function level1Setup() {
    //setScene
    scene.setBackgroundColor(12)
    tiles.setTilemap(tilemap`level1`)
    bob.setPosition(16 * 3, 16 * 3)
    //alien1
    spawnAlien(5, 16, 0)
    //alien2
    spawnAlien(15 , 5, 0)
    //bobsFriend
    spawnNPC(28 , 5.5 , 1)
    //shopHelper
    spawnNPC(26 , 12 , 2)
    //alien3
    spawnAlien(45, 25, 1)
    //alien4
    spawnAlien(51, 18, 1)
    //alien5 
    spawnAlien(59, 24, 1)
    //alien6
    spawnAlien(60, 13, 1)
    //chest1
    spawnChest(5, 18.5, "coin")
    //chest2:Health
    spawnChest(45, 13, "health")
    //chest3
    spawnChest(60, 25, "coin")
    //chest4
    spawnChest(5.5, 24.5, "coin")
    //gate1
    spawnGate(45 , 35.5)
    //gate2
    spawnGate(45, 60.5)
    //bigAlien.spawn
    spawnBigAlien(52.5, 2.5, 1)
    //doogInTheHome
    spawnNPC(41, 34, 3)
    //mon-key
    for(let i = 5; i < 15; i++){
        spawnNPC(i, 37, 4)
    }
    for (let i = 7; i < 17; i++){
        spawnNPC(i, 66, 4)
    }    
    //AlienSpawner1
    spawner(28, 30)
    //spawner2
    spawner(53, 1)
    //shopKeeper2
    spawnNPC(31, 12, 5)
    //ShopHeart
    healthItem(33, 14)
    //bootsUpgrade
    bootsUpgrade(24, 12)
    //blasterUpgrade
    blasterUpgrade(24, 14)
    //portal
    spawnPortal(44, 66)
    //chests
    spawnChest(63.5, 1, "coin")
    spawnChest(28, 2, "coin")
    spawnChest(14, 33, "health")
    spawnChest(2, 62, "coin")
    spawnChest(7, 72.5, "health")
    //EndtourGuide
    spawnNPC(61, 31.5, 6)
    //startTourGuide
    spawnNPC(8, 3, 7)
    //monkeyTamer
    spawnNPC(55, 45, 8)
    //robo1
    spawnAlien2(55, 55, 1)
    spawnAlien2(44, 58, 1)
    spawnAlien2(45, 45, 1)
    spawnAlien2(29, 57, 1)
    spawnAlien2(17, 64, 1)
    spawnAlien2(16, 69, 1)
     spawnAlien2(2, 66, 1)
    spawnAlien2(11, 68, 1)
    spawnAlien2(16, 70, 1)
    //EnergyCells
    spawnCell(15.5, 51.5, 2, 1, 3)
    spawnCell(10.5, 51.5, 2, 2, 1)
    spawnCell(10.5, 45.5, 3, 3, 4)
    spawnCell(14.5, 45.5, 4, 4, 1)
    spawnCell(14.5, 42.5, 1, 5, 4)
    spawnRoboBoss(24, 44.5)
    //spawnMonkeyCompanion()

}

function level2Setup(){
    //setScene
    scene.setBackgroundColor(12)
    tiles.setTilemap(tilemap`3rd_area`)
    bob.setPosition(16 * 40, 16 * 40)
    deleteSprites = false
    game.splash("Welcome to Conundrum City")
    bob.startEffect(effects.confetti, 3500)
    //gate
    spawnGate(39, 12.5)
    spawnGate(39, 13.5)
    spawnGate(39, 14.5)
    spawnGate(39, 15.5)
    //welcomingNPCs
    spawnNPC(32.5, 49.5, 9)
    spawnNPC(48.5, 31.5, 10)
    spawnNPC(48.5, 49.5, 11)
    spawnNPC(32.5, 31.5, 12)
    spawnChest(1.5, 39, "subtract")
    spawnChest(1, 29.5, "random")
    if(monkeyCompanion == true){
        bro.setPosition(bob.x, bob.y)
    }
  
    //spawnLevers
    spawnLever(3, 3, 1)
    spawnLever(13, 3, 2)
    spawnLever(8, 8, 3)
    spawnLever(3, 15, 4)
    spawnLever(13, 15, 5)
    //spawnChests
    spawnChest(1, 42, "subtract")
    spawnChest(2, 44, "health")
    spawnChest(14, 60, "random")
    spawnChest(1, 60, "subtract")
    spawnChest(12, 52, "random")
    spawnChest(1, 47, "subtract")
    spawnChest(6, 48, "health")
    spawnChest(4, 51, "subtract")
    spawnChest(7, 53, "subtract")
    spawnChest(10, 46, "subtract")
    spawnChest(7, 57, "subtract")
    //spawnOther
    spawnNPC(13, 47, 13)
    //L-Puzzle
    spawnAlien(12, 39, 2)
    spawnAlien(2, 38, 2)
    spawnAlien(3, 33, 2)
    spawnAlien(6, 29, 2)
    spawnAlien(8, 25, 2)
    spawnAlien(8, 22, 2)
    spawnAlien(9, 19, 2)
    spawnAlien(11, 21, 2)
    //High-L-Puzzle
    spawnAlien2(7, 17, 2)
    spawnAlien2(9, 19, 2)
    spawnAlien2(7, 21, 2)
    spawnAlien2(8, 11, 2)
    spawnAlien2(2, 11, 2)
    spawnAlien2(14, 10, 2)
    spawnAlien2(14, 15, 2)
    spawnAlien2(12, 12, 2)
}




//runGame
level1Setup()


//backgroundMusic
let song = music.createSong(assets.song`Background Music`)
music.setVolume(40)
music.play(song, music.PlaybackMode.LoopingInBackground)

//boss.Music
let song2 = music.createSong(assets.song`bossMusic`)

//awesome3rdAreaMusic
let song3 = music.createSong(assets.song`3rd_area_song`)

