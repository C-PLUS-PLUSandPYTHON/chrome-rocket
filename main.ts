function setRocket () {
    rocket_costume = ":-:"
    I2C_LCD1602.ShowString("   ", 0, 1 - y_pos)
    I2C_LCD1602.ShowString(rocket_costume, 0, y_pos)
}
function setEnemies () {
    for (let Index = 0; Index <= enemy_x.length - 1; Index++) {
        enemy_x[Index] = enemy_x[Index] - 1
        if (enemy_x[Index] <= 12) {
            if (enemy_x[Index] == -1) {
                I2C_LCD1602.ShowString(" ", 1, ememy_y[Index])
                I2C_LCD1602.ShowString(":", 0, ememy_y[Index])
            } else {
                if (enemy_x[Index] == 12) {
                    I2C_LCD1602.ShowString(":", 12, ememy_y[Index])
                } else {
                    I2C_LCD1602.ShowString("  ", 1 + enemy_x[Index], ememy_y[Index])
                    I2C_LCD1602.ShowString("::", enemy_x[Index], ememy_y[Index])
                }
            }
        }
        if (y_pos == ememy_y[Index]) {
            if (enemy_x[Index] <= 3) {
                game_over = true
            }
        }
        if (enemy_x[Index] <= -1) {
            score += 1
            enemy_x.removeAt(Index)
            ememy_y.removeAt(Index)
            enemy_x.push(15)
            ememy_y.push(randint(0, 1))
        }
    }
}
let timer = 0
let toggle_y = 0
let y_pos = 0
let game_over = false
let enemy_x: number[] = []
let ememy_y: number[] = []
let rocket_costume = ""
I2C_LCD1602.LcdInit(0)
I2C_LCD1602.BacklightOn()
rocket_costume = ":>"
ememy_y = [0, 1]
enemy_x = [15, 23]
game_over = false
let score = 0
basic.forever(function () {
    if (game_over) {
        music.play(music.stringPlayable("C5 A B G A F G E ", 120), music.PlaybackMode.UntilDone)
        I2C_LCD1602.clear()
        I2C_LCD1602.ShowString("GAME OVER!", 0, 0)
        I2C_LCD1602.ShowString("Press to Play", 3, 1)
        basic.showLeds(`
            # . . . #
            . # . # .
            . . # . .
            . # . # .
            # . . . #
            `)
        basic.pause(200)
        basic.showNumber(score)
        while (!(input.pinIsPressed(TouchPin.P0))) {
        	
        }
        basic.showLeds(`
            . . . . .
            . . . . .
            . . . . .
            . . . . .
            . . . . .
            `)
        basic.pause(50)
        I2C_LCD1602.LcdInit(0)
        I2C_LCD1602.BacklightOn()
        rocket_costume = ":>"
        ememy_y = [0, 1]
        enemy_x = [15, 23]
        game_over = false
        score = 0
    } else {
        if (input.pinIsPressed(TouchPin.P0)) {
            toggle_y += 1
        } else {
            toggle_y = 0
        }
        if (toggle_y == 1) {
            y_pos = 1 - y_pos
        }
        if (timer > 5) {
            timer = 0
            setRocket()
            setEnemies()
            I2C_LCD1602.ShowString("|", 13, 0)
            I2C_LCD1602.ShowString("|", 13, 1)
            I2C_LCD1602.ShowNumber(score, 14, 0)
        }
        timer += 1
        basic.pause(5)
    }
})
