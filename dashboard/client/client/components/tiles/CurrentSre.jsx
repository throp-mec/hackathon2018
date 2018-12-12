
export default function Contents_CurrentSre(props) {
    const mecColour = '#0ca948';
    return <div style={{
            textAlign: 'center',
            fontSize: '150%',
        }}>
        <div>{props.name}
            <div style={{
                marginLeft: '0.5em',
                verticalAlign: 'middle',
                display: 'inline-block',
                width: '0.5em',
                height: '0.5em',
                background: (
                    props.presence === 'active' ? mecColour : 'transparent'),
                border: '2px solid ' + (
                    props.presence === 'active' ? mecColour : '#666'),
                borderRadius: '1em',
                color: 'transparent',
            }}>.</div>
        </div>
        <div style={{
            display: 'inline-block',
            width: 70,
            height: 70,
            borderRadius: 35,
            backgroundImage: `url(${props.image})`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
        }}>&nbsp;</div>
        <a href="#" style={{
            display: 'block',
            background: 'rgba(40,40,200, 0.2)',
            textDecoration: 'none',
            padding: 0,
            color: '#99F',
            fontSize: '90%',
        }}>@{props.handle}</a>
    </div>;
}
