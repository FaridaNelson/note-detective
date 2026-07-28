import { accidentalSymbol } from "../../music/notes";
import { getDisplayLabel } from "../../music/targetNote";
import {
  NOTE_X,
  STAFF_LINES,
  ledgerPositionsFor,
  positionToY,
  viewBoxForLedgerLimit,
} from "../../music/staffPosition";

const TREBLE_CLEF_PATH =
  "M376 415C374 427 376 428 382 434C490 535 572 662 572 815C572 902 548 988 507 1048C492 1070 466 1098 455 1098C441 1098 410 1072 390 1050C316 968 292 843 292 739C292 681 299 616 306 575C308 563 309 561 297 551C153 432 0 289 0 87C0 -87 119 -252 364 -252C387 -252 413 -250 433 -246C444 -244 446 -243 448 -255C460 -322 475 -409 475 -456C475 -604 375 -622 316 -622C262 -622 236 -606 236 -593C236 -586 245 -583 268 -576C299 -567 335 -540 335 -482C335 -427 300 -380 239 -380C172 -380 132 -433 132 -495C132 -560 171 -658 322 -658C389 -658 519 -628 519 -458C519 -401 501 -306 490 -244C488 -232 489 -233 503 -227C604 -187 671 -102 671 11C671 139 577 252 430 252C404 252 404 252 401 270ZM470 943C503 943 530 916 530 861C530 750 435 660 356 591C349 585 345 586 343 599C339 625 337 659 337 691C337 847 409 943 470 943ZM361 262C364 243 364 244 346 238C258 208 201 129 201 44C201 -46 248 -110 316 -133C324 -136 336 -139 343 -139C351 -139 355 -134 355 -128C355 -121 347 -118 340 -115C298 -97 268 -54 268 -8C268 49 307 92 368 109C384 113 386 112 388 101L438 -197C440 -208 439 -208 424 -211C408 -214 388 -216 368 -216C193 -216 80 -119 80 20C80 79 90 158 173 252C233 319 279 356 326 394C336 402 338 401 340 390ZM430 103C428 115 429 118 441 117C522 110 589 42 589 -46C589 -109 551 -160 495 -188C483 -194 481 -194 479 -182Z";
const BASS_CLEF_PATH =
  "M252 262C78 262 0 135 0 39C0 -41 42 -110 123 -110C186 -110 229 -66 229 -4C229 60 182 100 133 100C106 100 96 93 83 93C70 93 67 101 67 111C67 151 127 224 229 224C335 224 381 120 381 -37C381 -316 243 -472 10 -605C1 -610 -5 -615 -5 -623C-5 -629 -1 -635 8 -635C13 -635 19 -633 25 -630C271 -510 531 -332 531 -28C531 146 425 262 252 262ZM629 180C598 180 574 156 574 125C574 94 598 70 629 70C660 70 684 94 684 125C684 156 660 180 629 180ZM630 -71C599 -71 576 -94 576 -125C576 -156 599 -179 630 -179C661 -179 684 -156 684 -125C684 -94 661 -71 630 -71Z";

const NOTE_HEAD_RADIUS_X = 9.5;
const NOTE_HEAD_RADIUS_Y = 7;
const CLEF_SCALE = 0.08;

function clefPath(clef) {
  return clef === "bass" ? BASS_CLEF_PATH : TREBLE_CLEF_PATH;
}

function clefTransform(clef) {
  const x = clef === "bass" ? 46 : 40;
  const referencePosition = clef === "bass" ? 6 : 2;

  return `translate(${x},${positionToY(referencePosition)}) scale(${CLEF_SCALE},${-CLEF_SCALE})`;
}

export default function StaffDisplay({ targetNote, ledgerLimit }) {
  const clef = targetNote?.clef ?? "treble";
  const noteY = targetNote ? positionToY(targetNote.position) : null;
  const stemUp = targetNote ? targetNote.position < 4 : true;
  const title = targetNote
    ? `${getDisplayLabel(targetNote)} on the ${clef} staff`
    : "Musical staff awaiting a target note";

  return (
    <div className="staff-display" aria-label="Target note staff">
      <svg viewBox={viewBoxForLedgerLimit(ledgerLimit)} role="img" aria-labelledby="staff-title">
        <title id="staff-title">{title}</title>
        {STAFF_LINES.map((position) => (
          <line
            key={position}
            className="staff-display__line"
            x1="34"
            x2="284"
            y1={positionToY(position)}
            y2={positionToY(position)}
          />
        ))}
        <path
          className="staff-display__clef"
          d={clefPath(clef)}
          transform={clefTransform(clef)}
        />
        {targetNote && (
          <>
            {ledgerPositionsFor(targetNote.position).map((position) => (
              <line
                key={position}
                className="staff-display__ledger"
                x1={NOTE_X - 15}
                x2={NOTE_X + 15}
                y1={positionToY(position)}
                y2={positionToY(position)}
              />
            ))}
            {targetNote.accidental !== 0 && (
              <text className="staff-display__accidental" x={NOTE_X - 33} y={noteY + 8} fontSize="32">
                {accidentalSymbol(targetNote.accidental)}
              </text>
            )}
            <line
              className="staff-display__stem"
              x1={stemUp ? NOTE_X + 8 : NOTE_X - 8}
              x2={stemUp ? NOTE_X + 8 : NOTE_X - 8}
              y1={noteY}
              y2={stemUp ? noteY - 34 : noteY + 34}
            />
            <ellipse
              className="staff-display__note"
              cx={NOTE_X}
              cy={noteY}
              rx={NOTE_HEAD_RADIUS_X}
              ry={NOTE_HEAD_RADIUS_Y}
              transform={`rotate(-18 ${NOTE_X} ${noteY})`}
            />
          </>
        )}
      </svg>
    </div>
  );
}
