let mode = 0
const MAX_MODE = 2

// ====== GOMBOK – MÓDVÁLTÁS ======
input.onButtonPressed(Button.A, function () {
    mode--
        if (mode < 0) mode = MAX_MODE
            showMode()
            })

            input.onButtonPressed(Button.B, function () {
                mode++
                    if (mode > MAX_MODE) mode = 0
                        showMode()
                        })

                        function showMode() {
                            basic.showNumber(mode)
                                basic.pause(500)
                                    basic.clearScreen()
                                    }

                                    // ====== MOTORVEZÉRLÉS ======
                                    function motorForward() {
                                        pins.digitalWritePin(DigitalPin.P8, 1)
                                            pins.digitalWritePin(DigitalPin.P12, 1)
                                            }

                                            function motorStop() {
                                                pins.digitalWritePin(DigitalPin.P8, 0)
                                                    pins.digitalWritePin(DigitalPin.P12, 0)
                                                    }

                                                    function motorLeft() {
                                                        pins.digitalWritePin(DigitalPin.P8, 0)
                                                            pins.digitalWritePin(DigitalPin.P12, 1)
                                                            }

                                                            function motorRight() {
                                                                pins.digitalWritePin(DigitalPin.P8, 1)
                                                                    pins.digitalWritePin(DigitalPin.P12, 0)
                                                                    }

                                                                    // ====== 0 – FOLLOW ME ======
                                                                    function followMeMode() {
                                                                        // Tobbie II IR érzékelő (általában P1)
                                                                            if (pins.digitalReadPin(DigitalPin.P1) == 0) {
                                                                                    motorForward()
                                                                                        } else {
                                                                                                motorStop()
                                                                                                    }
                                                                                                    }

                                                                                                    // ====== 1 – KŐ PAPÍR OLLÓ ======
                                                                                                    let rpsReady = true

                                                                                                    input.onGesture(Gesture.Shake, function () {
                                                                                                        if (mode == 1 && rpsReady) {
                                                                                                                rpsReady = false
                                                                                                                        let r = randint(0, 2)

                                                                                                                                if (r == 0) {
                                                                                                                                            // KŐ
                                                                                                                                                        basic.showIcon(IconNames.Square)
                                                                                                                                                                } else if (r == 1) {
                                                                                                                                                                            // PAPÍR
                                                                                                                                                                                        basic.showIcon(IconNames.SmallSquare)
                                                                                                                                                                                                } else {
                                                                                                                                                                                                            // OLLÓ
                                                                                                                                                                                                                        basic.showIcon(IconNames.Scissors)
                                                                                                                                                                                                                                }

                                                                                                                                                                                                                                        basic.pause(2000)
                                                                                                                                                                                                                                                basic.clearScreen()
                                                                                                                                                                                                                                                        rpsReady = true
                                                                                                                                                                                                                                                            }
                                                                                                                                                                                                                                                            })

                                                                                                                                                                                                                                                            // ====== 2 – BOWLING ======
                                                                                                                                                                                                                                                            function bowlingMode() {
                                                                                                                                                                                                                                                                // Ütközés érzékelő (IR / bumper)
                                                                                                                                                                                                                                                                    if (pins.digitalReadPin(DigitalPin.P1) == 0) {
                                                                                                                                                                                                                                                                            motorStop()
                                                                                                                                                                                                                                                                                    basic.showIcon(IconNames.Skull)
                                                                                                                                                                                                                                                                                            basic.pause(1000)
                                                                                                                                                                                                                                                                                                    basic.clearScreen()
                                                                                                                                                                                                                                                                                                        } else {
                                                                                                                                                                                                                                                                                                                motorForward()
                                                                                                                                                                                                                                                                                                                    }
                                                                                                                                                                                                                                                                                                                    }

                                                                                                                                                                                                                                                                                                                    // ====== FŐ CIKLUS ======
                                                                                                                                                                                                                                                                                                                    basic.forever(function () {
                                                                                                                                                                                                                                                                                                                        if (mode == 0) {
                                                                                                                                                                                                                                                                                                                                followMeMode()
                                                                                                                                                                                                                                                                                                                                    } else if (mode == 1) {
                                                                                                                                                                                                                                                                                                                                            motorStop()
                                                                                                                                                                                                                                                                                                                                                } else if (mode == 2) {
                                                                                                                                                                                                                                                                                                                                                        bowlingMode()
                                                                                                                                                                                                                                                                                                                                                            }
                                                                                                                                                                                                                                                                                                                                                            })