interface AudioListener {
    dopplerFactor: number;
    speedOfSound: number;
}

declare var AudioListener:
{
    prototype: AudioListener;
    new(): AudioListener;
};
