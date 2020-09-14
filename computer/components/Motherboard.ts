import {CPU} from './CPU';
import {RAM} from './RAM';
import {GPU} from './GPU';

class Motherboard {
    // Cpu
    cpuSocket: number
    chipset: string
    // Memory
    memorySlots: number
    memoryMax: number
    memoryType: string
    memorySpeed: number[]
    // Gpu
    multiGpuSupport: string[]
    // Expansion Slots
    PCIeSlots: number
    PCIeSpeed: number[]
    // Storage
    M2Slots: number
    SataSlots: number
    SataSpeed: number
    // Lan
    lanController: string
    lanSpeed: number
    secondLanController: string
    secondLanSpeed: number
    // Wireless
    wirelessController: string
    wirelessSpeed: number
    wirelessFrequency: number
    //Bluetooth
    bluetoothVersion: number
    // Audio
    audioController: string
    // Usb Ports
    usb32Ports: number
    usb31Ports: number
    usb30Ports: number
    usb20Ports: number

    //Onboard Connectors
    cpu: CPU
    gpu: GPU
    ram: RAM

    constructor(cpuSocket: number, chipset: string, memorySlots: number, memoryMax: number,
                memorySpeed: number[], memoryType: string, multigpusupport: string[],
                PCIeSlots: number, PCIeSpeed: number[], M2Slots:number, SataSlots:number,SataSpeed:number,
                lanController: string, lanSpeed: number, secondLanController:string, secondLanSpeed:number,
                wirelessController: string, wirelessSpeed: number,wirelessFrequency:number,
                bluetoothVersion: number, audioController: string,
                usb32Ports: number,usb31Ports: number,usb30Ports: number,usb20Ports: number) {
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
    insertToConnector(ComponentConnector: string, Component: any) {
        this[ComponentConnector] = Component;
    }
}
// @ts-ignore
let mb = new Motherboard();
let cpu = new CPU("Intel Core i9-10900k");
mb.insertToConnector("cpu", cpu);
console.log(mb.cpu.name)