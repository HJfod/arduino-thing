# Configuration
5V => <Coin> => Pin 3
Pin 5 => Led => 220Ω Resistor => Gnd
5V => Button => Pin 4 (button configuration is hard, prolly won't work)

Arduino IDE: File => Examples => Firmata => StandardFirmata ▶ Upload to board, afterwards no need to touch AIDE ever again

If board is connected to a different port than COM3, edit in index.js at line 29
```js
const board = new five.Board({ port: '<your-port-name-here>' });
```