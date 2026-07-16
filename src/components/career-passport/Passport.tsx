import React, { useState, useRef, useCallback } from 'react';
import { PassportCover } from './PassportCover';
import { PassportModal } from './PassportModal';

// Closing is driven by a fixed timeout rather than AnimatePresence's exit-completion
// callback. The exit-completion signal depends on the browser actually running
// animation frames for the exit transition (rAF/WAAPI) — under throttling, a
// backgrounded tab, or `prefers-reduced-motion`, that signal can fail to fire and
// permanently strand the modal open. A timeout unmount is deterministic regardless.
const CLOSE_ANIMATION_MS = 380;

export function Passport() {
    const [isOpen, setIsOpen] = useState(false);
    const [closing, setClosing] = useState(false);
    const closeTimer = useRef<number | null>(null);

    const handleClose = useCallback(() => {
        if (closeTimer.current !== null) return;
        setClosing(true);
        closeTimer.current = window.setTimeout(() => {
            setIsOpen(false);
            setClosing(false);
            closeTimer.current = null;
        }, CLOSE_ANIMATION_MS);
    }, []);

    return (
        <div className="relative flex justify-center">
            <PassportCover onClick={() => setIsOpen(true)} />

            {isOpen && <PassportModal onClose={handleClose} closing={closing} />}
        </div>
    );
}
