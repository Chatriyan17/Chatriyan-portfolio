import React, { useState } from 'react';
import { AnimatePresence } from 'motion/react';
import { PassportCover } from './PassportCover';
import { PassportModal } from './PassportModal';

export function Passport() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="relative flex justify-center">
            <PassportCover onClick={() => setIsOpen(true)} />
            
            <AnimatePresence>
                {isOpen && <PassportModal onClose={() => setIsOpen(false)} />}
            </AnimatePresence>
        </div>
    );
}

