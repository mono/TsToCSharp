interface AudioListener {
    setOrientation(x: number, y: number, z: number, xUp: number, yUp: number, zUp: number): void;
    setPosition(x: number, y: number, z: number): void;
    setVelocity(x: number, y: number, z: number): void;
}

declare var AudioListener:
{
    prototype: AudioListener;
    new(): AudioListener;
};
