"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CPU_1 = require("./CPU");
var Motherboard = /** @class */ (function () {
    function Motherboard(cpuSocket, chipset, memorySlots, memoryMax, memorySpeed, memoryType, multigpusupport, PCIeSlots, PCIeSpeed, M2Slots, SataSlots, SataSpeed, lanController, lanSpeed, secondLanController, secondLanSpeed, wirelessController, wirelessSpeed, wirelessFrequency, bluetoothVersion, audioController, usb32Ports, usb31Ports, usb30Ports, usb20Ports) {
        this.cpuSocket = cpuSocket;
        this.chipset = chipset;
        this.memorySlots = memorySlots || 4;
        this.memoryMax = memoryMax || 32;
        this.memorySpeed = memorySpeed;
        this.memoryType = memoryType || "DDR4";
        this.multiGpuSupport = multigpusupport;
        this.PCIeSlots = PCIeSlots || 3;
        this.PCIeSpeed = PCIeSpeed || [16, 4];
        this.M2Slots = M2Slots || 1;
        this.SataSlots = SataSlots || 4;
        this.SataSpeed = SataSpeed || 6;
        this.lanController = lanController;
        this.lanSpeed = lanSpeed;
        this.secondLanController = secondLanController || undefined;
        this.secondLanSpeed = secondLanSpeed || undefined;
        this.wirelessController = wirelessController || undefined;
        this.wirelessSpeed = wirelessSpeed || undefined;
        this.wirelessFrequency = wirelessFrequency || undefined;
        this.bluetoothVersion = bluetoothVersion || undefined;
        this.audioController = audioController;
        this.usb32Ports = usb32Ports || 0;
        this.usb31Ports = usb31Ports || 0;
        this.usb30Ports = usb30Ports || 0;
        this.usb20Ports = usb20Ports || 2;
        this.cpu = undefined;
        this.gpu = undefined;
        this.ram = undefined;
    }
    Motherboard.prototype.insertToConnector = function (ComponentConnector, Component) {
        this[ComponentConnector] = Component;
    };
    return Motherboard;
}());
// @ts-ignore
var mb = new Motherboard();
var cpu = new CPU_1.CPU("Intel Core i9-10900k");
mb.insertToConnector("cpu", cpu);
console.log(mb.cpu.name);
