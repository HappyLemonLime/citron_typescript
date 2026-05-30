/*!
Copyright (c) 2012-2022 John Nesky and contributing authors

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in 
the Software without restriction, including without limitation the rights to 
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies 
of the Software, and to permit persons to whom the Software is furnished to do 
so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all 
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR 
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, 
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE 
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER 
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, 
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE 
SOFTWARE.
*/

export interface Dictionary<T> {
    [K: string]: T;
}

export interface DictionaryArray<T> extends ReadonlyArray<T> {
    dictionary: Dictionary<T>;
}

export const enum FilterType {
    lowPass,
    highPass,
    peak,
    length,
}

export const enum SustainType {
	bright,
	acoustic,
	length,
}

export const enum EnvelopeType {
    noteSize,
    none,
    punch,
    flare,
    twang,
    swell,
    tremolo,
    tremolo2,
    decay,
    blip
}

export const enum InstrumentType {
    chip,
    fm,
    noise,
    spectrum,
    drumset,
    harmonics,
    pwm,
    pickedString,
    supersaw,
    customChipWave,
    mod,
    length,
}

export const enum DropdownID {
    Vibrato = 0,
    Pan = 1,
    Chord = 2,
    Transition = 3,
    FM = 4,
    Envelope = 5,

}

export const enum EffectType {
    reverb,
    chorus,
    panning,
    distortion,
    bitcrusher,
    noteFilter,
    echo,
    pitchShift,
    detune,
    vibrato,
    transition,
    chord,
    // If you add more, you'll also have to extend the bitfield used in Base64 which currently uses two six-bit characters.
    length,
}

export const enum EnvelopeComputeIndex {
    noteVolume,
    noteFilterAllFreqs,
    pulseWidth,
    stringSustain,
    unison,
    operatorFrequency0, operatorFrequency1, operatorFrequency2, operatorFrequency3,
    operatorAmplitude0, operatorAmplitude1, operatorAmplitude2, operatorAmplitude3,
    feedbackAmplitude,
    pitchShift,
    detune,
    vibratoDepth,
    noteFilterFreq0, noteFilterFreq1, noteFilterFreq2, noteFilterFreq3, noteFilterFreq4, noteFilterFreq5, noteFilterFreq6, noteFilterFreq7,
    noteFilterGain0, noteFilterGain1, noteFilterGain2, noteFilterGain3, noteFilterGain4, noteFilterGain5, noteFilterGain6, noteFilterGain7,
    supersawDynamism,
	supersawSpread,
	supersawShape,
    length,
}

/*
export const enum InstrumentAutomationIndex {
    mixVolume,
    eqFilterAllFreqs,
    eqFilterFreq0, eqFilterFreq1, eqFilterFreq2, eqFilterFreq3, eqFilterFreq4, eqFilterFreq5, eqFilterFreq6, eqFilterFreq7,
    eqFilterGain0, eqFilterGain1, eqFilterGain2, eqFilterGain3, eqFilterGain4, eqFilterGain5, eqFilterGain6, eqFilterGain7,
    distortion,
    bitcrusherQuantization,
    bitcrusherFrequency,
    panning,
    chorus,
    echoSustain,
    //echoDelay, // Wait until tick settings can be computed once for multiple run lengths.
    reverb,
    length,
}
*/

export interface BeepBoxOption {
    readonly index: number;
    readonly name: string;
}

export interface Scale extends BeepBoxOption {
    readonly flags: ReadonlyArray<boolean>;
    readonly realName: string;
}

export interface Key extends BeepBoxOption {
    readonly isWhiteKey: boolean;
    readonly basePitch: number;
}

export interface Rhythm extends BeepBoxOption {
    readonly stepsPerBeat: number;
    readonly roundUpThresholds: number[] | null;
}

export interface ChipWave extends BeepBoxOption {
    readonly expression: number;
    samples: Float32Array;
}

export interface OperatorWave extends BeepBoxOption {
    samples: Float32Array;
}

export interface ChipNoise extends BeepBoxOption {
    readonly expression: number;
    readonly basePitch: number;
    readonly pitchFilterMult: number;
    readonly isSoft: boolean;
    samples: Float32Array | null;
}

export interface Transition extends BeepBoxOption {
    readonly isSeamless: boolean;
    readonly continues: boolean;
    readonly slides: boolean;
    readonly slideTicks: number;
    readonly includeAdjacentPatterns: boolean;
}

export interface Vibrato extends BeepBoxOption {
    readonly amplitude: number;
    readonly type: number;
    readonly delayTicks: number;
}

export interface VibratoType extends BeepBoxOption {
    readonly periodsSeconds: number[];
    readonly period: number;
}

export interface Unison extends BeepBoxOption {
    readonly voices: number;
    readonly spread: number;
    readonly offset: number;
    readonly expression: number;
    readonly sign: number;
}

export interface Modulator extends BeepBoxOption {
    readonly name: string; // name that shows up in song editor UI
    readonly pianoName: string; // short name that shows up in mod piano UI
    readonly maxRawVol: number; // raw
    readonly newNoteVol: number; // raw
    readonly forSong: boolean; // true - setting is song scope
    convertRealFactor: number; // offset that needs to be applied to get a "real" number display of value, for UI purposes
    readonly associatedEffect: EffectType; // effect that should be enabled for this modulator to work properly. If unused, set to EffectType.length.
    readonly promptName: string; // long-as-needed name that shows up in tip prompt
    readonly promptDesc: string[]; // paragraph(s) describing how to use this mod

}

export interface Chord extends BeepBoxOption {
    readonly customInterval: boolean;
    readonly arpeggiates: boolean;
    readonly strumParts: number;
    readonly singleTone: boolean;
}

export interface Algorithm extends BeepBoxOption {
    readonly carrierCount: number;
    readonly associatedCarrier: ReadonlyArray<number>;
    readonly modulatedBy: ReadonlyArray<ReadonlyArray<number>>;
}

export interface OperatorFrequency extends BeepBoxOption {
    readonly mult: number;
    readonly hzOffset: number;
    readonly amplitudeSign: number;
}

export interface Feedback extends BeepBoxOption {
    readonly indices: ReadonlyArray<ReadonlyArray<number>>;
}

export interface Envelope extends BeepBoxOption {
    readonly type: EnvelopeType;
    readonly speed: number;
}

export interface AutomationTarget extends BeepBoxOption {
    readonly computeIndex: EnvelopeComputeIndex /*| InstrumentAutomationIndex*/ | null;
    readonly displayName: string;
    //readonly perNote: boolean; // Whether to compute envelopes on a per-note basis.
    readonly interleave: boolean; // Whether to interleave this target with the next one in the menu (e.g. filter frequency and gain).
	readonly isFilter: boolean; // Filters are special because the maxCount depends on other instrument settings.
	//readonly range: number | null; // set if automation is allowed.
    readonly maxCount: number;
    readonly effect: EffectType | null;
    readonly compatibleInstruments: InstrumentType[] | null;
}

export class Config {
    // Params for post-processing compressor
    public static thresholdVal: number = -10;
    public static kneeVal: number = 40;
    public static ratioVal: number = 12;
    public static attackVal: number = 0;
    public static releaseVal: number = 0.25;

    public static readonly scales: DictionaryArray<Scale> = toNameMap([

        //   C     Db      D     Eb      E      F     F#      G     Ab      A     Bb      B      C
        { name: "Free", realName: "chromatic", flags: [true, true, true, true, true, true, true, true, true, true, true, true] }, // Free
        { name: "Major", realName: "ionian", flags: [true, false, true, false, true, true, false, true, false, true, false, true] }, // Major
        { name: "Minor", realName: "aeolian", flags: [true, false, true, true, false, true, false, true, true, false, true, false] }, // Minor
        { name: "Mixolydian", realName: "mixolydian", flags: [true, false, true, false, true, true, false, true, false, true, true, false] }, // Mixolydian
        { name: "Lydian", realName: "lydian", flags: [true, false, true, false, true, false, true, true, false, true, false, true] }, // Lydian
        { name: "Dorian", realName: "dorian", flags: [true, false, true, true, false, true, false, true, false, true, true, false] }, // Dorian
        { name: "Phrygian", realName: "phrygian", flags: [true, true, false, true, false, true, false, true, true, false, true, false] }, // Phrygian
        { name: "Locrian", realName: "locrian", flags: [true, true, false, true, false, true, true, false, true, false, true, false] }, // Locrian
        { name: "Lydian Dominant", realName: "lydian dominant", flags: [true, false, true, false, true, false, true, true, false, true, true, false] }, // Lydian Dominant
        { name: "Phrygian Dominant", realName: "phrygian dominant", flags: [true, true, false, false, true, true, false, true, true, false, true, false] }, // Phrygian Dominant
        { name: "Harmonic Major", realName: "harmonic major", flags: [true, false, true, false, true, true, false, true, true, false, false, true] }, // Harmonic Major
        { name: "Harmonic Minor", realName: "harmonic minor", flags: [true, false, true, true, false, true, false, true, true, false, false, true] }, // Harmonic Minor
        { name: "Melodic Minor", realName: "melodic minor", flags: [true, false, true, true, false, true, false, true, false, true, false, true] }, // Melodic Minor
        { name: "Blues", realName: "blues", flags: [true, false, false, true, false, true, true, true, false, false, true, false] }, // Blues
        { name: "Altered", realName: "altered", flags: [true, true, false, true, true, false, true, false, true, false, true, false] }, // Altered
        { name: "Major Pentatonic", realName: "major pentatonic", flags: [true, false, true, false, true, false, false, true, false, true, false, false] }, // Major Pentatonic
        { name: "Minor Pentatonic", realName: "minor pentatonic", flags: [true, false, false, true, false, true, false, true, false, false, true, false] }, // Minor Pentatonic
        { name: "Whole Tone", realName: "whole tone", flags: [true, false, true, false, true, false, true, false, true, false, true, false] }, // Whole Tone
        { name: "Octatonic", realName: "octatonic", flags: [true, false, true, true, false, true, true, false, true, true, false, true] }, // Octatonic
        { name: "Hexatonic", realName: "hexatonic", flags: [true, false, false, true, true, false, false, true, true, false, false, true] }, // Hexatonic


    ]);
    public static readonly keys: DictionaryArray<Key> = toNameMap([
        { name: "C", isWhiteKey: true, basePitch: 12 }, // C0 has index 12 on the MIDI scale. C7 is 96, and C9 is 120. C10 is barely in the audible range.
        { name: "C♯", isWhiteKey: false, basePitch: 13 },
        { name: "D", isWhiteKey: true, basePitch: 14 },
        { name: "D♯", isWhiteKey: false, basePitch: 15 },
        { name: "E", isWhiteKey: true, basePitch: 16 },
        { name: "F", isWhiteKey: true, basePitch: 17 },
        { name: "F♯", isWhiteKey: false, basePitch: 18 },
        { name: "G", isWhiteKey: true, basePitch: 19 },
        { name: "G♯", isWhiteKey: false, basePitch: 20 },
        { name: "A", isWhiteKey: true, basePitch: 21 },
        { name: "A♯", isWhiteKey: false, basePitch: 22 },
        { name: "B", isWhiteKey: true, basePitch: 23 },
    ]);
    public static readonly blackKeyNameParents: ReadonlyArray<number> = [-1, 1, -1, 1, -1, 1, -1, -1, 1, -1, 1, -1];
    public static readonly tempoMin: number = 1;
    public static readonly tempoMax: number = 1000;
    public static readonly echoDelayRange: number = 24;
    public static readonly echoDelayStepTicks: number = 4;
    public static readonly echoSustainRange: number = 8;
    public static readonly echoShelfHz: number = 4000.0; // The cutoff freq of the shelf filter that is used to decay echoes.
    public static readonly echoShelfGain: number = Math.pow(2.0, -0.5);
    public static readonly reverbShelfHz: number = 8000.0; // The cutoff freq of the shelf filter that is used to decay reverb.
    public static readonly reverbShelfGain: number = Math.pow(2.0, -1.5);
    public static readonly reverbRange: number = 32;
    public static readonly reverbDelayBufferSize: number = 16384; // TODO: Compute a buffer size based on sample rate.
    public static readonly reverbDelayBufferMask: number = Config.reverbDelayBufferSize - 1; // TODO: Compute a buffer size based on sample rate.
    public static readonly beatsPerBarMin: number = 3;
    public static readonly beatsPerBarMax: number = 16;
    public static readonly barCountMin: number = 1;
    public static readonly barCountMax: number = 256;
    public static readonly instrumentCountMin: number = 1;
    public static readonly layeredInstrumentCountMax: number = 4;
    public static readonly patternInstrumentCountMax: number = 10;
    public static readonly partsPerBeat: number = 24;
    public static readonly ticksPerPart: number = 2;
    public static readonly ticksPerArpeggio: number = 3;
    public static readonly arpeggioPatterns: ReadonlyArray<ReadonlyArray<number>> = [[0], [0, 1], [0, 1, 2, 1], [0, 1, 2, 3], [0, 1, 2, 3, 4], [0, 1, 2, 3, 4, 5], [0, 1, 2, 3, 4, 5, 6], [0, 1, 2, 3, 4, 5, 6, 7]];
    public static readonly rhythms: DictionaryArray<Rhythm> = toNameMap([
        { name: "÷3 (triplets)", stepsPerBeat: 3, /*ticksPerArpeggio: 4, arpeggioPatterns: [[0], [0, 0, 1, 1], [0, 1, 2, 1], [0, 1, 2, 3]]*/ roundUpThresholds: [/*0*/ 5, /*8*/ 12, /*16*/ 18 /*24*/] },
        { name: "÷4 (standard)", stepsPerBeat: 4, /*ticksPerArpeggio: 3, arpeggioPatterns: [[0], [0, 0, 1, 1], [0, 1, 2, 1], [0, 1, 2, 3]]*/ roundUpThresholds: [/*0*/ 3, /*6*/ 9, /*12*/ 17, /*18*/ 21 /*24*/] },
        { name: "÷6", stepsPerBeat: 6, /*ticksPerArpeggio: 4, arpeggioPatterns: [[0], [0, 1], [0, 1, 2, 1], [0, 1, 2, 3]]*/ roundUpThresholds: null },
        { name: "÷8", stepsPerBeat: 8, /*ticksPerArpeggio: 3, arpeggioPatterns: [[0], [0, 1], [0, 1, 2, 1], [0, 1, 2, 3]]*/ roundUpThresholds: null },
        { name: "freehand", stepsPerBeat: 24, /*ticksPerArpeggio: 3, arpeggioPatterns: [[0], [0, 1], [0, 1, 2, 1], [0, 1, 2, 3]]*/ roundUpThresholds: null },
    ]);

    public static readonly instrumentTypeNames: ReadonlyArray<string> = ["chip", "FM", "noise", "spectrum", "drumset", "harmonics", "PWM", "Picked String", "supersaw", "custom chip", "mod"];
    public static readonly instrumentTypeHasSpecialInterval: ReadonlyArray<boolean> = [true, true, false, false, false, true, false, false, false, false];
    public static readonly chipBaseExpression: number = 0.03375; // Doubled by unison feature, but affected by expression adjustments per unison setting and wave shape.
    public static readonly fmBaseExpression: number = 0.03;
    public static readonly noiseBaseExpression: number = 0.19;
    public static readonly spectrumBaseExpression: number = 0.3; // Spectrum can be in pitch or noise channels, the expression is doubled for noise.
    public static readonly drumsetBaseExpression: number = 0.45; // Drums tend to be loud but brief!
    public static readonly harmonicsBaseExpression: number = 0.025;
    public static readonly pwmBaseExpression: number = 0.04725; // It's actually closer to half of this, the synthesized pulse amplitude range is only .5 to -.5, but also note that the fundamental sine partial amplitude of a square wave is 4/π times the measured square wave amplitude.
    public static readonly supersawBaseExpression:  number = 0.061425; // It's actually closer to half of this, the synthesized sawtooth amplitude range is only .5 to -.5.
    public static readonly pickedStringBaseExpression: number = 0.025; // Same as harmonics.
    public static readonly distortionBaseVolume: number = 0.011; // Distortion is not affected by pitchDamping, which otherwise approximately halves expression for notes around the middle of the range.
    public static readonly bitcrusherBaseVolume: number = 0.010; // Also not affected by pitchDamping, used when bit crushing is maxed out (aka "1-bit" output).

    public static readonly rawChipWaves: DictionaryArray<ChipWave> = toNameMap([
        { name: "rounded", expression: 0.94, samples: centerWave([0.0, 0.2, 0.4, 0.5, 0.6, 0.7, 0.8, 0.85, 0.9, 0.95, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 0.95, 0.9, 0.85, 0.8, 0.7, 0.6, 0.5, 0.4, 0.2, 0.0, -0.2, -0.4, -0.5, -0.6, -0.7, -0.8, -0.85, -0.9, -0.95, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -0.95, -0.9, -0.85, -0.8, -0.7, -0.6, -0.5, -0.4, -0.2]) },
        { name: "triangle", expression: 1.0, samples: centerWave([1.0 / 15.0, 3.0 / 15.0, 5.0 / 15.0, 7.0 / 15.0, 9.0 / 15.0, 11.0 / 15.0, 13.0 / 15.0, 15.0 / 15.0, 15.0 / 15.0, 13.0 / 15.0, 11.0 / 15.0, 9.0 / 15.0, 7.0 / 15.0, 5.0 / 15.0, 3.0 / 15.0, 1.0 / 15.0, -1.0 / 15.0, -3.0 / 15.0, -5.0 / 15.0, -7.0 / 15.0, -9.0 / 15.0, -11.0 / 15.0, -13.0 / 15.0, -15.0 / 15.0, -15.0 / 15.0, -13.0 / 15.0, -11.0 / 15.0, -9.0 / 15.0, -7.0 / 15.0, -5.0 / 15.0, -3.0 / 15.0, -1.0 / 15.0]) },
        { name: "square", expression: 0.5, samples: centerWave([1.0, -1.0]) },
        { name: "1/4 pulse", expression: 0.5, samples: centerWave([1.0, -1.0, -1.0, -1.0]) },
        { name: "1/8 pulse", expression: 0.5, samples: centerWave([1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0]) },
        { name: "sawtooth", expression: 0.65, samples: centerWave([1.0 / 31.0, 3.0 / 31.0, 5.0 / 31.0, 7.0 / 31.0, 9.0 / 31.0, 11.0 / 31.0, 13.0 / 31.0, 15.0 / 31.0, 17.0 / 31.0, 19.0 / 31.0, 21.0 / 31.0, 23.0 / 31.0, 25.0 / 31.0, 27.0 / 31.0, 29.0 / 31.0, 31.0 / 31.0, -31.0 / 31.0, -29.0 / 31.0, -27.0 / 31.0, -25.0 / 31.0, -23.0 / 31.0, -21.0 / 31.0, -19.0 / 31.0, -17.0 / 31.0, -15.0 / 31.0, -13.0 / 31.0, -11.0 / 31.0, -9.0 / 31.0, -7.0 / 31.0, -5.0 / 31.0, -3.0 / 31.0, -1.0 / 31.0]) },
        { name: "double saw", expression: 0.5, samples: centerWave([0.0, -0.2, -0.4, -0.6, -0.8, -1.0, 1.0, -0.8, -0.6, -0.4, -0.2, 1.0, 0.8, 0.6, 0.4, 0.2]) },
        { name: "double pulse", expression: 0.4, samples: centerWave([1.0, 1.0, 1.0, 1.0, 1.0, -1.0, -1.0, -1.0, 1.0, 1.0, 1.0, 1.0, -1.0, -1.0, -1.0, -1.0]) },
        { name: "spiky", expression: 0.4, samples: centerWave([1.0, -1.0, 1.0, -1.0, 1.0, 0.0]) },
        { name: "sine", expression: 0.88, samples: centerAndNormalizeWave([8.0, 9.0, 11.0, 12.0, 13.0, 14.0, 15.0, 15.0, 15.0, 15.0, 14.0, 14.0, 13.0, 11.0, 10.0, 9.0, 7.0, 6.0, 4.0, 3.0, 2.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 1.0, 2.0, 4.0, 5.0, 6.0]) },
        { name: "flute", expression: 0.8, samples: centerAndNormalizeWave([3.0, 4.0, 6.0, 8.0, 10.0, 11.0, 13.0, 14.0, 15.0, 15.0, 14.0, 13.0, 11.0, 8.0, 5.0, 3.0]) },
        { name: "harp", expression: 0.8, samples: centerAndNormalizeWave([0.0, 3.0, 3.0, 3.0, 4.0, 5.0, 5.0, 6.0, 7.0, 8.0, 9.0, 11.0, 11.0, 13.0, 13.0, 15.0, 15.0, 14.0, 12.0, 11.0, 10.0, 9.0, 8.0, 7.0, 7.0, 5.0, 4.0, 3.0, 2.0, 1.0, 0.0, 0.0]) },
        { name: "sharp clarinet", expression: 0.38, samples: centerAndNormalizeWave([0.0, 0.0, 0.0, 1.0, 1.0, 8.0, 8.0, 9.0, 9.0, 9.0, 8.0, 8.0, 8.0, 8.0, 8.0, 9.0, 9.0, 7.0, 9.0, 9.0, 10.0, 4.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0]) },
        { name: "soft clarinet", expression: 0.45, samples: centerAndNormalizeWave([0.0, 1.0, 5.0, 8.0, 9.0, 9.0, 9.0, 9.0, 9.0, 9.0, 9.0, 11.0, 11.0, 12.0, 13.0, 12.0, 10.0, 9.0, 7.0, 6.0, 4.0, 3.0, 3.0, 3.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0]) },
        { name: "alto sax", expression: 0.3, samples: centerAndNormalizeWave([5.0, 5.0, 6.0, 4.0, 3.0, 6.0, 8.0, 7.0, 2.0, 1.0, 5.0, 6.0, 5.0, 4.0, 5.0, 7.0, 9.0, 11.0, 13.0, 14.0, 14.0, 14.0, 14.0, 13.0, 10.0, 8.0, 7.0, 7.0, 4.0, 3.0, 4.0, 2.0]) },
        { name: "bassoon", expression: 0.35, samples: centerAndNormalizeWave([9.0, 9.0, 7.0, 6.0, 5.0, 4.0, 4.0, 4.0, 4.0, 5.0, 7.0, 8.0, 9.0, 10.0, 11.0, 13.0, 13.0, 11.0, 10.0, 9.0, 7.0, 6.0, 4.0, 2.0, 1.0, 1.0, 1.0, 2.0, 2.0, 5.0, 11.0, 14.0]) },
        { name: "trumpet", expression: 0.22, samples: centerAndNormalizeWave([10.0, 11.0, 8.0, 6.0, 5.0, 5.0, 5.0, 6.0, 7.0, 7.0, 7.0, 7.0, 6.0, 6.0, 7.0, 7.0, 7.0, 7.0, 7.0, 6.0, 6.0, 6.0, 6.0, 6.0, 6.0, 6.0, 6.0, 7.0, 8.0, 9.0, 11.0, 14.0]) },
        { name: "electric guitar", expression: 0.2, samples: centerAndNormalizeWave([11.0, 12.0, 12.0, 10.0, 6.0, 6.0, 8.0, 0.0, 2.0, 4.0, 8.0, 10.0, 9.0, 10.0, 1.0, 7.0, 11.0, 3.0, 6.0, 6.0, 8.0, 13.0, 14.0, 2.0, 0.0, 12.0, 8.0, 4.0, 13.0, 11.0, 10.0, 13.0]) },
        { name: "organ", expression: 0.2, samples: centerAndNormalizeWave([11.0, 10.0, 12.0, 11.0, 14.0, 7.0, 5.0, 5.0, 12.0, 10.0, 10.0, 9.0, 12.0, 6.0, 4.0, 5.0, 13.0, 12.0, 12.0, 10.0, 12.0, 5.0, 2.0, 2.0, 8.0, 6.0, 6.0, 5.0, 8.0, 3.0, 2.0, 1.0]) },
        { name: "pan flute", expression: 0.35, samples: centerAndNormalizeWave([1.0, 4.0, 7.0, 6.0, 7.0, 9.0, 7.0, 7.0, 11.0, 12.0, 13.0, 15.0, 13.0, 11.0, 11.0, 12.0, 13.0, 10.0, 7.0, 5.0, 3.0, 6.0, 10.0, 7.0, 3.0, 3.0, 1.0, 0.0, 1.0, 0.0, 1.0, 0.0]) },
        { name: "glitch", expression: 0.5, samples: centerWave([1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, -1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, -1.0, -1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, -1.0, -1.0, -1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, -1.0, -1.0, -1.0, -1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, -1.0, -1.0, -1.0, -1.0, -1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, -1.0, -1.0, -1.0, -1.0, -1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, -1.0, -1.0, -1.0, -1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, -1.0, -1.0, -1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, -1.0, -1.0]) },
        { name: "lemmbox HD triangle", expression: 1.0, samples: centerWave([1.0, 0.996, 0.992, 0.988, 0.984, 0.98, 0.976, 0.972, 0.968, 0.964, 0.96, 0.956, 0.952, 0.948, 0.944, 0.94, 0.9359999999999999, 0.9319999999999999, 0.9279999999999999, 0.9239999999999999, 0.9199999999999999, 0.9159999999999999, 0.9119999999999999, 0.9079999999999999, 0.9039999999999999, 0.8999999999999999, 0.8959999999999999, 0.8919999999999999, 0.8879999999999999, 0.8839999999999999, 0.8799999999999999, 0.8759999999999999, 0.8719999999999999, 0.8679999999999999, 0.8639999999999999, 0.8599999999999999, 0.8560000000000001, 0.8520000000000001, 0.8480000000000001, 0.8440000000000001, 0.8400000000000001, 0.8360000000000001, 0.8320000000000001, 0.8280000000000001, 0.8240000000000001, 0.8200000000000001, 0.8160000000000001, 0.812, 0.808, 0.804, 0.8, 0.796, 0.792, 0.788, 0.784, 0.78, 0.776, 0.772, 0.768, 0.764, 0.76, 0.756, 0.752, 0.748, 0.744, 0.74, 0.736, 0.732, 0.728, 0.724, 0.72, 0.716, 0.712, 0.708, 0.704, 0.7, 0.696, 0.692, 0.688, 0.6839999999999999, 0.6799999999999999, 0.6759999999999999, 0.6719999999999999, 0.6679999999999999, 0.6639999999999999, 0.6599999999999999, 0.6560000000000001, 0.6520000000000001, 0.6480000000000001, 0.6440000000000001, 0.6400000000000001, 0.6360000000000001, 0.6320000000000001, 0.6280000000000001, 0.6240000000000001, 0.6200000000000001, 0.6160000000000001, 0.6120000000000001, 0.6080000000000001, 0.6040000000000001, 0.6000000000000001, 0.5960000000000001, 0.5920000000000001, 0.5880000000000001, 0.5840000000000001, 0.5800000000000001, 0.5760000000000001, 0.5720000000000001, 0.5680000000000001, 0.5640000000000001, 0.56, 0.556, 0.552, 0.548, 0.544, 0.54, 0.536, 0.532, 0.528, 0.524, 0.52, 0.516, 0.512, 0.508, 0.504, 0.5, 0.496, 0.492, 0.488, 0.484, 0.48, 0.476, 0.472, 0.46799999999999997, 0.46399999999999997, 0.45999999999999996, 0.45599999999999996, 0.45199999999999996, 0.44799999999999995, 0.44399999999999995, 0.43999999999999995, 0.43599999999999994, 0.43199999999999994, 0.42799999999999994, 0.42399999999999993, 0.41999999999999993, 0.4159999999999999, 0.4119999999999999, 0.4079999999999999, 0.4039999999999999, 0.3999999999999999, 0.3959999999999999, 0.3919999999999999, 0.3879999999999999, 0.3839999999999999, 0.3799999999999999, 0.3759999999999999, 0.3719999999999999, 0.3679999999999999, 0.3639999999999999, 0.3599999999999999, 0.35599999999999987, 0.35199999999999987, 0.34799999999999986, 0.34399999999999986, 0.33999999999999986, 0.33599999999999985, 0.33199999999999985, 0.32799999999999985, 0.32399999999999984, 0.31999999999999984, 0.31599999999999984, 0.31200000000000006, 0.30800000000000005, 0.30400000000000005, 0.30000000000000004, 0.29600000000000004, 0.29200000000000004, 0.28800000000000003, 0.28400000000000003, 0.28, 0.276, 0.272, 0.268, 0.264, 0.26, 0.256, 0.252, 0.248, 0.244, 0.24, 0.236, 0.23199999999999998, 0.22799999999999998, 0.22399999999999998, 0.21999999999999997, 0.21599999999999997, 0.21199999999999997, 0.20799999999999996, 0.20399999999999996, 0.19999999999999996, 0.19599999999999995, 0.19199999999999995, 0.18799999999999994, 0.18400000000000016, 0.18000000000000016, 0.17600000000000016, 0.17200000000000015, 0.16800000000000015, 0.16400000000000015, 0.16000000000000014, 0.15600000000000014, 0.15200000000000014, 0.14800000000000013, 0.14400000000000013, 0.14000000000000012, 0.13600000000000012, 0.13200000000000012, 0.1280000000000001, 0.12400000000000011, 0.1200000000000001, 0.1160000000000001, 0.1120000000000001, 0.1080000000000001, 0.10400000000000009, 0.10000000000000009, 0.09600000000000009, 0.09200000000000008, 0.08800000000000008, 0.08400000000000007, 0.08000000000000007, 0.07600000000000007, 0.07200000000000006, 0.06800000000000006, 0.06400000000000006, 0.06000000000000005, 0.05600000000000005, 0.052000000000000046, 0.04800000000000004, 0.04400000000000004, 0.040000000000000036, 0.03600000000000003, 0.03200000000000003, 0.028000000000000025, 0.02400000000000002, 0.020000000000000018, 0.016000000000000014, 0.01200000000000001, 0.008000000000000007, 0.0040000000000000036, 0.0, -0.0040000000000000036, -0.008000000000000007, -0.01200000000000001, -0.016000000000000014, -0.020000000000000018, -0.02400000000000002, -0.028000000000000025, -0.03200000000000003, -0.03600000000000003, -0.040000000000000036, -0.04400000000000004, -0.04800000000000004, -0.052000000000000046, -0.05600000000000005, -0.06000000000000005, -0.06400000000000006, -0.06800000000000006, -0.07200000000000006, -0.07600000000000007, -0.08000000000000007, -0.08400000000000007, -0.08800000000000008, -0.09200000000000008, -0.09600000000000009, -0.10000000000000009, -0.10400000000000009, -0.1080000000000001, -0.1120000000000001, -0.1160000000000001, -0.1200000000000001, -0.12400000000000011, -0.1279999999999999, -0.1319999999999999, -0.1359999999999999, -0.1399999999999999, -0.1439999999999999, -0.1479999999999999, -0.1519999999999999, -0.15599999999999992, -0.15999999999999992, -0.16399999999999992, -0.16799999999999993, -0.17199999999999993, -0.17599999999999993, -0.17999999999999994, -0.18399999999999994, -0.18799999999999994, -0.19199999999999995, -0.19599999999999995, -0.19999999999999996, -0.20399999999999996, -0.20799999999999996, -0.21199999999999997, -0.21599999999999997, -0.21999999999999997, -0.22399999999999998, -0.22799999999999998, -0.23199999999999998, -0.236, -0.24, -0.244, -0.248, -0.252, -0.256, -0.26, -0.264, -0.268, -0.272, -0.276, -0.28, -0.28400000000000003, -0.28800000000000003, -0.29200000000000004, -0.29600000000000004, -0.30000000000000004, -0.30400000000000005, -0.30800000000000005, -0.31200000000000006, -0.31600000000000006, -0.32000000000000006, -0.32400000000000007, -0.32800000000000007, -0.3320000000000001, -0.3360000000000001, -0.3400000000000001, -0.3440000000000001, -0.3480000000000001, -0.3520000000000001, -0.3560000000000001, -0.3600000000000001, -0.3640000000000001, -0.3680000000000001, -0.3720000000000001, -0.3759999999999999, -0.3799999999999999, -0.3839999999999999, -0.3879999999999999, -0.3919999999999999, -0.3959999999999999, -0.3999999999999999, -0.4039999999999999, -0.4079999999999999, -0.4119999999999999, -0.4159999999999999, -0.41999999999999993, -0.42399999999999993, -0.42799999999999994, -0.43199999999999994, -0.43599999999999994, -0.43999999999999995, -0.44399999999999995, -0.44799999999999995, -0.45199999999999996, -0.45599999999999996, -0.45999999999999996, -0.46399999999999997, -0.46799999999999997, -0.472, -0.476, -0.48, -0.484, -0.488, -0.492, -0.496, -0.5, -0.504, -0.508, -0.512, -0.516, -0.52, -0.524, -0.528, -0.532, -0.536, -0.54, -0.544, -0.548, -0.552, -0.556, -0.56, -0.5640000000000001, -0.5680000000000001, -0.5720000000000001, -0.5760000000000001, -0.5800000000000001, -0.5840000000000001, -0.5880000000000001, -0.5920000000000001, -0.5960000000000001, -0.6000000000000001, -0.6040000000000001, -0.6080000000000001, -0.6120000000000001, -0.6160000000000001, -0.6200000000000001, -0.6240000000000001, -0.6279999999999999, -0.6319999999999999, -0.6359999999999999, -0.6399999999999999, -0.6439999999999999, -0.6479999999999999, -0.6519999999999999, -0.6559999999999999, -0.6599999999999999, -0.6639999999999999, -0.6679999999999999, -0.6719999999999999, -0.6759999999999999, -0.6799999999999999, -0.6839999999999999, -0.688, -0.692, -0.696, -0.7, -0.704, -0.708, -0.712, -0.716, -0.72, -0.724, -0.728, -0.732, -0.736, -0.74, -0.744, -0.748, -0.752, -0.756, -0.76, -0.764, -0.768, -0.772, -0.776, -0.78, -0.784, -0.788, -0.792, -0.796, -0.8, -0.804, -0.808, -0.812, -0.8160000000000001, -0.8200000000000001, -0.8240000000000001, -0.8280000000000001, -0.8320000000000001, -0.8360000000000001, -0.8400000000000001, -0.8440000000000001, -0.8480000000000001, -0.8520000000000001, -0.8560000000000001, -0.8600000000000001, -0.8640000000000001, -0.8680000000000001, -0.8720000000000001, -0.8759999999999999, -0.8799999999999999, -0.8839999999999999, -0.8879999999999999, -0.8919999999999999, -0.8959999999999999, -0.8999999999999999, -0.9039999999999999, -0.9079999999999999, -0.9119999999999999, -0.9159999999999999, -0.9199999999999999, -0.9239999999999999, -0.9279999999999999, -0.9319999999999999, -0.9359999999999999, -0.94, -0.944, -0.948, -0.952, -0.956, -0.96, -0.964, -0.968, -0.972, -0.976, -0.98, -0.984, -0.988, -0.992, -0.996, -1.0, -0.996, -0.992, -0.988, -0.984, -0.98, -0.976, -0.972, -0.968, -0.964, -0.96, -0.956, -0.952, -0.948, -0.944, -0.94, -0.9359999999999999, -0.9319999999999999, -0.9279999999999999, -0.9239999999999999, -0.9199999999999999, -0.9159999999999999, -0.9119999999999999, -0.9079999999999999, -0.9039999999999999, -0.8999999999999999, -0.8959999999999999, -0.8919999999999999, -0.8879999999999999, -0.8839999999999999, -0.8799999999999999, -0.8759999999999999, -0.8719999999999999, -0.8679999999999999, -0.8639999999999999, -0.8599999999999999, -0.8559999999999999, -0.8519999999999999, -0.8479999999999999, -0.8439999999999999, -0.8399999999999999, -0.8359999999999999, -0.8319999999999999, -0.8279999999999998, -0.8239999999999998, -0.8199999999999998, -0.8159999999999998, -0.8119999999999998, -0.8079999999999998, -0.8039999999999998, -0.7999999999999998, -0.7959999999999998, -0.7919999999999998, -0.7879999999999998, -0.7839999999999998, -0.7799999999999998, -0.7759999999999998, -0.7719999999999998, -0.7679999999999998, -0.7639999999999998, -0.7599999999999998, -0.7559999999999998, -0.7519999999999998, -0.7480000000000002, -0.7440000000000002, -0.7400000000000002, -0.7360000000000002, -0.7320000000000002, -0.7280000000000002, -0.7240000000000002, -0.7200000000000002, -0.7160000000000002, -0.7120000000000002, -0.7080000000000002, -0.7040000000000002, -0.7000000000000002, -0.6960000000000002, -0.6920000000000002, -0.6880000000000002, -0.6840000000000002, -0.6800000000000002, -0.6760000000000002, -0.6720000000000002, -0.6680000000000001, -0.6640000000000001, -0.6600000000000001, -0.6560000000000001, -0.6520000000000001, -0.6480000000000001, -0.6440000000000001, -0.6400000000000001, -0.6360000000000001, -0.6320000000000001, -0.6280000000000001, -0.6240000000000001, -0.6200000000000001, -0.6160000000000001, -0.6120000000000001, -0.6080000000000001, -0.6040000000000001, -0.6000000000000001, -0.5960000000000001, -0.5920000000000001, -0.5880000000000001, -0.5840000000000001, -0.5800000000000001, -0.5760000000000001, -0.5720000000000001, -0.5680000000000001, -0.5640000000000001, -0.56, -0.556, -0.552, -0.548, -0.544, -0.54, -0.536, -0.532, -0.528, -0.524, -0.52, -0.516, -0.512, -0.508, -0.504, -0.5, -0.496, -0.492, -0.488, -0.484, -0.48, -0.476, -0.472, -0.46799999999999997, -0.46399999999999997, -0.45999999999999996, -0.45599999999999996, -0.45199999999999996, -0.44799999999999995, -0.44399999999999995, -0.43999999999999995, -0.43599999999999994, -0.43199999999999994, -0.42799999999999994, -0.42399999999999993, -0.41999999999999993, -0.4159999999999999, -0.4119999999999999, -0.4079999999999999, -0.4039999999999999, -0.3999999999999999, -0.3959999999999999, -0.3919999999999999, -0.3879999999999999, -0.3839999999999999, -0.3799999999999999, -0.3759999999999999, -0.3719999999999999, -0.3679999999999999, -0.3639999999999999, -0.3599999999999999, -0.35599999999999987, -0.35199999999999987, -0.34799999999999986, -0.34399999999999986, -0.33999999999999986, -0.33599999999999985, -0.33199999999999985, -0.32799999999999985, -0.32399999999999984, -0.31999999999999984, -0.31599999999999984, -0.31199999999999983, -0.30799999999999983, -0.3039999999999998, -0.2999999999999998, -0.2959999999999998, -0.2919999999999998, -0.2879999999999998, -0.2839999999999998, -0.2799999999999998, -0.2759999999999998, -0.2719999999999998, -0.2679999999999998, -0.2639999999999998, -0.2599999999999998, -0.2559999999999998, -0.2519999999999998, -0.24800000000000022, -0.24400000000000022, -0.2400000000000002, -0.2360000000000002, -0.2320000000000002, -0.2280000000000002, -0.2240000000000002, -0.2200000000000002, -0.2160000000000002, -0.2120000000000002, -0.20800000000000018, -0.20400000000000018, -0.20000000000000018, -0.19600000000000017, -0.19200000000000017, -0.18800000000000017, -0.18400000000000016, -0.18000000000000016, -0.17600000000000016, -0.17200000000000015, -0.16800000000000015, -0.16400000000000015, -0.16000000000000014, -0.15600000000000014, -0.15200000000000014, -0.14800000000000013, -0.14400000000000013, -0.14000000000000012, -0.13600000000000012, -0.13200000000000012, -0.1280000000000001, -0.12400000000000011, -0.1200000000000001, -0.1160000000000001, -0.1120000000000001, -0.1080000000000001, -0.10400000000000009, -0.10000000000000009, -0.09600000000000009, -0.09200000000000008, -0.08800000000000008, -0.08400000000000007, -0.08000000000000007, -0.07600000000000007, -0.07200000000000006, -0.06800000000000006, -0.06400000000000006, -0.06000000000000005, -0.05600000000000005, -0.052000000000000046, -0.04800000000000004, -0.04400000000000004, -0.040000000000000036, -0.03600000000000003, -0.03200000000000003, -0.028000000000000025, -0.02400000000000002, -0.020000000000000018, -0.016000000000000014, -0.01200000000000001, -0.008000000000000007, -0.0040000000000000036, 0.0, 0.0040000000000000036, 0.008000000000000007, 0.01200000000000001, 0.016000000000000014, 0.020000000000000018, 0.02400000000000002, 0.028000000000000025, 0.03200000000000003, 0.03600000000000003, 0.040000000000000036, 0.04400000000000004, 0.04800000000000004, 0.052000000000000046, 0.05600000000000005, 0.06000000000000005, 0.06400000000000006, 0.06800000000000006, 0.07200000000000006, 0.07600000000000007, 0.08000000000000007, 0.08400000000000007, 0.08800000000000008, 0.09200000000000008, 0.09600000000000009, 0.10000000000000009, 0.10400000000000009, 0.1080000000000001, 0.1120000000000001, 0.1160000000000001, 0.1200000000000001, 0.12400000000000011, 0.1280000000000001, 0.13200000000000012, 0.13600000000000012, 0.14000000000000012, 0.14400000000000013, 0.14800000000000013, 0.15200000000000014, 0.15600000000000014, 0.16000000000000014, 0.16400000000000015, 0.16800000000000015, 0.17200000000000015, 0.17600000000000016, 0.18000000000000016, 0.18400000000000016, 0.18800000000000017, 0.19200000000000017, 0.19600000000000017, 0.20000000000000018, 0.20400000000000018, 0.20800000000000018, 0.2120000000000002, 0.2160000000000002, 0.2200000000000002, 0.2240000000000002, 0.2280000000000002, 0.2320000000000002, 0.2360000000000002, 0.2400000000000002, 0.24400000000000022, 0.24800000000000022, 0.2519999999999998, 0.2559999999999998, 0.2599999999999998, 0.2639999999999998, 0.2679999999999998, 0.2719999999999998, 0.2759999999999998, 0.2799999999999998, 0.2839999999999998, 0.2879999999999998, 0.2919999999999998, 0.2959999999999998, 0.2999999999999998, 0.3039999999999998, 0.30799999999999983, 0.31199999999999983, 0.31599999999999984, 0.31999999999999984, 0.32399999999999984, 0.32799999999999985, 0.33199999999999985, 0.33599999999999985, 0.33999999999999986, 0.34399999999999986, 0.34799999999999986, 0.35199999999999987, 0.35599999999999987, 0.3599999999999999, 0.3639999999999999, 0.3679999999999999, 0.3719999999999999, 0.3759999999999999, 0.3799999999999999, 0.3839999999999999, 0.3879999999999999, 0.3919999999999999, 0.3959999999999999, 0.3999999999999999, 0.4039999999999999, 0.4079999999999999, 0.4119999999999999, 0.4159999999999999, 0.41999999999999993, 0.42399999999999993, 0.42799999999999994, 0.43199999999999994, 0.43599999999999994, 0.43999999999999995, 0.44399999999999995, 0.44799999999999995, 0.45199999999999996, 0.45599999999999996, 0.45999999999999996, 0.46399999999999997, 0.46799999999999997, 0.472, 0.476, 0.48, 0.484, 0.488, 0.492, 0.496, 0.5, 0.504, 0.508, 0.512, 0.516, 0.52, 0.524, 0.528, 0.532, 0.536, 0.54, 0.544, 0.548, 0.552, 0.556, 0.56, 0.5640000000000001, 0.5680000000000001, 0.5720000000000001, 0.5760000000000001, 0.5800000000000001, 0.5840000000000001, 0.5880000000000001, 0.5920000000000001, 0.5960000000000001, 0.6000000000000001, 0.6040000000000001, 0.6080000000000001, 0.6120000000000001, 0.6160000000000001, 0.6200000000000001, 0.6240000000000001, 0.6280000000000001, 0.6320000000000001, 0.6360000000000001, 0.6400000000000001, 0.6440000000000001, 0.6480000000000001, 0.6520000000000001, 0.6560000000000001, 0.6600000000000001, 0.6640000000000001, 0.6680000000000001, 0.6720000000000002, 0.6760000000000002, 0.6800000000000002, 0.6840000000000002, 0.6880000000000002, 0.6920000000000002, 0.6960000000000002, 0.7000000000000002, 0.7040000000000002, 0.7080000000000002, 0.7120000000000002, 0.7160000000000002, 0.7200000000000002, 0.7240000000000002, 0.7280000000000002, 0.7320000000000002, 0.7360000000000002, 0.7400000000000002, 0.7440000000000002, 0.7480000000000002, 0.7519999999999998, 0.7559999999999998, 0.7599999999999998, 0.7639999999999998, 0.7679999999999998, 0.7719999999999998, 0.7759999999999998, 0.7799999999999998, 0.7839999999999998, 0.7879999999999998, 0.7919999999999998, 0.7959999999999998, 0.7999999999999998, 0.8039999999999998, 0.8079999999999998, 0.8119999999999998, 0.8159999999999998, 0.8199999999999998, 0.8239999999999998, 0.8279999999999998, 0.8319999999999999, 0.8359999999999999, 0.8399999999999999, 0.8439999999999999, 0.8479999999999999, 0.8519999999999999, 0.8559999999999999, 0.8599999999999999, 0.8639999999999999, 0.8679999999999999, 0.8719999999999999, 0.8759999999999999, 0.8799999999999999, 0.8839999999999999, 0.8879999999999999, 0.8919999999999999, 0.8959999999999999, 0.8999999999999999, 0.9039999999999999, 0.9079999999999999, 0.9119999999999999, 0.9159999999999999, 0.9199999999999999, 0.9239999999999999, 0.9279999999999999, 0.9319999999999999, 0.9359999999999999, 0.94, 0.944, 0.948, 0.952, 0.956, 0.96, 0.964, 0.968, 0.972, 0.976, 0.98, 0.984, 0.988, 0.992, 0.996]) },
        { name: "lemmbox HD sawtooth", expression: 1.0, samples: centerWave([0.0, 0.00390625, 0.0078125, 0.01171875, 0.015625, 0.01953125, 0.0234375, 0.02734375, 0.03125, 0.03515625, 0.0390625, 0.04296875, 0.046875, 0.05078125, 0.0546875, 0.05859375, 0.0625, 0.06640625, 0.0703125, 0.07421875, 0.078125, 0.08203125, 0.0859375, 0.08984375, 0.09375, 0.09765625, 0.1015625, 0.10546875, 0.109375, 0.11328125, 0.1171875, 0.12109375, 0.125, 0.12890625, 0.1328125, 0.13671875, 0.140625, 0.14453125, 0.1484375, 0.15234375, 0.15625, 0.16015625, 0.1640625, 0.16796875, 0.171875, 0.17578125, 0.1796875, 0.18359375, 0.1875, 0.19140625, 0.1953125, 0.19921875, 0.203125, 0.20703125, 0.2109375, 0.21484375, 0.21875, 0.22265625, 0.2265625, 0.23046875, 0.234375, 0.23828125, 0.2421875, 0.24609375, 0.25, 0.25390625, 0.2578125, 0.26171875, 0.265625, 0.26953125, 0.2734375, 0.27734375, 0.28125, 0.28515625, 0.2890625, 0.29296875, 0.296875, 0.30078125, 0.3046875, 0.30859375, 0.3125, 0.31640625, 0.3203125, 0.32421875, 0.328125, 0.33203125, 0.3359375, 0.33984375, 0.34375, 0.34765625, 0.3515625, 0.35546875, 0.359375, 0.36328125, 0.3671875, 0.37109375, 0.375, 0.37890625, 0.3828125, 0.38671875, 0.390625, 0.39453125, 0.3984375, 0.40234375, 0.40625, 0.41015625, 0.4140625, 0.41796875, 0.421875, 0.42578125, 0.4296875, 0.43359375, 0.4375, 0.44140625, 0.4453125, 0.44921875, 0.453125, 0.45703125, 0.4609375, 0.46484375, 0.46875, 0.47265625, 0.4765625, 0.48046875, 0.484375, 0.48828125, 0.4921875, 0.49609375, 0.5, 0.50390625, 0.5078125, 0.51171875, 0.515625, 0.51953125, 0.5234375, 0.52734375, 0.53125, 0.53515625, 0.5390625, 0.54296875, 0.546875, 0.55078125, 0.5546875, 0.55859375, 0.5625, 0.56640625, 0.5703125, 0.57421875, 0.578125, 0.58203125, 0.5859375, 0.58984375, 0.59375, 0.59765625, 0.6015625, 0.60546875, 0.609375, 0.61328125, 0.6171875, 0.62109375, 0.625, 0.62890625, 0.6328125, 0.63671875, 0.640625, 0.64453125, 0.6484375, 0.65234375, 0.65625, 0.66015625, 0.6640625, 0.66796875, 0.671875, 0.67578125, 0.6796875, 0.68359375, 0.6875, 0.69140625, 0.6953125, 0.69921875, 0.703125, 0.70703125, 0.7109375, 0.71484375, 0.71875, 0.72265625, 0.7265625, 0.73046875, 0.734375, 0.73828125, 0.7421875, 0.74609375, 0.75, 0.75390625, 0.7578125, 0.76171875, 0.765625, 0.76953125, 0.7734375, 0.77734375, 0.78125, 0.78515625, 0.7890625, 0.79296875, 0.796875, 0.80078125, 0.8046875, 0.80859375, 0.8125, 0.81640625, 0.8203125, 0.82421875, 0.828125, 0.83203125, 0.8359375, 0.83984375, 0.84375, 0.84765625, 0.8515625, 0.85546875, 0.859375, 0.86328125, 0.8671875, 0.87109375, 0.875, 0.87890625, 0.8828125, 0.88671875, 0.890625, 0.89453125, 0.8984375, 0.90234375, 0.90625, 0.91015625, 0.9140625, 0.91796875, 0.921875, 0.92578125, 0.9296875, 0.93359375, 0.9375, 0.94140625, 0.9453125, 0.94921875, 0.953125, 0.95703125, 0.9609375, 0.96484375, 0.96875, 0.97265625, 0.9765625, 0.98046875, 0.984375, 0.98828125, 0.9921875, 0.99609375, -1.0, -0.99609375, -0.9921875, -0.98828125, -0.984375, -0.98046875, -0.9765625, -0.97265625, -0.96875, -0.96484375, -0.9609375, -0.95703125, -0.953125, -0.94921875, -0.9453125, -0.94140625, -0.9375, -0.93359375, -0.9296875, -0.92578125, -0.921875, -0.91796875, -0.9140625, -0.91015625, -0.90625, -0.90234375, -0.8984375, -0.89453125, -0.890625, -0.88671875, -0.8828125, -0.87890625, -0.875, -0.87109375, -0.8671875, -0.86328125, -0.859375, -0.85546875, -0.8515625, -0.84765625, -0.84375, -0.83984375, -0.8359375, -0.83203125, -0.828125, -0.82421875, -0.8203125, -0.81640625, -0.8125, -0.80859375, -0.8046875, -0.80078125, -0.796875, -0.79296875, -0.7890625, -0.78515625, -0.78125, -0.77734375, -0.7734375, -0.76953125, -0.765625, -0.76171875, -0.7578125, -0.75390625, -0.75, -0.74609375, -0.7421875, -0.73828125, -0.734375, -0.73046875, -0.7265625, -0.72265625, -0.71875, -0.71484375, -0.7109375, -0.70703125, -0.703125, -0.69921875, -0.6953125, -0.69140625, -0.6875, -0.68359375, -0.6796875, -0.67578125, -0.671875, -0.66796875, -0.6640625, -0.66015625, -0.65625, -0.65234375, -0.6484375, -0.64453125, -0.640625, -0.63671875, -0.6328125, -0.62890625, -0.625, -0.62109375, -0.6171875, -0.61328125, -0.609375, -0.60546875, -0.6015625, -0.59765625, -0.59375, -0.58984375, -0.5859375, -0.58203125, -0.578125, -0.57421875, -0.5703125, -0.56640625, -0.5625, -0.55859375, -0.5546875, -0.55078125, -0.546875, -0.54296875, -0.5390625, -0.53515625, -0.53125, -0.52734375, -0.5234375, -0.51953125, -0.515625, -0.51171875, -0.5078125, -0.50390625, -0.5, -0.49609375, -0.4921875, -0.48828125, -0.484375, -0.48046875, -0.4765625, -0.47265625, -0.46875, -0.46484375, -0.4609375, -0.45703125, -0.453125, -0.44921875, -0.4453125, -0.44140625, -0.4375, -0.43359375, -0.4296875, -0.42578125, -0.421875, -0.41796875, -0.4140625, -0.41015625, -0.40625, -0.40234375, -0.3984375, -0.39453125, -0.390625, -0.38671875, -0.3828125, -0.37890625, -0.375, -0.37109375, -0.3671875, -0.36328125, -0.359375, -0.35546875, -0.3515625, -0.34765625, -0.34375, -0.33984375, -0.3359375, -0.33203125, -0.328125, -0.32421875, -0.3203125, -0.31640625, -0.3125, -0.30859375, -0.3046875, -0.30078125, -0.296875, -0.29296875, -0.2890625, -0.28515625, -0.28125, -0.27734375, -0.2734375, -0.26953125, -0.265625, -0.26171875, -0.2578125, -0.25390625, -0.25, -0.24609375, -0.2421875, -0.23828125, -0.234375, -0.23046875, -0.2265625, -0.22265625, -0.21875, -0.21484375, -0.2109375, -0.20703125, -0.203125, -0.19921875, -0.1953125, -0.19140625, -0.1875, -0.18359375, -0.1796875, -0.17578125, -0.171875, -0.16796875, -0.1640625, -0.16015625, -0.15625, -0.15234375, -0.1484375, -0.14453125, -0.140625, -0.13671875, -0.1328125, -0.12890625, -0.125, -0.12109375, -0.1171875, -0.11328125, -0.109375, -0.10546875, -0.1015625, -0.09765625, -0.09375, -0.08984375, -0.0859375, -0.08203125, -0.078125, -0.07421875, -0.0703125, -0.06640625, -0.0625, -0.05859375, -0.0546875, -0.05078125, -0.046875, -0.04296875, -0.0390625, -0.03515625, -0.03125, -0.02734375, -0.0234375, -0.01953125, -0.015625, -0.01171875, -0.0078125, -0.00390625]) },
        { name: "lemmbox HD rounded", expression: 1.0, samples: centerWave([0.0, 0.01, 0.02, 0.04, 0.05, 0.06, 0.07, 0.09, 0.1, 0.11, 0.12, 0.13, 0.15, 0.16, 0.17, 0.18, 0.2, 0.21, 0.22, 0.23, 0.24, 0.25, 0.27, 0.28, 0.29, 0.3, 0.31, 0.33, 0.34, 0.35, 0.36, 0.37, 0.38, 0.39, 0.41, 0.42, 0.43, 0.44, 0.45, 0.46, 0.47, 0.48, 0.49, 0.5, 0.51, 0.52, 0.53, 0.55, 0.56, 0.57, 0.58, 0.59, 0.6, 0.61, 0.62, 0.62, 0.63, 0.64, 0.65, 0.66, 0.67, 0.68, 0.69, 0.7, 0.71, 0.72, 0.72, 0.73, 0.74, 0.75, 0.76, 0.77, 0.77, 0.78, 0.79, 0.8, 0.8, 0.81, 0.82, 0.82, 0.83, 0.84, 0.84, 0.85, 0.86, 0.86, 0.87, 0.88, 0.88, 0.89, 0.89, 0.9, 0.9, 0.91, 0.91, 0.92, 0.92, 0.93, 0.93, 0.94, 0.94, 0.95, 0.95, 0.95, 0.96, 0.96, 0.96, 0.97, 0.97, 0.97, 0.98, 0.98, 0.98, 0.98, 0.99, 0.99, 0.99, 0.99, 0.99, 0.99, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,  0.99, 0.99, 0.99, 0.99, 0.99, 0.99, 0.98, 0.98, 0.98, 0.98, 0.97, 0.97, 0.97, 0.96, 0.96, 0.96, 0.95, 0.95, 0.95, 0.94, 0.94, 0.93, 0.93, 0.92, 0.92, 0.91, 0.91, 0.9, 0.9, 0.89, 0.89, 0.88, 0.88, 0.87, 0.86, 0.86, 0.85, 0.84, 0.84, 0.83, 0.82, 0.82, 0.81, 0.8, 0.8, 0.79, 0.78, 0.77, 0.77, 0.76, 0.75, 0.74, 0.73, 0.72, 0.72, 0.71, 0.7, 0.69, 0.68, 0.67, 0.66, 0.65, 0.64, 0.63, 0.62, 0.62, 0.61, 0.6, 0.59, 0.58, 0.57, 0.56, 0.55, 0.53, 0.52, 0.51, 0.5, 0.49, 0.48, 0.47, 0.46, 0.45, 0.44, 0.43, 0.42, 0.41, 0.39, 0.38, 0.37, 0.36, 0.35, 0.34, 0.33, 0.31, 0.3, 0.29, 0.28, 0.27, 0.25, 0.24, 0.23, 0.22, 0.21, 0.2, 0.18, 0.17, 0.16, 0.15, 0.13, 0.12, 0.11, 0.1, 0.09, 0.07, 0.06, 0.05, 0.04, 0.02, 0.01, 0.0, -0.01, -0.02, -0.04, -0.05, -0.06, -0.07, -0.09, -0.1, -0.11, -0.12, -0.13, -0.15, -0.16, -0.17, -0.18, -0.2, -0.21, -0.22, -0.23, -0.24, -0.25, -0.27, -0.28, -0.29, -0.3, -0.31, -0.33, -0.34, -0.35, -0.36, -0.37, -0.38, -0.39, -0.41, -0.42, -0.43, -0.44, -0.45, -0.46, -0.47, -0.48, -0.49, -0.5, -0.51, -0.52, -0.53, -0.55, -0.56, -0.57, -0.58, -0.59, -0.6, -0.61, -0.62, -0.62, -0.63, -0.64, -0.65, -0.66, -0.67, -0.68, -0.69, -0.7, -0.71, -0.72, -0.72, -0.73, -0.74, -0.75, -0.76, -0.77, -0.77, -0.78, -0.79, -0.8, -0.8, -0.81, -0.82, -0.82, -0.83, -0.84, -0.84, -0.85, -0.86, -0.86, -0.87, -0.88, -0.88, -0.89, -0.89, -0.9, -0.9, -0.91, -0.91, -0.92, -0.92, -0.93, -0.93, -0.94, -0.94, -0.95, -0.95, -0.95, -0.96, -0.96, -0.96, -0.97, -0.97, -0.97, -0.98, -0.98, -0.98, -0.98, -0.99, -0.99, -0.99, -0.99, -0.99, -0.99, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -0.99, -0.99, -0.99, -0.99, -0.99, -0.99, -0.98, -0.98, -0.98, -0.98, -0.97, -0.97, -0.97, -0.96, -0.96, -0.96, -0.95, -0.95, -0.95, -0.94, -0.94, -0.93, -0.93, -0.92, -0.92, -0.91, -0.91, -0.9, -0.9, -0.89, -0.89, -0.88, -0.88, -0.87, -0.86, -0.86, -0.85, -0.84, -0.84, -0.83, -0.82, -0.82, -0.81, -0.8, -0.8, -0.79, -0.78, -0.77, -0.77, -0.76, -0.75, -0.74, -0.73, -0.72, -0.72, -0.71, -0.7, -0.69, -0.68, -0.67, -0.66, -0.65, -0.64, -0.63, -0.62, -0.62, -0.61, -0.6, -0.59, -0.58, -0.57, -0.56, -0.55, -0.53, -0.52, -0.51, -0.5, -0.49, -0.48, -0.47, -0.46, -0.45, -0.44, -0.43, -0.42, -0.41, -0.39, -0.38, -0.37, -0.36, -0.35, -0.34, -0.33, -0.31, -0.3, -0.29, -0.28, -0.27, -0.25, -0.24, -0.23, -0.22, -0.21, -0.2, -0.18, -0.17, -0.16, -0.15, -0.13, -0.12, -0.11, -0.1, -0.09, -0.07, -0.06, -0.05, -0.04, -0.02, -0.01]) },
        { name: "lemmbox trapasquare", expression: 1.0, samples: centerWave([0.0, 0.012271538285719925, 0.024541228522912288, 0.03680722294135883, 0.049067674327418015, 0.06132073630220858, 0.07356456359966743, 0.0857973123444399, 0.0980171403295606, 0.11022220729388306, 0.1224106751992162, 0.13458070850712617, 0.14673047445536175, 0.15885814333386145, 0.17096188876030122, 0.18303988795514095, 0.19509032201612825, 0.20711137619221856, 0.2191012401568698, 0.2310581082806711, 0.24298017990326387, 0.25486565960451457, 0.26671275747489837, 0.27851968938505306, 0.29028467725446233, 0.3020059493192281, 0.3136817403988915, 0.3253102921622629, 0.33688985339222005, 0.34841868024943456, 0.3598950365349881, 0.3713171939518375, 0.3826834323650898, 0.3939920400610481, 0.40524131400498986, 0.41642956009763715, 0.4275550934302821, 0.43861623853852766, 0.44961132965460654, 0.46053871095824, 0.47139673682599764, 0.4821837720791227, 0.49289819222978404, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 0.49289819222978415, 0.4821837720791229, 0.47139673682599786, 0.4605387109582402, 0.4496113296546069, 0.43861623853852755, 0.42755509343028203, 0.41642956009763715, 0.4052413140049899, 0.39399204006104815, 0.3826834323650899, 0.3713171939518377, 0.35989503653498833, 0.3484186802494348, 0.33688985339222033, 0.32531029216226326, 0.3136817403988914, 0.30200594931922803, 0.2902846772544624, 0.27851968938505317, 0.2667127574748985, 0.2548656596045147, 0.24298017990326407, 0.23105810828067133, 0.21910124015687005, 0.20711137619221884, 0.1950903220161286, 0.1830398879551409, 0.17096188876030122, 0.15885814333386147, 0.1467304744553618, 0.13458070850712628, 0.12241067519921635, 0.11022220729388324, 0.09801714032956083, 0.08579731234444016, 0.07356456359966773, 0.06132073630220849, 0.049067674327417966, 0.03680722294135883, 0.024541228522912326, 0.012271538285720007, 1.2246467991473532e-16, -0.012271538285719762, -0.02454122852291208, -0.03680722294135858, -0.049067674327417724, -0.061320736302208245, -0.0735645635996675, -0.08579731234443992, -0.09801714032956059, -0.110222207293883, -0.1224106751992161, -0.13458070850712606, -0.14673047445536158, -0.15885814333386122, -0.17096188876030097, -0.18303988795514065, -0.19509032201612836, -0.2071113761922186, -0.2191012401568698, -0.23105810828067108, -0.24298017990326382, -0.25486565960451446, -0.26671275747489825, -0.2785196893850529, -0.2902846772544621, -0.3020059493192278, -0.3136817403988912, -0.325310292162263, -0.33688985339222005, -0.34841868024943456, -0.3598950365349881, -0.37131719395183743, -0.38268343236508967, -0.39399204006104793, -0.4052413140049897, -0.41642956009763693, -0.4275550934302818, -0.4386162385385273, -0.44961132965460665, -0.46053871095824006, -0.47139673682599764, -0.48218377207912266, -0.4928981922297839, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -0.49289819222978426, -0.4821837720791226, -0.4713967368259979, -0.46053871095823995, -0.449611329654607, -0.43861623853852766, -0.42755509343028253, -0.41642956009763726, -0.4052413140049904, -0.39399204006104827, -0.3826834323650904, -0.3713171939518378, -0.359895036534988, -0.3484186802494349, -0.33688985339222, -0.32531029216226337, -0.3136817403988915, -0.3020059493192286, -0.2902846772544625, -0.27851968938505367, -0.2667127574748986, -0.2548656596045144, -0.24298017990326418, -0.231058108280671, -0.21910124015687016, -0.20711137619221853, -0.19509032201612872, -0.183039887955141, -0.17096188876030177, -0.15885814333386158, -0.1467304744553624, -0.13458070850712642, -0.12241067519921603, -0.11022220729388336, -0.0980171403295605, -0.08579731234444028, -0.07356456359966741, -0.06132073630220906, -0.04906767432741809, -0.036807222941359394, -0.024541228522912448, -0.012271538285720572]) },
    ]);
    public static readonly chipWaves: DictionaryArray<ChipWave> = rawChipToIntegrated(Config.rawChipWaves);
    // Noise waves have too many samples to write by hand, they're generated on-demand by getDrumWave instead.
    public static readonly chipNoises: DictionaryArray<ChipNoise> = toNameMap([
        { name: "retro", expression: 0.25, basePitch: 69, pitchFilterMult: 1024.0, isSoft: false, samples: null },
        { name: "white", expression: 1.0, basePitch: 69, pitchFilterMult: 8.0, isSoft: true, samples: null },
        // The "clang" and "buzz" noises are based on similar noises in the modded beepbox! :D
        { name: "clang", expression: 0.4, basePitch: 69, pitchFilterMult: 1024.0, isSoft: false, samples: null },
        { name: "buzz", expression: 0.3, basePitch: 69, pitchFilterMult: 1024.0, isSoft: false, samples: null },
        { name: "hollow", expression: 1.5, basePitch: 96, pitchFilterMult: 1.0, isSoft: true, samples: null },
        { name: "shine", expression: 1.0, basePitch: 69, pitchFilterMult: 1024.0, isSoft: false, samples: null },
        { name: "deep", expression: 1.5, basePitch: 120, pitchFilterMult: 1024.0, isSoft: true, samples: null },
        { name: "cutter", expression: 0.005, basePitch: 96, pitchFilterMult: 1024.0, isSoft: false, samples: null },
        { name: "metallic", expression: 1.0, basePitch: 96, pitchFilterMult: 1024.0, isSoft: false, samples: null },
    ]);

    public static readonly filterFreqStep: number = 1.0 / 4.0;
    public static readonly filterFreqRange: number = 34;
    public static readonly filterFreqReferenceSetting: number = 28;
    public static readonly filterFreqReferenceHz: number = 8000.0;
    public static readonly filterFreqMaxHz: number = Config.filterFreqReferenceHz * Math.pow(2.0, Config.filterFreqStep * (Config.filterFreqRange - 1 - Config.filterFreqReferenceSetting)); // ~19khz
    public static readonly filterFreqMinHz: number = 8.0;
    public static readonly filterGainRange: number = 15;
    public static readonly filterGainCenter: number = 7;
    public static readonly filterGainStep: number = 1.0 / 2.0;
    public static readonly filterMaxPoints: number = 8;
    public static readonly filterTypeNames: ReadonlyArray<string> = ["low-pass", "high-pass", "peak"]; // See FilterType enum above.
    public static readonly filterMorphCount: number = 10; // Number of filter shapes allowed for modulating between. Counts the 0/default position.

    public static readonly filterSimpleCutRange: number = 11;
    public static readonly filterSimplePeakRange: number = 8;

    public static readonly fadeInRange: number = 10;
    public static readonly fadeOutTicks: ReadonlyArray<number> = [-24, -12, -6, -3, -1, 6, 12, 24, 48, 72, 96];
    public static readonly fadeOutNeutral: number = 4;
    public static readonly drumsetFadeOutTicks: number = 48;
    public static readonly transitions: DictionaryArray<Transition> = toNameMap([
        { name: "normal", isSeamless: false, continues: false, slides: false, slideTicks: 3, includeAdjacentPatterns: false },
        { name: "interrupt", isSeamless: true, continues: false, slides: false, slideTicks: 3, includeAdjacentPatterns: true },
        { name: "continue", isSeamless: true, continues: true, slides: false, slideTicks: 3, includeAdjacentPatterns: true },
        { name: "slide", isSeamless: true, continues: false, slides: true, slideTicks: 3, includeAdjacentPatterns: true },
        { name: "slide in pattern", isSeamless: true, continues: false, slides: true, slideTicks: 3, includeAdjacentPatterns: false },
    ]);
    public static readonly vibratos: DictionaryArray<Vibrato> = toNameMap([
        { name: "none", amplitude: 0.0, type: 0, delayTicks: 0 },
        { name: "light", amplitude: 0.15, type: 0, delayTicks: 0 },
        { name: "delayed", amplitude: 0.3, type: 0, delayTicks: 37 }, // It will fade in over the previous two ticks.
        { name: "heavy", amplitude: 0.45, type: 0, delayTicks: 0 },
        { name: "shaky", amplitude: 0.1, type: 1, delayTicks: 0 },
    ]);
    public static readonly vibratoTypes: DictionaryArray<VibratoType> = toNameMap([
        { name: "normal", periodsSeconds: [0.14], period: 0.14 },
        { name: "shaky", periodsSeconds: [0.11, 1.618 * 0.11, 3 * 0.11], period: 266.97 }, // LCM of all periods
    ]);
    // This array is more or less a linear step by 0.1 but there's a bit of range added at the start to hit specific ratios, and the end starts to grow faster.
    //                                                             0       1      2    3     4      5    6    7      8     9   10   11 12   13   14   15   16   17   18   19   20   21 22   23   24   25   26   27   28   29   30   31 32   33   34   35   36   37   38    39  40   41 42    43   44   45   46 47   48 49 50
    public static readonly arpSpeedScale: ReadonlyArray<number> = [0, 0.0625, 0.125, 0.2, 0.25, 1 / 3, 0.4, 0.5, 2 / 3, 0.75, 0.8, 0.9, 1, 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9, 2, 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7, 2.8, 2.9, 3, 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7, 3.8, 3.9, 4, 4.15, 4.3, 4.5, 4.8, 5, 5.5, 6, 8];

    public static readonly unisons: DictionaryArray<Unison> = toNameMap([
        { name: "none", voices: 1, spread: 0.0, offset: 0.0, expression: 1.4, sign: 1.0 },
        { name: "shimmer", voices: 2, spread: 0.018, offset: 0.0, expression: 0.8, sign: 1.0 },
        { name: "hum", voices: 2, spread: 0.045, offset: 0.0, expression: 1.0, sign: 1.0 },
        { name: "honky tonk", voices: 2, spread: 0.09, offset: 0.0, expression: 1.0, sign: 1.0 },
        { name: "dissonant", voices: 2, spread: 0.25, offset: 0.0, expression: 0.9, sign: 1.0 },
        { name: "fifth", voices: 2, spread: 3.5, offset: 3.5, expression: 0.9, sign: 1.0 },
        { name: "octave", voices: 2, spread: 6.0, offset: 6.0, expression: 0.8, sign: 1.0 },
        { name: "bowed", voices: 2, spread: 0.02, offset: 0.0, expression: 1.0, sign: -1.0 },
        { name: "piano", voices: 2, spread: 0.01, offset: 0.0, expression: 1.0, sign: 0.7 },
        { name: "warbled", voices: 2, spread: 0.25, offset: 0.05, expression: 0.9, sign: -0.8 },
    ]);
    public static readonly effectNames: ReadonlyArray<string> = ["reverb", "chorus", "panning", "distortion", "bitcrusher", "note filter", "echo", "pitch shift", "detune", "vibrato", "transition type", "chord type"];
    public static readonly effectOrder: ReadonlyArray<EffectType> = [EffectType.panning, EffectType.transition, EffectType.chord, EffectType.pitchShift, EffectType.detune, EffectType.vibrato, EffectType.noteFilter, EffectType.distortion, EffectType.bitcrusher, EffectType.chorus, EffectType.echo, EffectType.reverb];
    public static readonly noteSizeMax: number = 6;
    public static readonly volumeRange: number = 50;
    // Beepbox's old volume scale used factor -0.5 and was [0~7] had roughly value 6 = 0.125 power. This new value is chosen to have -21 be the same,
    // given that the new scale is [-25~25]. This is such that conversion between the scales is roughly equivalent by satisfying (0.5*6 = 0.1428*21)	
    public static readonly volumeLogScale: number = 0.1428;
    public static readonly panCenter: number = 50;
    public static readonly panMax: number = Config.panCenter * 2;
    public static readonly panDelaySecondsMax: number = 0.001;
    public static readonly chorusRange: number = 8;
    public static readonly chorusPeriodSeconds: number = 2.0;
    public static readonly chorusDelayRange: number = 0.0034;
    public static readonly chorusDelayOffsets: ReadonlyArray<ReadonlyArray<number>> = [[1.51, 2.10, 3.35], [1.47, 2.15, 3.25]];
    public static readonly chorusPhaseOffsets: ReadonlyArray<ReadonlyArray<number>> = [[0.0, 2.1, 4.2], [3.2, 5.3, 1.0]];
    public static readonly chorusMaxDelay: number = Config.chorusDelayRange * (1.0 + Config.chorusDelayOffsets[0].concat(Config.chorusDelayOffsets[1]).reduce((x, y) => Math.max(x, y)));
    public static readonly chords: DictionaryArray<Chord> = toNameMap([
        { name: "simultaneous", customInterval: false, arpeggiates: false, strumParts: 0, singleTone: false },
        { name: "strum", customInterval: false, arpeggiates: false, strumParts: 1, singleTone: false },
        { name: "arpeggio", customInterval: false, arpeggiates: true, strumParts: 0, singleTone: true },
        { name: "custom interval", customInterval: true, arpeggiates: false, strumParts: 0, singleTone: true },
    ]);
    public static readonly maxChordSize: number = 9;
    public static readonly operatorCount: number = 4;
	public static readonly maxPitchOrOperatorCount: number = Math.max(Config.maxChordSize, Config.operatorCount);
    public static readonly algorithms: DictionaryArray<Algorithm> = toNameMap([
        { name: "1←(2 3 4)", carrierCount: 1, associatedCarrier: [1, 1, 1, 1], modulatedBy: [[2, 3, 4], [], [], []] },
        { name: "1←(2 3←4)", carrierCount: 1, associatedCarrier: [1, 1, 1, 1], modulatedBy: [[2, 3], [], [4], []] },
        { name: "1←2←(3 4)", carrierCount: 1, associatedCarrier: [1, 1, 1, 1], modulatedBy: [[2], [3, 4], [], []] },
        { name: "1←(2 3)←4", carrierCount: 1, associatedCarrier: [1, 1, 1, 1], modulatedBy: [[2, 3], [4], [4], []] },
        { name: "1←2←3←4", carrierCount: 1, associatedCarrier: [1, 1, 1, 1], modulatedBy: [[2], [3], [4], []] },
        { name: "1←3 2←4", carrierCount: 2, associatedCarrier: [1, 2, 1, 2], modulatedBy: [[3], [4], [], []] },
        { name: "1 2←(3 4)", carrierCount: 2, associatedCarrier: [1, 2, 2, 2], modulatedBy: [[], [3, 4], [], []] },
        { name: "1 2←3←4", carrierCount: 2, associatedCarrier: [1, 2, 2, 2], modulatedBy: [[], [3], [4], []] },
        { name: "(1 2)←3←4", carrierCount: 2, associatedCarrier: [1, 2, 2, 2], modulatedBy: [[3], [3], [4], []] },
        { name: "(1 2)←(3 4)", carrierCount: 2, associatedCarrier: [1, 2, 2, 2], modulatedBy: [[3, 4], [3, 4], [], []] },
        { name: "1 2 3←4", carrierCount: 3, associatedCarrier: [1, 2, 3, 3], modulatedBy: [[], [], [4], []] },
        { name: "(1 2 3)←4", carrierCount: 3, associatedCarrier: [1, 2, 3, 3], modulatedBy: [[4], [4], [4], []] },
        { name: "1 2 3 4", carrierCount: 4, associatedCarrier: [1, 2, 3, 4], modulatedBy: [[], [], [], []] },
    ]);
    public static readonly operatorCarrierInterval: ReadonlyArray<number> = [0.0, 0.04, -0.073, 0.091];
    public static readonly operatorAmplitudeMax: number = 15;
    public static readonly operatorFrequencies: DictionaryArray<OperatorFrequency> = toNameMap([
        { name: "1×", mult: 1.0, hzOffset: 0.0, amplitudeSign: 1.0 },
        { name: "~1×", mult: 1.0, hzOffset: 1.5, amplitudeSign: -1.0 },
        { name: "2×", mult: 2.0, hzOffset: 0.0, amplitudeSign: 1.0 },
        { name: "~2×", mult: 2.0, hzOffset: -1.3, amplitudeSign: -1.0 },
        { name: "3×", mult: 3.0, hzOffset: 0.0, amplitudeSign: 1.0 },
        { name: "4×", mult: 4.0, hzOffset: 0.0, amplitudeSign: 1.0 },
        { name: "5×", mult: 5.0, hzOffset: 0.0, amplitudeSign: 1.0 },
        { name: "6×", mult: 6.0, hzOffset: 0.0, amplitudeSign: 1.0 },
        { name: "7×", mult: 7.0, hzOffset: 0.0, amplitudeSign: 1.0 },
        { name: "8×", mult: 8.0, hzOffset: 0.0, amplitudeSign: 1.0 },
        { name: "9×", mult: 9.0, hzOffset: 0.0, amplitudeSign: 1.0 },
        { name: "11×", mult: 11.0, hzOffset: 0.0, amplitudeSign: 1.0 },
        { name: "13×", mult: 13.0, hzOffset: 0.0, amplitudeSign: 1.0 },
        { name: "16×", mult: 16.0, hzOffset: 0.0, amplitudeSign: 1.0 },
        { name: "20×", mult: 20.0, hzOffset: 0.0, amplitudeSign: 1.0 },
    ]);
    public static readonly envelopes: DictionaryArray<Envelope> = toNameMap([
        { name: "none", type: EnvelopeType.none, speed: 0.0 },
        { name: "note size", type: EnvelopeType.noteSize, speed: 0.0 },
        { name: "punch", type: EnvelopeType.punch, speed: 0.0 },
        { name: "flare 1", type: EnvelopeType.flare, speed: 32.0 },
        { name: "flare 2", type: EnvelopeType.flare, speed: 8.0 },
        { name: "flare 3", type: EnvelopeType.flare, speed: 2.0 },
        { name: "twang 1", type: EnvelopeType.twang, speed: 32.0 },
        { name: "twang 2", type: EnvelopeType.twang, speed: 8.0 },
        { name: "twang 3", type: EnvelopeType.twang, speed: 2.0 },
        { name: "swell 1", type: EnvelopeType.swell, speed: 32.0 },
        { name: "swell 2", type: EnvelopeType.swell, speed: 8.0 },
        { name: "swell 3", type: EnvelopeType.swell, speed: 2.0 },
        { name: "tremolo1", type: EnvelopeType.tremolo, speed: 4.0 },
        { name: "tremolo2", type: EnvelopeType.tremolo, speed: 2.0 },
        { name: "tremolo3", type: EnvelopeType.tremolo, speed: 1.0 },
        { name: "tremolo4", type: EnvelopeType.tremolo2, speed: 4.0 },
        { name: "tremolo5", type: EnvelopeType.tremolo2, speed: 2.0 },
        { name: "tremolo6", type: EnvelopeType.tremolo2, speed: 1.0 },
        { name: "decay 1", type: EnvelopeType.decay, speed: 10.0 },
        { name: "decay 2", type: EnvelopeType.decay, speed: 7.0 },
        { name: "decay 3", type: EnvelopeType.decay, speed: 4.0 },
        { name: "blip 1", type: EnvelopeType.blip, speed: 6.0 },
        { name: "blip 2", type: EnvelopeType.blip, speed: 16.0 },
        { name: "blip 3", type: EnvelopeType.blip, speed: 32.0 },
    ]);
    public static readonly feedbacks: DictionaryArray<Feedback> = toNameMap([
        { name: "1⟲", indices: [[1], [], [], []] },
        { name: "2⟲", indices: [[], [2], [], []] },
        { name: "3⟲", indices: [[], [], [3], []] },
        { name: "4⟲", indices: [[], [], [], [4]] },
        { name: "1⟲ 2⟲", indices: [[1], [2], [], []] },
        { name: "3⟲ 4⟲", indices: [[], [], [3], [4]] },
        { name: "1⟲ 2⟲ 3⟲", indices: [[1], [2], [3], []] },
        { name: "2⟲ 3⟲ 4⟲", indices: [[], [2], [3], [4]] },
        { name: "1⟲ 2⟲ 3⟲ 4⟲", indices: [[1], [2], [3], [4]] },
        { name: "1→2", indices: [[], [1], [], []] },
        { name: "1→3", indices: [[], [], [1], []] },
        { name: "1→4", indices: [[], [], [], [1]] },
        { name: "2→3", indices: [[], [], [2], []] },
        { name: "2→4", indices: [[], [], [], [2]] },
        { name: "3→4", indices: [[], [], [], [3]] },
        { name: "1→3 2→4", indices: [[], [], [1], [2]] },
        { name: "1→4 2→3", indices: [[], [], [2], [1]] },
        { name: "1→2→3→4", indices: [[], [1], [2], [3]] },
    ]);
    public static readonly chipNoiseLength: number = 1 << 15; // 32768
    public static readonly spectrumNoiseLength: number = 1 << 15; // 32768
    public static readonly spectrumBasePitch: number = 24;
    public static readonly spectrumControlPoints: number = 30;
    public static readonly spectrumControlPointsPerOctave: number = 7;
    public static readonly spectrumControlPointBits: number = 3;
    public static readonly spectrumMax: number = (1 << Config.spectrumControlPointBits) - 1;
    public static readonly harmonicsControlPoints: number = 28;
    public static readonly harmonicsRendered: number = 64;
    public static readonly harmonicsRenderedForPickedString: number = 1 << 8; // 256
    public static readonly harmonicsControlPointBits: number = 3;
    public static readonly harmonicsMax: number = (1 << Config.harmonicsControlPointBits) - 1;
    public static readonly harmonicsWavelength: number = 1 << 11; // 2048
    public static readonly pulseWidthRange: number = 50;
    public static readonly pulseWidthStepPower: number = 0.5;
    public static readonly supersawVoiceCount: number = 7;
	public static readonly supersawDynamismMax: number = 6;
	public static readonly supersawSpreadMax: number = 12;
	public static readonly supersawShapeMax: number = 6;
    public static readonly pitchChannelCountMin: number = 1;
    public static readonly pitchChannelCountMax: number = 40;
    public static readonly noiseChannelCountMin: number = 0;
    public static readonly noiseChannelCountMax: number = 16;
    public static readonly modChannelCountMin: number = 0;
    public static readonly modChannelCountMax: number = 12;
    public static readonly noiseInterval: number = 6;
    public static readonly pitchesPerOctave: number = 12; // TODO: Use this for converting pitch to frequency.
    public static readonly drumCount: number = 12;
    public static readonly pitchOctaves: number = 8;
    public static readonly modCount: number = 6;
    public static readonly maxPitch: number = Config.pitchOctaves * Config.pitchesPerOctave;
    public static readonly maximumTonesPerChannel: number = Config.maxChordSize * 2;
    public static readonly justIntonationSemitones: number[] = [1.0 / 2.0, 8.0 / 15.0, 9.0 / 16.0, 3.0 / 5.0, 5.0 / 8.0, 2.0 / 3.0, 32.0 / 45.0, 3.0 / 4.0, 4.0 / 5.0, 5.0 / 6.0, 8.0 / 9.0, 15.0 / 16.0, 1.0, 16.0 / 15.0, 9.0 / 8.0, 6.0 / 5.0, 5.0 / 4.0, 4.0 / 3.0, 45.0 / 32.0, 3.0 / 2.0, 8.0 / 5.0, 5.0 / 3.0, 16.0 / 9.0, 15.0 / 8.0, 2.0].map(x => Math.log2(x) * Config.pitchesPerOctave);
    public static readonly pitchShiftRange: number = Config.justIntonationSemitones.length;
    public static readonly pitchShiftCenter: number = Config.pitchShiftRange >> 1;
    public static readonly detuneCenter: number = 200;
    public static readonly detuneMax: number = 400;
    public static readonly detuneMin: number = 0;
    public static readonly songDetuneMin: number = 0;
    public static readonly songDetuneMax: number = 500;
    public static readonly sineWaveLength: number = 1 << 8; // 256
    public static readonly sineWaveMask: number = Config.sineWaveLength - 1;
    public static readonly sineWave: Float32Array = generateSineWave();

    // Picked strings have an all-pass filter with a corner frequency based on the tone fundamental frequency, in order to add a slight inharmonicity. (Which is important for distortion.)
    public static readonly pickedStringDispersionCenterFreq: number = 6000.0; // The tone fundamental freq is pulled toward this freq for computing the all-pass corner freq.
    public static readonly pickedStringDispersionFreqScale: number = 0.3; // The tone fundamental freq freq moves this much toward the center freq for computing the all-pass corner freq.
    public static readonly pickedStringDispersionFreqMult: number = 4.0; // The all-pass corner freq is based on this times the adjusted tone fundamental freq.
    public static readonly pickedStringShelfHz: number = 4000.0; // The cutoff freq of the shelf filter that is used to decay the high frequency energy in the picked string.

    public static readonly distortionRange: number = 8;
    public static readonly stringSustainRange: number = 15;
    public static readonly stringDecayRate: number = 0.12;
    public static readonly enableAcousticSustain: boolean = false;
	public static readonly sustainTypeNames: ReadonlyArray<string> = ["bright", "acoustic"]; // See SustainType enum above.
	
    public static readonly bitcrusherFreqRange: number = 14;
    public static readonly bitcrusherOctaveStep: number = 0.5;
    public static readonly bitcrusherQuantizationRange: number = 8;

    public static readonly maxEnvelopeCount: number = 12;
    public static readonly defaultAutomationRange: number = 13;
    public static readonly instrumentAutomationTargets: DictionaryArray<AutomationTarget> = toNameMap([
        { name: "none", computeIndex: null, displayName: "none",             /*perNote: false,*/ interleave: false, isFilter: false, /*range: 0,                              */    maxCount: 1, effect: null, compatibleInstruments: null },
        { name: "noteVolume", computeIndex: EnvelopeComputeIndex.noteVolume, displayName: "note volume",      /*perNote:  true,*/ interleave: false, isFilter: false, /*range: Config.volumeRange,             */    maxCount: 1, effect: null, compatibleInstruments: null },
        { name: "pulseWidth", computeIndex: EnvelopeComputeIndex.pulseWidth, displayName: "pulse width",      /*perNote:  true,*/ interleave: false, isFilter: false, /*range: Config.pulseWidthRange,         */    maxCount: 1, effect: null, compatibleInstruments: [InstrumentType.pwm, InstrumentType.supersaw] },
        { name: "stringSustain", computeIndex: EnvelopeComputeIndex.stringSustain, displayName: "sustain",          /*perNote:  true,*/ interleave: false, isFilter: false, /*range: Config.stringSustainRange,      */    maxCount: 1, effect: null, compatibleInstruments: [InstrumentType.pickedString] },
        { name: "unison", computeIndex: EnvelopeComputeIndex.unison, displayName: "unison",           /*perNote:  true,*/ interleave: false, isFilter: false, /*range: Config.defaultAutomationRange,  */    maxCount: 1, effect: null, compatibleInstruments: [InstrumentType.chip, InstrumentType.harmonics, InstrumentType.pickedString] },
        { name: "operatorFrequency", computeIndex: EnvelopeComputeIndex.operatorFrequency0, displayName: "fm# freq",         /*perNote:  true,*/ interleave: true, isFilter: false, /*range: Config.defaultAutomationRange,  */    maxCount: Config.operatorCount, effect: null, compatibleInstruments: [InstrumentType.fm] },
        { name: "operatorAmplitude", computeIndex: EnvelopeComputeIndex.operatorAmplitude0, displayName: "fm# volume",       /*perNote:  true,*/ interleave: false, isFilter: false, /*range: Config.operatorAmplitudeMax + 1,*/    maxCount: Config.operatorCount, effect: null, compatibleInstruments: [InstrumentType.fm] },
        { name: "feedbackAmplitude", computeIndex: EnvelopeComputeIndex.feedbackAmplitude, displayName: "fm feedback",      /*perNote:  true,*/ interleave: false, isFilter: false, /*range: Config.operatorAmplitudeMax + 1,*/    maxCount: 1, effect: null, compatibleInstruments: [InstrumentType.fm] },
        { name: "pitchShift", computeIndex: EnvelopeComputeIndex.pitchShift, displayName: "pitch shift",      /*perNote:  true,*/ interleave: false, isFilter: false, /*range: Config.pitchShiftRange,         */    maxCount: 1, effect: EffectType.pitchShift, compatibleInstruments: null },
        { name: "detune", computeIndex: EnvelopeComputeIndex.detune, displayName: "detune",           /*perNote:  true,*/ interleave: false, isFilter: false, /*range: Config.detuneMax + 1,           */    maxCount: 1, effect: EffectType.detune, compatibleInstruments: null },
        { name: "vibratoDepth", computeIndex: EnvelopeComputeIndex.vibratoDepth, displayName: "vibrato range",    /*perNote:  true,*/ interleave: false, isFilter: false, /*range: Config.defaultAutomationRange,  */    maxCount: 1, effect: EffectType.vibrato, compatibleInstruments: null },
        { name: "noteFilterAllFreqs", computeIndex: EnvelopeComputeIndex.noteFilterAllFreqs, displayName: "n. filter freqs",  /*perNote:  true,*/ interleave: false, isFilter: true, /*range: null,                           */    maxCount: 1, effect: EffectType.noteFilter, compatibleInstruments: null },
        {name: "noteFilterFreq",         computeIndex:       EnvelopeComputeIndex.noteFilterFreq0,        displayName: "n. filter # freq", /*perNote:  true,*/ interleave: false/*true*/, isFilter:  true, /*range: Config.filterFreqRange, */    maxCount: Config.filterMaxPoints, effect: EffectType.noteFilter, compatibleInstruments: null},
		// Controlling filter gain is less obvious and intuitive than controlling filter freq, so to avoid confusion I've disabled it for envelopes.
		{name: "noteFilterGain",         computeIndex:                           null,                    displayName: "n. filter # vol",  /*perNote:  true,*/ interleave: false, isFilter:  true, /*range: Config.filterGainRange,         */    maxCount: Config.filterMaxPoints, effect: EffectType.noteFilter, compatibleInstruments: null},
		{name: "supersawDynamism",       computeIndex:       EnvelopeComputeIndex.supersawDynamism,       displayName: "dynamism",         /*perNote:  true,*/ interleave: false, isFilter: false, /*range: Config.supersawDynamismMax + 1, */    maxCount: 1,    effect: null,                    compatibleInstruments: [InstrumentType.supersaw]},
		{name: "supersawSpread",         computeIndex:       EnvelopeComputeIndex.supersawSpread,         displayName: "spread",           /*perNote:  true,*/ interleave: false, isFilter: false, /*range: Config.supersawSpreadMax + 1,   */    maxCount: 1,    effect: null,                    compatibleInstruments: [InstrumentType.supersaw]},
		{name: "supersawShape",          computeIndex:       EnvelopeComputeIndex.supersawShape,          displayName: "saw↔pulse",        /*perNote:  true,*/ interleave: false, isFilter: false, /*range: Config.supersawShapeMax + 1,    */    maxCount: 1,    effect: null,                    compatibleInstruments: [InstrumentType.supersaw]},
		/*
        {name: "distortion",             computeIndex: InstrumentAutomationIndex.distortion,             displayName: "distortion",       perNote: false, interleave: false, isFilter: false, range: Config.distortionRange,             maxCount: 1,    effect: EffectType.distortion,   compatibleInstruments: null},
        {name: "bitcrusherQuantization", computeIndex: InstrumentAutomationIndex.bitcrusherQuantization, displayName: "bit crush",        perNote: false, interleave: false, isFilter: false, range: Config.bitcrusherQuantizationRange, maxCount: 1,    effect: EffectType.bitcrusher,   compatibleInstruments: null},
        {name: "bitcrusherFrequency",    computeIndex: InstrumentAutomationIndex.bitcrusherFrequency,    displayName: "freq crush",       perNote: false, interleave: false, isFilter: false, range: Config.bitcrusherFreqRange,         maxCount: 1,    effect: EffectType.bitcrusher,   compatibleInstruments: null},
        {name: "eqFilterAllFreqs",       computeIndex: InstrumentAutomationIndex.eqFilterAllFreqs,       displayName: "eq filter freqs",  perNote: false, interleave: false, isFilter:  true, range: null,                               maxCount: 1,    effect: null,                    compatibleInstruments: null},
        {name: "eqFilterFreq",           computeIndex: InstrumentAutomationIndex.eqFilterFreq0,          displayName: "eq filter # freq", perNote: false, interleave:  true, isFilter:  true, range: Config.filterFreqRange,             maxCount: Config.filterMaxPoints, effect: null,  compatibleInstruments: null},
        {name: "eqFilterGain",           computeIndex: InstrumentAutomationIndex.eqFilterGain0,          displayName: "eq filter # vol",  perNote: false, interleave: false, isFilter:  true, range: Config.filterGainRange,             maxCount: Config.filterMaxPoints, effect: null,  compatibleInstruments: null},
        {name: "panning",                computeIndex: InstrumentAutomationIndex.panning,                displayName: "panning",          perNote: false, interleave: false, isFilter: false, range: Config.panMax + 1,                  maxCount: 1,    effect: EffectType.panning,      compatibleInstruments: null},
        {name: "chorus",                 computeIndex: InstrumentAutomationIndex.chorus,                 displayName: "chorus",           perNote: false, interleave: false, isFilter: false, range: Config.chorusRange,                 maxCount: 1,    effect: EffectType.chorus,       compatibleInstruments: null},
        {name: "echoSustain",            computeIndex: InstrumentAutomationIndex.echoSustain,            displayName: "echo",             perNote: false, interleave: false, isFilter: false, range: Config.echoSustainRange,            maxCount: 1,    effect: EffectType.echo,         compatibleInstruments: null},
        {name: "echoDelay",              computeIndex: InstrumentAutomationIndex.echoDelay,              displayName: "echo delay",       perNote: false, interleave: false, isFilter: false, range: Config.echoDelayRange,              maxCount: 1,    effect: EffectType.echo,         compatibleInstruments: null}, // wait until after we're computing a tick's settings for multiple run lengths.
        {name: "reverb",                 computeIndex: InstrumentAutomationIndex.reverb,                 displayName: "reverb",           perNote: false, interleave: false, isFilter: false, range: Config.reverbRange,                 maxCount: 1,    effect: EffectType.reverb,       compatibleInstruments: null},
        {name: "mixVolume",              computeIndex: InstrumentAutomationIndex.mixVolume,              displayName: "mix volume",       perNote: false, interleave: false, isFilter: false, range: Config.volumeRange,                 maxCount: 1,    effect: null,                    compatibleInstruments: null},
        {name: "envelope#",              computeIndex: null,                                             displayName: "envelope",         perNote: false, interleave: false, isFilter: false, range: Config.defaultAutomationRange,      maxCount: Config.maxEnvelopeCount, effect: null, compatibleInstruments: null}, // maxCount special case for envelopes to be allowed to target earlier ones.
        */
    ]);
    public static readonly operatorWaves: DictionaryArray<OperatorWave> = toNameMap([
        { name: "sine", samples: Config.sineWave },
        { name: "triangle", samples: generateTriWave() },
        { name: "sawtooth", samples: generateSawWave() },
        { name: "pulse width", samples: generateSquareWave() },
        { name: "ramp", samples: generateSawWave(true) },
        { name: "trapezoid", samples: generateTrapezoidWave(2) },
    ]);
    public static readonly pwmOperatorWaves: DictionaryArray<OperatorWave> = toNameMap([
        { name: "1%", samples: generateSquareWave(0.01) },
        { name: "5%", samples: generateSquareWave(0.05) },
        { name: "12.5%", samples: generateSquareWave(0.125) },
        { name: "25%", samples: generateSquareWave(0.25) },
        { name: "33%", samples: generateSquareWave(1 / 3) },
        { name: "50%", samples: generateSquareWave(0.5) },
        { name: "66%", samples: generateSquareWave(2 / 3) },
        { name: "75%", samples: generateSquareWave(0.75) },
        { name: "87.5%", samples: generateSquareWave(0.875) },
        { name: "95%", samples: generateSquareWave(0.95) },
        { name: "99%", samples: generateSquareWave(0.99) },
    ]);


    // Height of the small editor column for inserting/deleting rows, in pixels.
    public static readonly barEditorHeight: number = 10;

    // Careful about changing index ordering for this. Index is stored in URL/JSON etc.
    public static readonly modulators: DictionaryArray<Modulator> = toNameMap([
        { name: "none", pianoName: "None", maxRawVol: 6, newNoteVol: 6, forSong: true, convertRealFactor: 0, associatedEffect: EffectType.length,
            promptName: "No Mod Setting", promptDesc: [ "No setting has been chosen yet, so this modulator will have no effect. Try choosing a setting with the dropdown, then click this '?' again for more info.", "[$LO - $HI]" ] },
        { name: "song volume", pianoName: "Volume", maxRawVol: 100, newNoteVol: 100, forSong: true, convertRealFactor: 0, associatedEffect: EffectType.length,
            promptName: "Song Volume", promptDesc: [ "This setting affects the overall volume of the song, just like the main volume slider.", "At $HI, the volume will be unchanged from default, and it will get gradually quieter down to $LO.", "[MULTIPLICATIVE] [$LO - $HI] [%]" ] },
        { name: "tempo", pianoName: "Tempo", maxRawVol: Config.tempoMax - Config.tempoMin, newNoteVol: Math.ceil((Config.tempoMax - Config.tempoMin) / 2), forSong: true, convertRealFactor: Config.tempoMin, associatedEffect: EffectType.length,
            promptName: "Song Tempo", promptDesc: [ "This setting controls the speed your song plays at, just like the tempo slider.", "When you first make a note for this setting, it will default to your current tempo. Raising it speeds up the song, up to $HI BPM, and lowering it slows it down, to a minimum of $LO BPM.", "Note that you can make a 'swing' effect by rapidly changing between two tempo values.", "[OVERWRITING] [$LO - $HI] [BPM]" ] },
        { name: "song reverb", pianoName: "Reverb", maxRawVol: Config.reverbRange * 2, newNoteVol: Config.reverbRange, forSong: true, convertRealFactor: -Config.reverbRange, associatedEffect: EffectType.length,
            promptName: "Song Reverb", promptDesc: [ "This setting affects the overall reverb of your song. It works by multiplying existing reverb for instruments, so those with no reverb set will be unaffected.", "At $MID, all instruments' reverb will be unchanged from default. This increases up to double the reverb value at $HI, or down to no reverb at $LO.", "[MULTIPLICATIVE] [$LO - $HI]" ] },
        { name: "next bar", pianoName: "Next Bar", maxRawVol: 1, newNoteVol: 1, forSong: true, convertRealFactor: 0, associatedEffect: EffectType.length,
            promptName: "Go To Next Bar", promptDesc: [ "This setting functions a little different from most. Wherever a note is placed, the song will jump immediately to the next bar when it is encountered.", "This jump happens at the very start of the note, so the length of a next-bar note is irrelevant. Also, the note can be value 0 or 1, but the value is also irrelevant - wherever you place a note, the song will jump.", "You can make mixed-meter songs or intro sections by cutting off unneeded beats with a next-bar modulator.", "[$LO - $HI]" ] },
        { name: "note volume", pianoName: "Note Vol.", maxRawVol: Config.volumeRange, newNoteVol: Math.ceil(Config.volumeRange / 2), forSong: false, convertRealFactor: Math.ceil(-Config.volumeRange / 2.0), associatedEffect: EffectType.length,
            promptName: "Note Volume", promptDesc: [ "This setting affects the volume of your instrument as if its note size had been scaled.", "At $MID, an instrument's volume will be unchanged from default. This means you can still use the volume sliders to mix the base volume of instruments. The volume gradually increases up to $HI, or decreases down to mute at $LO.", "This setting was the default for volume modulation in Citron for a long time. Due to some new effects like distortion and bitcrush, note volume doesn't always allow fine volume control. Also, this modulator affects the value of FM modulator waves instead of just carriers. This can distort the sound which may be useful, but also may be undesirable. In those cases, use the 'mix volume' modulator instead, which will always just scale the volume with no added effects.", "For display purposes, this mod will show up on the instrument volume slider, as long as there is not also an active 'mix volume' modulator anyhow. However, as mentioned, it works more like changing note volume.", "[MULTIPLICATIVE] [$LO - $HI]" ] },
        { name: "pan", pianoName: "Pan", maxRawVol: Config.panMax, newNoteVol: Math.ceil(Config.panMax / 2), forSong: false, convertRealFactor: 0, associatedEffect: EffectType.panning,
            promptName: "Instrument Panning", promptDesc: [ "This setting controls the panning of your instrument, just like the panning slider.", "At $LO, your instrument will sound like it is coming fully from the left-ear side. At $MID it will be right in the middle, and at $HI, it will sound like it's on the right.", "[OVERWRITING] [$LO - $HI] [L-R]" ] },
        { name: "reverb", pianoName: "Reverb", maxRawVol: Config.reverbRange, newNoteVol: 0, forSong: false, convertRealFactor: 0, associatedEffect: EffectType.reverb,
            promptName: "Instrument Reverb", promptDesc: [ "This setting controls the reverb of your insturment, just like the reverb slider.", "At $LO, your instrument will have no reverb. At $HI, it will be at maximum.", "[OVERWRITING] [$LO - $HI]"] },
        { name: "distortion", pianoName: "Distortion", maxRawVol: Config.distortionRange-1, newNoteVol: 0, forSong: false, convertRealFactor: 0, associatedEffect: EffectType.distortion,
            promptName: "Instrument Distortion", promptDesc: [ "This setting controls the amount of distortion for your instrument, just like the distortion slider.", "At $LO, your instrument will have no distortion. At $HI, it will be at maximum.", "[OVERWRITING] [$LO - $HI]" ] },
        { name: "fm slider 1", pianoName: "FM 1", maxRawVol: 15, newNoteVol: 15, forSong: false, convertRealFactor: 0, associatedEffect: EffectType.length,
            promptName: "FM Slider 1", promptDesc: [ "This setting affects the strength of the first FM slider, just like the corresponding slider on your instrument.", "It works in a multiplicative way, so at $HI your slider will sound the same is its default value, and at $LO it will sound like it has been moved all the way to the left.", "For the full range of control with this mod, move your underlying slider all the way to the right.", "[MULTIPLICATIVE] [$LO - $HI] [%]"] },
        { name: "fm slider 2", pianoName: "FM 2", maxRawVol: 15, newNoteVol: 15, forSong: false, convertRealFactor: 0, associatedEffect: EffectType.length,
            promptName: "FM Slider 2", promptDesc: ["This setting affects the strength of the second FM slider, just like the corresponding slider on your instrument.", "It works in a multiplicative way, so at $HI your slider will sound the same is its default value, and at $LO it will sound like it has been moved all the way to the left.", "For the full range of control with this mod, move your underlying slider all the way to the right.", "[MULTIPLICATIVE] [$LO - $HI] [%]" ] },
        { name: "fm slider 3", pianoName: "FM 3", maxRawVol: 15, newNoteVol: 15, forSong: false, convertRealFactor: 0, associatedEffect: EffectType.length,
            promptName: "FM Slider 3", promptDesc: ["This setting affects the strength of the third FM slider, just like the corresponding slider on your instrument.", "It works in a multiplicative way, so at $HI your slider will sound the same is its default value, and at $LO it will sound like it has been moved all the way to the left.", "For the full range of control with this mod, move your underlying slider all the way to the right.", "[MULTIPLICATIVE] [$LO - $HI] [%]" ] },
        { name: "fm slider 4", pianoName: "FM 4", maxRawVol: 15, newNoteVol: 15, forSong: false, convertRealFactor: 0, associatedEffect: EffectType.length,
            promptName: "FM Slider 4", promptDesc: ["This setting affects the strength of the fourth FM slider, just like the corresponding slider on your instrument.", "It works in a multiplicative way, so at $HI your slider will sound the same is its default value, and at $LO it will sound like it has been moved all the way to the left.", "For the full range of control with this mod, move your underlying slider all the way to the right.", "[MULTIPLICATIVE] [$LO - $HI] [%]"] },
        { name: "fm feedback", pianoName: "FM Feedback", maxRawVol: 15, newNoteVol: 15, forSong: false, convertRealFactor: 0, associatedEffect: EffectType.length,
            promptName: "FM Feedback", promptDesc: ["This setting affects the strength of the FM feedback slider, just like the corresponding slider on your instrument.", "It works in a multiplicative way, so at $HI your slider will sound the same is its default value, and at $LO it will sound like it has been moved all the way to the left.", "For the full range of control with this mod, move your underlying slider all the way to the right.", "[MULTIPLICATIVE] [$LO - $HI] [%]"] },
        { name: "pulse width", pianoName: "Pulse Width", maxRawVol: Config.pulseWidthRange, newNoteVol: Config.pulseWidthRange, forSong: false, convertRealFactor: 0, associatedEffect: EffectType.length,
            promptName: "Pulse Width", promptDesc: ["This setting controls the width of this instrument's pulse wave, just like the pulse width slider.", "At $HI, your instrument will sound like a pure square wave (on 50% of the time). It will gradually sound narrower down to $LO, where it will be inaudible (as it is on 0% of the time).", "Changing pulse width randomly between a few values is a common strategy in chiptune music to lend some personality to a lead instrument.", "[OVERWRITING] [$LO - $HI] [%Duty]"] },
        { name: "detune", pianoName: "Detune", maxRawVol: Config.detuneMax - Config.detuneMin, newNoteVol: Config.detuneCenter, forSong: false, convertRealFactor: -Config.detuneCenter, associatedEffect: EffectType.detune,
            promptName: "Instrument Detune", promptDesc: ["This setting controls the detune for this instrument, just like the detune slider.", "At $MID, your instrument will have no detune applied. Each tick corresponds to one cent, or one-hundredth of a pitch. Thus, each change of 100 ticks corresponds to one half-step of detune, up to two half-steps up at $HI, or two half-steps down at $LO.", "[OVERWRITING] [$LO - $HI] [cents]"] },
        { name: "vibrato depth", pianoName: "Vibrato Depth", maxRawVol: 50, newNoteVol: 0, forSong: false, convertRealFactor: 0, associatedEffect: EffectType.vibrato,
            promptName: "Vibrato Depth", promptDesc: ["This setting controls the amount that your pitch moves up and down by during vibrato, just like the vibrato depth slider.", "At $LO, your instrument will have no vibrato depth so its vibrato would be inaudible. This increases up to $HI, where an extreme pitch change will be noticeable.", "[OVERWRITING] [$LO - $HI] [pitch ÷25]"] },
        { name: "song detune", pianoName: "Detune", maxRawVol: Config.songDetuneMax - Config.songDetuneMin, newNoteVol: Math.ceil((Config.songDetuneMax - Config.songDetuneMin) / 2), forSong: true, convertRealFactor: -250, associatedEffect: EffectType.length,
            promptName: "Song Detune", promptDesc: ["This setting controls the overall detune of the entire song. There is no associated slider.", "At $MID, your song will have no extra detune applied and sound unchanged from default. Each tick corresponds to four cents, or four hundredths of a pitch. Thus, each change of 25 ticks corresponds to one half-step of detune, up to 10 half-steps up at $HI, or 10 half-steps down at $LO.", "[MULTIPLICATIVE] [$LO - $HI] [cents x4]"] },
        { name: "vibrato speed", pianoName: "Vibrato Speed", maxRawVol: 30, newNoteVol: 0, forSong: false, convertRealFactor: 0, associatedEffect: EffectType.vibrato,
            promptName: "Vibrato Speed", promptDesc: ["This setting controls the speed your instrument will vibrato at, just like the slider.", "A setting of $LO means there will be no oscillation, and vibrato will be disabled. Higher settings will increase the speed, up to a dramatic trill at the max value, $HI.", "[OVERWRITING] [$LO - $HI]"] },
        { name: "vibrato delay", pianoName: "Vibrato Delay", maxRawVol: 50, newNoteVol: 0, forSong: false, convertRealFactor: 0, associatedEffect: EffectType.vibrato,
            promptName: "Vibrato Delay", promptDesc: ["This setting controls the amount of time vibrato will be held off for before triggering for every new note, just like the slider.", "A setting of $LO means there will be no delay. A setting of 24 corresponds to one full beat of delay. As a sole exception to this scale, setting delay to $HI will completely disable vibrato (as if it had infinite delay).", "[OVERWRITING] [$LO - $HI] [beats ÷24]"] },
        { name: "arp speed", pianoName: "Arp Speed", maxRawVol: 50, newNoteVol: 12, forSong: false, convertRealFactor: 0, associatedEffect: EffectType.chord,
            promptName: "Arpeggio Speed", promptDesc: ["This setting controls the speed at which your instrument's chords arpeggiate, just like the arpeggio speed slider.", "Each setting corresponds to a different speed, from the slowest to the fastest. The speeds are listed below.",
                "[0-4]: x0, x1/16, x⅛, x⅕, x¼,", "[5-9]: x⅓, x⅖, x½, x⅔, x¾,", "[10-14]: x⅘, x0.9, x1, x1.1, x1.2,", "[15-19]: x1.3, x1.4, x1.5, x1.6, x1.7,", "[20-24]: x1.8, x1.9, x2, x2.1, x2.2,", "[25-29]: x2.3, x2.4, x2.5, x2.6, x2.7,", "[30-34]: x2.8, x2.9, x3, x3.1, x3.2,", "[35-39]: x3.3, x3.4, x3.5, x3.6, x3.7," ,"[40-44]: x3.8, x3.9, x4, x4.15, x4.3,", "[45-50]: x4.5, x4.8, x5, x5.5, x6, x8", "[OVERWRITING] [$LO - $HI]"] },
        { name: "pan delay", pianoName: "Pan Delay", maxRawVol: 20, newNoteVol: 10, forSong: false, convertRealFactor: 0, associatedEffect: EffectType.panning,
            promptName: "Panning Delay", promptDesc: ["This setting controls the delay applied to panning for your instrument, just like the pan delay slider.", "With more delay, the panning effect will generally be more pronounced. $MID is the default value, whereas $LO will remove any delay at all. No delay can be desirable for chiptune songs.", "[OVERWRITING] [$LO - $HI]"] },
        { name: "reset arp", pianoName: "Reset Arp", maxRawVol: 1, newNoteVol: 1, forSong: false, convertRealFactor: 0, associatedEffect: EffectType.chord,
            promptName: "Reset Arpeggio", promptDesc: ["This setting functions a little different from most. Wherever a note is placed, the arpeggio of this instrument will reset at the very start of that note. This is most noticeable with lower arpeggio speeds. The lengths and values of notes for this setting don't matter, just the note start times.", "This mod can be used to sync up your apreggios so that they always sound the same, even if you are using an odd-ratio arpeggio speed or modulating arpeggio speed.", "[$LO - $HI]"] },
        { name: "eq filter", pianoName: "EQFlt", maxRawVol: 10, newNoteVol: 0, forSong: false, convertRealFactor: 0, associatedEffect: EffectType.length,
            promptName: "EQ Filter", promptDesc: ["This setting controls a few separate things for your instrument's EQ filter.", "When the option 'morph' is selected, your modulator values will indicate a sub-filter index of your EQ filter to 'morph' to over time. For example, a change from 0 to 1 means your main filter (default) will morph to sub-filter 1 over the specified duration. You can shape the main filter and sub-filters in the large filter editor ('+' button). If your two filters' number, type, and order of filter dots all match up, the morph will happen smoothly and you'll be able to hear them changing. If they do not match up, the filters will simply jump between each other.", "Note that filters will morph based on endpoints in the pattern editor. So, if you specify a morph from sub-filter 1 to 4 but do not specifically drag in new endpoints for 2 and 3, it will morph directly between 1 and 4 without going through the others.", "If you target Dot X or Dot Y, you can finely tune the coordinates of a single dot for your filter. The number of available dots to choose is dependent on your main filter's dot count.", "[OVERWRITING] [$LO - $HI]"] },
        { name: "note filter", pianoName: "N.Flt", maxRawVol: 10, newNoteVol: 0, forSong: false, convertRealFactor: 0, associatedEffect: EffectType.noteFilter,
            promptName: "Note Filter", promptDesc: ["This setting controls a few separate things for your instrument's note filter.", "When the option 'morph' is selected, your modulator values will indicate a sub-filter index of your note filter to 'morph' to over time. For example, a change from 0 to 1 means your main filter (default) will morph to sub-filter 1 over the specified duration. You can shape the main filter and sub-filters in the large filter editor ('+' button). If your two filters' number, type, and order of filter dots all match up, the morph will happen smoothly and you'll be able to hear them changing. If they do not match up, the filters will simply jump between each other.", "Note that filters will morph based on endpoints in the pattern editor. So, if you specify a morph from sub-filter 1 to 4 but do not specifically drag in new endpoints for 2 and 3, it will morph directly between 1 and 4 without going through the others.", "If you target Dot X or Dot Y, you can finely tune the coordinates of a single dot for your filter. The number of available dots to choose is dependent on your main filter's dot count.", "[OVERWRITING] [$LO - $HI]"] },
        { name: "bit crush", pianoName: "Bitcrush", maxRawVol: Config.bitcrusherQuantizationRange-1, newNoteVol: Math.round(Config.bitcrusherQuantizationRange / 2), forSong: false, convertRealFactor: 0, associatedEffect: EffectType.bitcrusher,
            promptName: "Instrument Bit Crush", promptDesc: ["This setting controls the bit crush of your instrument, just like the bit crush slider.", "At a value of $LO, no bit crush will be applied. This increases and the bit crush effect gets more noticeable up to the max value, $HI.", "[OVERWRITING] [$LO - $HI]"] },
        { name: "freq crush", pianoName: "Freq Crush", maxRawVol: Config.bitcrusherFreqRange-1, newNoteVol: Math.round(Config.bitcrusherFreqRange / 2), forSong: false, convertRealFactor: 0, associatedEffect: EffectType.bitcrusher,
            promptName: "Instrument Frequency Crush", promptDesc: ["This setting controls the frequency crush of your instrument, just like the freq crush slider.", "At a value of $LO, no frequency crush will be applied. This increases and the frequency crush effect gets more noticeable up to the max value, $HI.", "[OVERWRITING] [$LO - $HI]"] },
        { name: "echo", pianoName: "Echo", maxRawVol: Config.echoSustainRange-1, newNoteVol: 0, forSong: false, convertRealFactor: 0, associatedEffect: EffectType.echo,
            promptName: "Instrument Echo Sustain", promptDesc: ["This setting controls the echo sustain (echo loudness) of your instrument, just like the echo slider.", "At $LO, your instrument will have no echo sustain and echo will not be audible. Echo sustain increases and the echo effect gets more noticeable up to the max value, $HI.", "[OVERWRITING] [$LO - $HI]"] },
        { name: "echo delay", pianoName: "Echo Delay", maxRawVol: Config.echoDelayRange, newNoteVol: 0, forSong: false, convertRealFactor: 0, associatedEffect: EffectType.length,
            promptName: "Instrument Echo Delay", promptDesc: ["This setting controls the echo delay of your instrument, just like the echo delay slider.", "At $LO, your instrument will have very little echo delay, and this increases up to 2 beats of delay at $HI.", "[OVERWRITING] [$LO - $HI] [~beats ÷12]" ]
        }, // Disabled via associatedEffect and manually in list build in SongEditor, enable and set back to echo after fixing bugginess!
        { name: "chorus", pianoName: "Chorus", maxRawVol: Config.chorusRange-1, newNoteVol: 0, forSong: false, convertRealFactor: 0, associatedEffect: EffectType.chorus,
            promptName: "Instrument Chorus", promptDesc: ["This setting controls the chorus strength of your instrument, just like the chorus slider.", "At $LO, the chorus effect will be disabled. The strength of the chorus effect increases up to the max value, $HI.", "[OVERWRITING] [$LO - $HI]"] },
        { name: "eq filt cut", pianoName: "EQFlt Cut", maxRawVol: Config.filterSimpleCutRange - 1, newNoteVol: Config.filterSimpleCutRange - 1, forSong: false, convertRealFactor: 0, associatedEffect: EffectType.length,
            promptName: "EQ Filter Cutoff Frequency", promptDesc: ["This setting controls the filter cut position of your instrument, just like the filter cut slider.", "This setting is roughly analagous to the horizontal position of a single low-pass dot on the advanced filter editor. At lower values, a wider range of frequencies is cut off.", "[OVERWRITING] [$LO - $HI]"] },
        { name: "eq filt peak", pianoName: "EQFlt Peak", maxRawVol: Config.filterSimplePeakRange - 1, newNoteVol: 0, forSong: false, convertRealFactor: 0, associatedEffect: EffectType.length,
            promptName: "EQ Filter Peak Gain", promptDesc: ["This setting controls the filter peak position of your instrument, just like the filter peak slider.", "This setting is roughly analagous to the vertical position of a single low-pass dot on the advanced filter editor. At lower values, the cutoff frequency will not be emphasized, and at higher values you will hear emphasis on the cutoff frequency.", "[OVERWRITING] [$LO - $HI]"] },
        { name: "note filt cut", pianoName: "N.Flt Cut", maxRawVol: Config.filterSimpleCutRange - 1, newNoteVol: Config.filterSimpleCutRange - 1, forSong: false, convertRealFactor: 0, associatedEffect: EffectType.noteFilter,
            promptName: "Note Filter Cutoff Frequency", promptDesc: ["This setting controls the filter cut position of your instrument, just like the filter cut slider.", "This setting is roughly analagous to the horizontal position of a single low-pass dot on the advanced filter editor. At lower values, a wider range of frequencies is cut off.", "[OVERWRITING] [$LO - $HI]"] },
        { name: "note filt peak", pianoName: "N.Flt Peak", maxRawVol: Config.filterSimplePeakRange - 1, newNoteVol: 0, forSong: false, convertRealFactor: 0, associatedEffect: EffectType.noteFilter,
            promptName: "Note Filter Peak Gain", promptDesc: ["This setting controls the filter peak position of your instrument, just like the filter peak slider.", "This setting is roughly analagous to the vertical position of a single low-pass dot on the advanced filter editor. At lower values, the cutoff frequency will not be emphasized, and at higher values you will hear emphasis on the cutoff frequency.", "[OVERWRITING] [$LO - $HI]"] },
        { name: "pitch shift", pianoName: "Pitch Shift", maxRawVol: Config.pitchShiftRange - 1, newNoteVol: Config.pitchShiftCenter, forSong: false, convertRealFactor: -Config.pitchShiftCenter, associatedEffect: EffectType.pitchShift,
            promptName: "Pitch Shift", promptDesc: ["This setting controls the pitch offset of your instrument, just like the pitch shift slider.", "At $MID your instrument will have no pitch shift. This increases as you decrease toward $LO pitches (half-steps) at the low end, or increases towards +$HI pitches at the high end.", "[OVERWRITING] [$LO - $HI] [pitch]"] },
        { name: "sustain", pianoName: "Sustain", maxRawVol: Config.stringSustainRange - 1, newNoteVol: 0, forSong: false, convertRealFactor: 0, associatedEffect: EffectType.length,
            promptName: "Picked String Sustain", promptDesc: ["This setting controls the sustain of your picked string instrument, just like the sustain slider.", "At $LO, your instrument will have minimum sustain and sound 'plucky'. This increases to a more held sound as your modulator approaches the maximum, $HI.", "[OVERWRITING] [$LO - $HI]"] },
        { name: "mix volume", pianoName: "Mix Vol.", maxRawVol: Config.volumeRange, newNoteVol: Math.ceil(Config.volumeRange / 2), forSong: false, convertRealFactor: Math.ceil(-Config.volumeRange / 2.0), associatedEffect: EffectType.length,
            promptName: "Mix Volume", promptDesc: ["This setting affects the volume of your instrument as if its volume slider had been moved.", "At $MID, an instrument's volume will be unchanged from default. This means you can still use the volume sliders to mix the base volume of instruments, since this setting and the default value work multiplicatively. The volume gradually increases up to $HI, or decreases down to mute at $LO.", "Unlike the 'note volume' setting, mix volume is very straightforward and simply affects the resultant instrument volume after all effects are applied.", "[MULTIPLICATIVE] [$LO - $HI]"] },
        { name: "envelope speed", pianoName: "EnvelopeSpd", maxRawVol: 50, newNoteVol: 12, forSong: false, convertRealFactor: 0, associatedEffect: EffectType.length,
            promptName: "Envelope Speed", promptDesc: ["This setting controls how fast all of the envelopes for the instrument play.", "At $LO, your instrument's envelopes will be frozen, and at values near there they will change very slowly. At 12, the envelopes will work as usual, performing at normal speed. This increases up to $HI, where the envelopes will change very quickly. The speeds are given below:",
                "[0-4]: x0, x1/16, x⅛, x⅕, x¼,", "[5-9]: x⅓, x⅖, x½, x⅔, x¾,", "[10-14]: x⅘, x0.9, x1, x1.1, x1.2,", "[15-19]: x1.3, x1.4, x1.5, x1.6, x1.7,", "[20-24]: x1.8, x1.9, x2, x2.1, x2.2,", "[25-29]: x2.3, x2.4, x2.5, x2.6, x2.7,", "[30-34]: x2.8, x2.9, x3, x3.1, x3.2,", "[35-39]: x3.3, x3.4, x3.5, x3.6, x3.7," ,"[40-44]: x3.8, x3.9, x4, x4.15, x4.3,", "[45-50]: x4.5, x4.8, x5, x5.5, x6, x8", "[OVERWRITING] [$LO - $HI]"] },
        { name: "dynamism", pianoName: "Dynamism", maxRawVol: Config.supersawDynamismMax, newNoteVol: 0, forSong: false, convertRealFactor: 0, associatedEffect: EffectType.length,
            promptName: "Supersaw Dynamism", promptDesc: ["This setting controls the supersaw dynamism of your instrument, just like the dynamism slider.", "At $LO, your instrument will have only a single pulse contributing. Increasing this will raise the contribution of other waves which is similar to a chorus effect. The effect gets more noticeable up to the max value, $HI.", "[OVERWRITING] [$LO - $HI]"] },
        { name: "spread", pianoName: "Spread", maxRawVol: Config.supersawSpreadMax, newNoteVol: 0, forSong: false, convertRealFactor: 0, associatedEffect: EffectType.length,
            promptName: "Supersaw Spread", promptDesc: ["This setting controls the supersaw spread of your instrument, just like the spread slider.", "At $LO, all the pulses in your supersaw will be at the same frequency. Increasing this value raises the frequency spread of the contributing waves, up to a dissonant spread at the max value, $HI.", "[OVERWRITING] [$LO - $HI]"] },
        { name: "saw shape", pianoName: "Saw Shape", maxRawVol: Config.supersawShapeMax, newNoteVol: 0, forSong: false, convertRealFactor: 0, associatedEffect: EffectType.length,
            promptName: "Supersaw Shape", promptDesc: ["This setting controls the supersaw shape of your instrument, just like the Saw↔Pulse slider.", "As the slider's name implies, this effect will give you a sawtooth wave at $LO, and a full pulse width wave at $HI. Values in between will be a blend of the two.", "[OVERWRITING] [$LO - $HI] [%]"] },
    ]);
}

function centerWave(wave: Array<number>): Float32Array {
    let sum: number = 0.0;
    for (let i: number = 0; i < wave.length; i++) sum += wave[i];
    const average: number = sum / wave.length;
    for (let i: number = 0; i < wave.length; i++) wave[i] -= average;
    performIntegral(wave);
    // The first sample should be zero, and we'll duplicate it at the end for easier interpolation.
    wave.push(0);
    return new Float32Array(wave);
}
function centerAndNormalizeWave(wave: Array<number>): Float32Array {
    let magn: number = 0.0;

    centerWave(wave);

    // Going to length-1 because an extra 0 sample is added on the end as part of centerWave, which shouldn't impact magnitude calculation.
    for (let i: number = 0; i < wave.length - 1; i++) {
        magn += Math.abs(wave[i]);
    }
    const magnAvg: number = magn / (wave.length - 1);

    for (let i: number = 0; i < wave.length - 1; i++) {
        wave[i] = wave[i] / magnAvg;
    }

    return new Float32Array(wave);

}
export function performIntegral(wave: { length: number, [index: number]: number }): Float32Array {
    // Perform the integral on the wave. The synth function will perform the derivative to get the original wave back but with antialiasing.
    let cumulative: number = 0.0;
    let newWave: Float32Array = new Float32Array(wave.length);
    for (let i: number = 0; i < wave.length; i++) {
        newWave[i] = cumulative;
        cumulative += wave[i];
    }

    return newWave;
}
export function performIntegralOld(wave: { length: number, [index: number]: number }): void {
	// Old ver used in harmonics/picked string instruments, manipulates wave in place.
	let cumulative: number = 0.0;
	for (let i: number = 0; i < wave.length; i++) {
		const temp = wave[i];
		wave[i] = cumulative;
		cumulative += temp;
	}
}

export function getPulseWidthRatio(pulseWidth: number): number {
    // BeepBox formula for reference
    //return Math.pow(0.5, (Config.pulseWidthRange - 1 - pulseWidth) * Config.pulseWidthStepPower) * 0.5;

    return pulseWidth / (Config.pulseWidthRange * 2);
}


// The function arguments will be defined in FFT.ts, but I want
// SynthConfig.ts to be at the top of the compiled JS so I won't directly
// depend on FFT here. synth.ts will take care of importing FFT.ts.
//function inverseRealFourierTransform(array: {length: number, [index: number]: number}, fullArrayLength: number): void;
//function scaleElementsByFactor(array: {length: number, [index: number]: number}, factor: number): void;
export function getDrumWave(index: number, inverseRealFourierTransform: Function | null, scaleElementsByFactor: Function | null): Float32Array {
    let wave: Float32Array | null = Config.chipNoises[index].samples;
    if (wave == null) {
        wave = new Float32Array(Config.chipNoiseLength + 1);
        Config.chipNoises[index].samples = wave;

        if (index == 0) {
            // The "retro" drum uses a "Linear Feedback Shift Register" similar to the NES noise channel.
            let drumBuffer: number = 1;
            for (let i: number = 0; i < Config.chipNoiseLength; i++) {
                wave[i] = (drumBuffer & 1) * 2.0 - 1.0;
                let newBuffer: number = drumBuffer >> 1;
                if (((drumBuffer + newBuffer) & 1) == 1) {
                    newBuffer += 1 << 14;
                }
                drumBuffer = newBuffer;
            }
        } else if (index == 1) {
            // White noise is just random values for each sample.
            for (let i: number = 0; i < Config.chipNoiseLength; i++) {
                wave[i] = Math.random() * 2.0 - 1.0;
            }
        } else if (index == 2) {
            // The "clang" noise wave is based on a similar noise wave in the modded beepbox made by DAzombieRE.
            let drumBuffer: number = 1;
            for (let i: number = 0; i < Config.chipNoiseLength; i++) {
                wave[i] = (drumBuffer & 1) * 2.0 - 1.0;
                let newBuffer: number = drumBuffer >> 1;
                if (((drumBuffer + newBuffer) & 1) == 1) {
                    newBuffer += 2 << 14;
                }
                drumBuffer = newBuffer;
            }
        } else if (index == 3) {
            // The "buzz" noise wave is based on a similar noise wave in the modded beepbox made by DAzombieRE.
            let drumBuffer: number = 1;
            for (let i: number = 0; i < Config.chipNoiseLength; i++) {
                wave[i] = (drumBuffer & 1) * 2.0 - 1.0;
                let newBuffer: number = drumBuffer >> 1;
                if (((drumBuffer + newBuffer) & 1) == 1) {
                    newBuffer += 10 << 2;
                }
                drumBuffer = newBuffer;
            }
        } else if (index == 4) {
            // "hollow" drums, designed in frequency space and then converted via FFT:
            drawNoiseSpectrum(wave, Config.chipNoiseLength, 10, 11, 1, 1, 0);
            drawNoiseSpectrum(wave, Config.chipNoiseLength, 11, 14, .6578, .6578, 0);
            inverseRealFourierTransform!(wave, Config.chipNoiseLength);
            scaleElementsByFactor!(wave, 1.0 / Math.sqrt(Config.chipNoiseLength));
        } else if (index == 5) {
            // "Shine" drums from modbox!
            var drumBuffer = 1;
            for (var i = 0; i < Config.chipNoiseLength; i++) {
                wave[i] = (drumBuffer & 1) * 2.0 - 1.0;
                var newBuffer = drumBuffer >> 1;
                if (((drumBuffer + newBuffer) & 1) == 1) {
                    newBuffer += 10 << 2;
                }
                drumBuffer = newBuffer;
            }
        } else if (index == 6) {
            // "Deep" drums from modbox!
            drawNoiseSpectrum(wave, Config.chipNoiseLength, 1, 10, 1, 1, 0);
            drawNoiseSpectrum(wave, Config.chipNoiseLength, 20, 14, -2, -2, 0);
            inverseRealFourierTransform!(wave, Config.chipNoiseLength);
            scaleElementsByFactor!(wave, 1.0 / Math.sqrt(Config.chipNoiseLength));
        } else if (index == 7) {
            // "Cutter" drums from modbox!
            var drumBuffer = 1;
            for (var i = 0; i < Config.chipNoiseLength; i++) {
                wave[i] = (drumBuffer & 1) * 4.0 * (Math.random() * 14 + 1) - 8.0;
                var newBuffer = drumBuffer >> 1;
                if (((drumBuffer + newBuffer) & 1) == 1) {
                    newBuffer += 15 << 2;
                }
                drumBuffer = newBuffer;
            }
        } else if (index == 8) {
            // "Metallic" drums from modbox!
            var drumBuffer = 1;
            for (var i = 0; i < 32768; i++) {
                wave[i] = (drumBuffer & 1) / 2.0 - 0.5;
                var newBuffer = drumBuffer >> 1;
                if (((drumBuffer + newBuffer) & 1) == 1) {
                    newBuffer -= 10 << 2;
                }
                drumBuffer = newBuffer;
            }
        } else {
            throw new Error("Unrecognized drum index: " + index);
        }

        wave[Config.chipNoiseLength] = wave[0];
    }

    return wave;
}

export function drawNoiseSpectrum(wave: Float32Array, waveLength: number, lowOctave: number, highOctave: number, lowPower: number, highPower: number, overallSlope: number): number {
    const referenceOctave: number = 11;
    const referenceIndex: number = 1 << referenceOctave;
    const lowIndex: number = Math.pow(2, lowOctave) | 0;
    const highIndex: number = Math.min(waveLength >> 1, Math.pow(2, highOctave) | 0);
    const retroWave: Float32Array = getDrumWave(0, null, null);
    let combinedAmplitude: number = 0.0;
    for (let i: number = lowIndex; i < highIndex; i++) {

        let lerped: number = lowPower + (highPower - lowPower) * (Math.log2(i) - lowOctave) / (highOctave - lowOctave);
        let amplitude: number = Math.pow(2, (lerped - 1) * 7 + 1) * lerped;

        amplitude *= Math.pow(i / referenceIndex, overallSlope);

        combinedAmplitude += amplitude;

        // Add two different sources of psuedo-randomness to the noise
        // (individually they aren't random enough) but in a deterministic
        // way so that live spectrum editing doesn't result in audible pops.
        // Multiply all the sine wave amplitudes by 1 or -1 based on the
        // LFSR retro wave (effectively random), and also rotate the phase
        // of each sine wave based on the golden angle to disrupt the symmetry.
        amplitude *= retroWave[i];
        const radians: number = 0.61803398875 * i * i * Math.PI * 2.0;

        wave[i] = Math.cos(radians) * amplitude;
        wave[waveLength - i] = Math.sin(radians) * amplitude;
    }

    return combinedAmplitude;
}

function generateSineWave(): Float32Array {
    const wave: Float32Array = new Float32Array(Config.sineWaveLength + 1);
    for (let i: number = 0; i < Config.sineWaveLength + 1; i++) {
        wave[i] = Math.sin(i * Math.PI * 2.0 / Config.sineWaveLength);
    }
    return wave;
}

function generateTriWave(): Float32Array {
    const wave: Float32Array = new Float32Array(Config.sineWaveLength + 1);
    for (let i: number = 0; i < Config.sineWaveLength + 1; i++) {
        wave[i] = Math.asin(Math.sin(i * Math.PI * 2.0 / Config.sineWaveLength)) / (Math.PI / 2);
    }
    return wave;
}

function generateTrapezoidWave(drive: number = 2): Float32Array {
    const wave: Float32Array = new Float32Array(Config.sineWaveLength + 1);
    for (let i: number = 0; i < Config.sineWaveLength + 1; i++) {
        wave[i] = Math.max(-1.0, Math.min(1.0, Math.asin(Math.sin(i * Math.PI * 2.0 / Config.sineWaveLength)) * drive));
    }
    return wave;
}

function generateSquareWave(phaseWidth: number = 0): Float32Array {
    const wave: Float32Array = new Float32Array(Config.sineWaveLength + 1);
    const centerPoint: number = Config.sineWaveLength / 4;
    for (let i: number = 0; i < Config.sineWaveLength + 1; i++) {
        wave[i] = +((Math.abs(i - centerPoint) < phaseWidth * Config.sineWaveLength / 2)
            || ((Math.abs(i - Config.sineWaveLength - centerPoint) < phaseWidth * Config.sineWaveLength / 2))) * 2 - 1;
    }
    return wave;
}

function generateSawWave(inverse: boolean = false): Float32Array {
    const wave: Float32Array = new Float32Array(Config.sineWaveLength + 1);
    for (let i: number = 0; i < Config.sineWaveLength + 1; i++) {
        wave[i] = ((i + (Config.sineWaveLength / 4.0)) * 2.0 / Config.sineWaveLength) % 2 - 1;
        wave[i] = inverse ? -wave[i] : wave[i];
    }
    return wave;
}

export function getArpeggioPitchIndex(pitchCount: number, useFastTwoNoteArp: boolean, arpeggio: number): number {
    let arpeggioPattern: ReadonlyArray<number> = Config.arpeggioPatterns[pitchCount - 1];
    if (arpeggioPattern != null) {
        if (pitchCount == 2 && useFastTwoNoteArp == false) {
            arpeggioPattern = [0, 0, 1, 1];
        }
        return arpeggioPattern[arpeggio % arpeggioPattern.length];
    } else {
        return arpeggio % pitchCount;
    }
}

// Pardon the messy type casting. This allows accessing array members by numerical index or string name.
export function toNameMap<T extends BeepBoxOption>(array: Array<Pick<T, Exclude<keyof T, "index">>>): DictionaryArray<T> {
    const dictionary: Dictionary<T> = {};
    for (let i: number = 0; i < array.length; i++) {
        const value: any = array[i];
        value.index = i;
        dictionary[value.name] = <T>value;
    }
    const result: DictionaryArray<T> = <DictionaryArray<T>><any>array;
    result.dictionary = dictionary;
    return result;
}

export function effectsIncludeTransition(effects: number): boolean {
    return (effects & (1 << EffectType.transition)) != 0;
}
export function effectsIncludeChord(effects: number): boolean {
    return (effects & (1 << EffectType.chord)) != 0;
}
export function effectsIncludePitchShift(effects: number): boolean {
    return (effects & (1 << EffectType.pitchShift)) != 0;
}
export function effectsIncludeDetune(effects: number): boolean {
    return (effects & (1 << EffectType.detune)) != 0;
}
export function effectsIncludeVibrato(effects: number): boolean {
    return (effects & (1 << EffectType.vibrato)) != 0;
}
export function effectsIncludeNoteFilter(effects: number): boolean {
    return (effects & (1 << EffectType.noteFilter)) != 0;
}
export function effectsIncludeDistortion(effects: number): boolean {
    return (effects & (1 << EffectType.distortion)) != 0;
}
export function effectsIncludeBitcrusher(effects: number): boolean {
    return (effects & (1 << EffectType.bitcrusher)) != 0;
}
export function effectsIncludePanning(effects: number): boolean {
    return (effects & (1 << EffectType.panning)) != 0;
}
export function effectsIncludeChorus(effects: number): boolean {
    return (effects & (1 << EffectType.chorus)) != 0;
}
export function effectsIncludeEcho(effects: number): boolean {
    return (effects & (1 << EffectType.echo)) != 0;
}
export function effectsIncludeReverb(effects: number): boolean {
    return (effects & (1 << EffectType.reverb)) != 0;
}
export function rawChipToIntegrated(raw: DictionaryArray<ChipWave>): DictionaryArray<ChipWave> {
    const newArray: Array<ChipWave> = new Array<ChipWave>(raw.length);
    const dictionary: Dictionary<ChipWave> = {};
    for (let i: number = 0; i < newArray.length; i++) {
        newArray[i] = Object.assign([], raw[i]);
        const value: any = newArray[i];
        value.index = i;
        dictionary[value.name] = <ChipWave>value;
    }
    for (let key in dictionary) {
        dictionary[key].samples = performIntegral(dictionary[key].samples);
    }
    const result: DictionaryArray<ChipWave> = <DictionaryArray<ChipWave>><any>newArray;
    result.dictionary = dictionary;
    return result;
}