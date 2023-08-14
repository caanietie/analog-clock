/**
 * @returns a div element which is a container for the clock's callibration
 */
export function ClockCircle(props) {
    let left, top, ticks = [];
    for (let t = 6; t <= 360; t += 6) {
        top = 50 * (1 - Math.cos(t * Math.PI / 180)) + '%';
        left = 50 * (1 + Math.sin(t * Math.PI / 180)) + '%';
        ticks.push(
            <Ticks key={t} deg={t}
                top={top} major={t % 5 === 0}
                left={left} tickColor={props.tickColor}
            />
        );
    }
    return (
        <div className='clockCircle' data-testid='clockCircle'
            style={{ backgroundColor: props.rimColor }}
        >
            {ticks}
        </div>
    );
}

/**
 * @param {object} props containing left:number, top:number, and deg:number
 * @returns a div element which is the long callibration of the clock
 */
export function Ticks(props) {
    return (
        <div className={`ticks ${props.major ? 'major' : 'minor'}Ticks`}
            data-testid={`${props.major ? 'major' : 'minor'}Ticks`}
            style={{
                left: props.left, top: props.top,
                backgroundColor: props.tickColor,
                transform: `rotate(${props.deg}deg) translate(-50%)`
            }}
        />
    );
}
