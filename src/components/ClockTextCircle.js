/**
 * @param {object} props containing second:number, minute:number, and hour:number
 * @returns a div element which is a circle containing the clock text
 */
export function ClockTextCircle(props) {
    return (
        <div className='clockTextCircle'
            data-testid='clockTextCircle'
            style={{ backgroundColor: props.fillColor }}
        >
            <ClockText fontSize={props.fontSize}
                fontColor={props.fontColor}
            />
            <ClockHands name='second' turn={props.second}
                secondHandColor={props.secondHandColor}
            />
            <ClockHands name='minute' turn={props.minute}
                minuteHandColor={props.minuteHandColor}
            />
            <ClockHands name='hour' turn={props.hour}
                hourHandColor={props.hourHandColor}
            />
        </div>
    );
}

/**
 * Text are placed at places corresponding to steps of 30deg
 * top = 50*(1-cos(n*PI/180))percent
 * left = 50*(1+sin(n*PI/180))percent
 * percent is with respect to ClockTextCircle radius and
 * n = 30,60,90,...,360 for 1,2,3,...,12 respectively
 * @returns the numbers on the face of the clock
 */
function ClockText(props) {
    let left, top, texts = [];
    for (let t = 1; t <= 12; t++) {
        top = 50 * (1 - Math.cos(t * 30 * Math.PI / 180)) + '%';
        left = 50 * (1 + Math.sin(t * 30 * Math.PI / 180)) + '%';
        texts.push(
            <div key={t} className='clockText'
                data-testid='clockText'
                style={{
                    fontSize: props.fontSize, left: left,
                    color: props.fontColor, top: top
                }}
            >
                {t}
            </div>
        );
    }
    return texts;
}

/**
 * @param {object} props containing name:string, turn:number
 * @returns a div element representing the hand of the clock
 */
function ClockHands(props) {
    return (
        <div data-testid={`${props.name}Hand`}
            className={`hands ${props.name}Hand`}
            style={{
                transform: `rotate(${props.turn}deg)`,
                backgroundColor: props[`${props.name}HandColor`]
            }}
        />
    );
}
