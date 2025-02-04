function setRocket () {
    if (rocket_costume == ":") {
        rocket_costume = ";"
    } else {
        rocket_costume = ":"
    }
    I2C_LCD1602.ShowString(rocket_costume, 0, y_pos)
}
function setEnemies () {
    for (let Index = 0; Index <= enemy_x.length - 1; Index++) {
        enemy_x[Index] = enemy_x[Index] - 1
        I2C_LCD1602.ShowString("<", enemy_x[Index], ememy_y[Index])
    }
}
let timer = 0
let toggle_y = 0
let y_pos = 0
let enemy_x: number[] = []
let ememy_y: number[] = []
let rocket_costume = ""
I2C_LCD1602.LcdInit(0)
I2C_LCD1602.BacklightOn()
rocket_costume = ";"
ememy_y = [0]
enemy_x = [15]
basic.forever(function () {
    if (input.pinIsPressed(TouchPin.P0)) {
        toggle_y += 1
    } else {
        toggle_y = 0
    }
    if (toggle_y == 1) {
        y_pos = 1 - y_pos
    }
    if (timer > 20) {
        timer = 0
        I2C_LCD1602.clear()
        setRocket()
        setEnemies()
    }
    timer += 1
    basic.pause(5)
})
