import {useEffect, useRef} from "react";
import {useMicVAD} from "@ricky0123/vad-react";
import {onMisfire, onSpeechEnd, onSpeechStart} from "../speech-manager.ts";

export const useMicVADWrapper = (onLoadingChange, isConsultationActive) => {
    const micVAD = useMicVAD(
        {
            preSpeechPadFrames: 5,
            positiveSpeechThreshold: 0.90,
            negativeSpeechThreshold: 0.75,
            minSpeechFrames: 4,
            startOnLoad: true, // Still start on load to initialize
            onSpeechStart: isConsultationActive ? onSpeechStart : () => {},
            onSpeechEnd: isConsultationActive ? onSpeechEnd : () => {},
            onVADMisfire: isConsultationActive ? onMisfire : () => {}
        }
    );

    const loadingRef = useRef(micVAD.loading);
    
    useEffect(() => {
        if (loadingRef.current !== micVAD.loading) {
            onLoadingChange(micVAD.loading);
            loadingRef.current = micVAD.loading;
        }
    });

    // Pause VAD when consultation is not active
    useEffect(() => {
        if (!micVAD.loading) {
            if (!isConsultationActive) {
                micVAD.pause();
            } else {
                micVAD.start();
            }
        }
    }, [isConsultationActive, micVAD.loading]);

    return {
        ...micVAD,
        pause: () => micVAD.pause(),
        unpause: () => micVAD.start()
    };
};