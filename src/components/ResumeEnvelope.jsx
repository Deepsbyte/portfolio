import React, { useState } from 'react';
import { FileDown, ExternalLink } from 'lucide-react';
import { PROFILE } from '../data/content';
import { StarPatch } from './Doodles';

/* An airmail envelope: open it and the real first page of the resume slides up. */
export const ResumeEnvelope = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="rv text-center" style={{ '--d': 60 }}>
      <div className={`env-wrap ${open ? 'open' : ''}`}>
        <button type="button" className={`env ${open ? 'open' : ''}`} aria-expanded={open} aria-controls="resume-peek" onClick={() => setOpen(!open)}
          aria-label={open ? 'Close the envelope' : 'Open the envelope to peek at my resume'}>
          <span className="env-back" aria-hidden="true" />
          <span className="env-slot" aria-hidden={!open}>
            <span className="env-letter" id="resume-peek">
              <img src="/photo/resume-page.webp" alt="The first page of Deepthi Kumar’s resume" width="980" height="1268" loading="lazy" draggable="false" />
            </span>
          </span>
          <span className="env-front" aria-hidden="true" />
          <span className="env-flap" aria-hidden="true" />
          <span className="env-seal" aria-hidden="true"><StarPatch size={26} variant="butter" rotate={8} /></span>
        </button>
      </div>
      <p className="note text-2xl mt-3">{open ? 'a little peek at my resume ✦' : 'a letter for you — tap to open'}</p>
      <div className={`flex flex-wrap justify-center gap-3 mt-3 `}>
        <a className="btn btn-solid" href={PROFILE.resume} download="Deepthi_Kumar_Resume.pdf"><FileDown size={16} /> Download PDF</a>
        <a className="btn btn-paper" href={PROFILE.resume} target="_blank" rel="noopener noreferrer"><ExternalLink size={16} /> Open in new tab</a>
      </div>
    </div>
  );
};
