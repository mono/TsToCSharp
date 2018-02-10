interface Gamepad {
    readonly axes: number[];
    readonly buttons: GamepadButton[];
    readonly connected: boolean;
    readonly id: string;
    readonly index: number;
    readonly mapping: string;
    readonly timestamp: number;
}
